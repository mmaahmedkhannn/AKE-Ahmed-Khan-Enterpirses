import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { csrfSync } from 'csrf-sync';
import xss from 'xss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Infrastructure & Routing Security

// Middleware to block hidden files and configurations like .env
app.use((req, res, next) => {
  if (req.path.includes('/.') || req.path.includes('.env')) {
    return res.status(403).send('Forbidden');
  }
  next();
});

// Force HTTPS (301 Redirect)
app.use((req, res, next) => {
  // Check if behind a reverse proxy that handles SSL
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  next();
});

// 2. HTTP Security Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Vite and React often need 'unsafe-inline' for scripts/styles in dev, 
      // but in production, we restrict it as much as possible.
      scriptSrc: ["'self'", "'unsafe-inline'"], 
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"], // X-Frame-Options: DENY
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: { action: "deny" },
  xContentTypeOptions: true, // nosniff
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}));

// Body & Cookie Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. CSRF Protection
const {
  csrfSynchronisedProtection,
  generateToken,
} = csrfSync({
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ token: generateToken(req) });
});

// 4. Rate Limiting for the form endpoints
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window`
  message: { error: 'Too many inquiries sent from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 5. Form Submission API
app.post('/api/contact', contactRateLimiter, csrfSynchronisedProtection, (req, res) => {
  // Server-side validation and sanitization
  const { name, email, phone, department, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Strip HTML/scripts
  const cleanData = {
    name: xss(name),
    email: xss(email),
    phone: xss(phone || ''),
    department: xss(department || ''),
    message: xss(message),
  };

  console.log('Received sanitized inquiry:', cleanData);

  // Usually, save to DB or send email here.
  
  res.status(200).json({ success: true, message: 'Inquiry received securely.' });
});

// Serve static files safely, explicitly denying dotfiles
app.use(express.static(path.join(__dirname, 'dist'), {
  index: ['index.html'],
  dotfiles: 'deny',
}));

// Fallback for React Router (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Secure Server running on port ${PORT}`);
});

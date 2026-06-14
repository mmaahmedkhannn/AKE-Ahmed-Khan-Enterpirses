# Ahmed Khan Enterprises (AKE) Website

A modern, professional, and unique website for a Pakistan-based construction and enterprise company. Built with React, TypeScript, and Tailwind CSS.

## How to Run the Project Locally

1. **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Install Dependencies:** Open a terminal in the project folder and run:
   ```bash
   npm install
   ```
3. **Start Development Server:**
   ```bash
   npm run dev
   ```
4. **View Website:** Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## How to Update Weekly Projects

To add, edit, or remove projects, you do **not** need to touch the complex UI code. 

1. Open the file located at: `src/data/projects.ts`
2. You will see an array named `projects`.
3. To add a new project, simply copy an existing project object block, paste it at the top or bottom of the list, and update the details:
   - `id`: Must be unique (e.g., "proj-004")
   - `title`: Name of the project
   - `location`: e.g., "Karachi, Pakistan"
   - `category`: e.g., "Construction"
   - `status`: Must be exactly `'Completed'`, `'Ongoing'`, or `'Upcoming'`
   - `date`: Year or timeline
   - `shortDescription`: A brief 1-2 sentence summary
   - `fullDescription`: The detailed explanation for the project page
   - `images`: An array of image URLs (e.g., `["https://link-to-image.jpg"]`)
   - `client`: The client or department name

The website will automatically read this file and update the Home, Projects, and Gallery pages!

## How to Replace Placeholder Images

Currently, the website uses professional placeholder images from Unsplash. 
- **Project Images:** Update the `images` array in `src/data/projects.ts` with links to your actual project photos. You can place your images in the `public/` folder (e.g., `public/images/proj1.jpg`) and reference them as `"/images/proj1.jpg"`.
- **About Page Image:** Open `src/pages/About.tsx` and find the `<img>` tag near the top. Replace the `src` attribute with your new image link.

## How to Edit Company Contact Information

If your phone number, email, or address changes, you need to update it in two places:
1. **Footer:** Open `src/components/Footer.tsx` and scroll to the "Contact Us" section to update the text.
2. **Contact Page:** Open `src/pages/Contact.tsx` and update the text under the "Head Office", "Phone", "Email", and the WhatsApp link.

## Tech Stack
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router DOM
- Lucide React (Icons)

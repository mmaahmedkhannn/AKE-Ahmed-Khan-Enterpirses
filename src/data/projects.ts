export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  date: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  client: string;
}

// ══════════════════════════════════════════════════════════
// WEEKLY UPDATE INSTRUCTIONS:
// To add a new project, copy any object below, paste it
// at the TOP of the array, and change the details.
// Every project MUST have a unique `id`.
// Place your images in public/images/ and reference as "/images/filename.png"
// ══════════════════════════════════════════════════════════

export const projects: Project[] = [
  {
    id: "proj-001",
    title: "Al-Karim Commercial Complex",
    location: "Karachi, Pakistan",
    category: "Commercial Construction",
    status: "Completed",
    date: "2024",
    shortDescription: "A state-of-the-art 12-story commercial complex in the heart of Pakistan's financial capital, featuring modern amenities and seismic-resistant design.",
    fullDescription: "The Al-Karim Commercial Complex project involved the end-to-end development of a 12-story commercial building in Karachi. AKE handled everything from initial foundation work to interior structural finishing. The building is designed to withstand local seismic activity and features modern amenities for corporate tenants, including high-speed elevator systems, smart building management, and a multi-level parking structure.",
    images: [
      "/images/proj-commercial.png",
      "/images/hero.png",
      "/images/cta-bg.png"
    ],
    client: "Al-Karim Group"
  },
  {
    id: "proj-002",
    title: "Lahore Metro Infrastructure Upgrade",
    location: "Lahore, Pakistan",
    category: "Government Contract",
    status: "Ongoing",
    date: "2025 – Present",
    shortDescription: "Reinforcing support structures and expanding platform capacities at three major Lahore Metro stations with minimal commuter disruption.",
    fullDescription: "Contracted by the Punjab Mass Transit Authority, this ongoing project focuses on reinforcing support structures and expanding platform capacities at three major Lahore Metro stations. Our team of 120+ engineers and construction specialists is ensuring all work is completed with minimal disruption to daily commuters. The project involves advanced concrete reinforcement, steel structural upgrades, and the installation of modern safety systems.",
    images: [
      "/images/proj-metro.png",
      "/images/services-bg.png"
    ],
    client: "Punjab Mass Transit Authority"
  },
  {
    id: "proj-003",
    title: "Islamabad Tech Park",
    location: "Islamabad, Pakistan",
    category: "Enterprise Development",
    status: "Upcoming",
    date: "2026",
    shortDescription: "A massive enterprise development creating a dedicated technology zone for IT companies, featuring sustainable building practices and modern design.",
    fullDescription: "An upcoming major enterprise development project aimed at creating a dedicated zone for technology companies in the federal capital. AKE will be leading the structural and foundational phases, emphasizing sustainable building practices and modern design standards. The tech park will feature energy-efficient building envelopes, green spaces, underground parking, and fiber-optic infrastructure throughout.",
    images: [
      "/images/proj-techpark.png",
      "/images/contact-bg.png"
    ],
    client: "Ministry of IT & Telecom"
  },
  {
    id: "proj-004",
    title: "Quetta-Chaman Highway Expansion",
    location: "Balochistan, Pakistan",
    category: "Infrastructure",
    status: "Completed",
    date: "2023",
    shortDescription: "A critical 86km highway expansion project connecting Quetta to the Chaman border crossing, enhancing trade and transportation capacity.",
    fullDescription: "This landmark infrastructure project involved widening and upgrading an 86km stretch of the strategic Quetta-Chaman Highway. The project included new asphalt laying, bridge construction, drainage systems, and the installation of modern road safety features. AKE deployed heavy earth-moving equipment and a workforce of over 200 personnel to deliver this project ahead of schedule.",
    images: [
      "/images/proj-highway.png",
      "/images/gallery-bg.png"
    ],
    client: "National Highway Authority (NHA)"
  },
  {
    id: "proj-005",
    title: "Peshawar Medical Complex Extension",
    location: "Peshawar, Pakistan",
    category: "Government Contract",
    status: "Completed",
    date: "2022",
    shortDescription: "A 200-bed extension to the Peshawar Medical Complex, including state-of-the-art surgical suites, ICU facilities, and emergency departments.",
    fullDescription: "AKE was contracted to deliver a critical 200-bed extension to one of KPK's busiest hospitals. The scope included new surgical suites, ICU facilities, an expanded emergency department, and administrative wings. The project required careful coordination to ensure existing hospital operations were not disrupted during construction.",
    images: [
      "/images/proj-hospital.png",
      "/images/about-team.png"
    ],
    client: "Government of Khyber Pakhtunkhwa"
  }
];

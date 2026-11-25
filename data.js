/*
  ============================================================
  SkillPath Dataset (data.js)
  ============================================================
  This file stores all the predefined data used by the website:
  1. skillsList    -> Checkboxes shown in the "Your Skills" section
  2. interestsList -> Checkboxes shown in the "Your Interests" section
  3. careersData   -> Predefined career rules, explanations, and next skills
  ============================================================
*/

// 1. List of Skills (displayed as checkboxes on assessment.html)
const skillsList = [
  "HTML & CSS",
  "JavaScript",
  "Python",
  "C / C++",
  "SQL / Databases",
  "UI / Graphic Design",
  "Problem Solving & Logic",
  "Math & Statistics",
  "Networking Basics",
  "Communication & Writing",
  "Testing & Debugging",
  "Project Management / Teamwork"
];

// 2. List of Interests (displayed as checkboxes on assessment.html)
const interestsList = [
  "Building Websites",
  "Mobile Apps",
  "Data & Charts",
  "Cybersecurity & Ethical Hacking",
  "Artificial Intelligence",
  "Visual Design & User Experience",
  "Software & Game Logic",
  "Cloud & IT Systems",
  "Leading Teams & Products"
];

// 3. Predefined Career Dataset & Matching Rules
const careersData = [
  {
    id: "frontend-dev",
    title: "Frontend Web Developer",
    category: "Web Development",
    description:
      "Builds the visual and interactive parts of websites that users see and click in their browser.",
    requiredSkills: [
      "HTML & CSS",
      "JavaScript",
      "UI / Graphic Design",
      "Testing & Debugging"
    ],
    relatedInterests: [
      "Building Websites",
      "Visual Design & User Experience"
    ],
    nextSkills: [
      "Responsive Design (Flexbox & Grid)",
      "Git & GitHub",
      "React or Vue.js",
      "Web Accessibility"
    ]
  },
  {
    id: "backend-dev",
    title: "Software & Backend Developer",
    category: "Software Engineering",
    description:
      "Writes the core logic, APIs, and database connections that power applications behind the scenes.",
    requiredSkills: [
      "Python",
      "C / C++",
      "SQL / Databases",
      "Problem Solving & Logic",
      "Testing & Debugging"
    ],
    relatedInterests: [
      "Software & Game Logic",
      "Building Websites",
      "Cloud & IT Systems"
    ],
    nextSkills: [
      "Data Structures & Algorithms",
      "REST APIs",
      "Node.js or Django",
      "Git & GitHub"
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Developer",
    category: "App Development",
    description:
      "Creates Android and iOS mobile applications with smooth screens, gestures, and device features.",
    requiredSkills: [
      "JavaScript",
      "C / C++",
      "UI / Graphic Design",
      "Problem Solving & Logic"
    ],
    relatedInterests: [
      "Mobile Apps",
      "Visual Design & User Experience",
      "Software & Game Logic"
    ],
    nextSkills: [
      "Flutter or React Native",
      "Android Studio (Kotlin / Java)",
      "API Integration",
      "Mobile UI Guidelines"
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & Analytics",
    description:
      "Collects, cleans, and visualizes data to help organizations spot trends and make smart decisions.",
    requiredSkills: [
      "Python",
      "SQL / Databases",
      "Math & Statistics",
      "Communication & Writing"
    ],
    relatedInterests: [
      "Data & Charts",
      "Artificial Intelligence"
    ],
    nextSkills: [
      "Microsoft Excel / Google Sheets",
      "Python Pandas & NumPy",
      "Power BI or Tableau",
      "Data Cleaning Techniques"
    ]
  },
  {
    id: "ai-engineer",
    title: "AI & Machine Learning Engineer",
    category: "Artificial Intelligence",
    description:
      "Trains smart computer models that recognize patterns, predict outcomes, and automate complex tasks.",
    requiredSkills: [
      "Python",
      "Math & Statistics",
      "Problem Solving & Logic",
      "C / C++"
    ],
    relatedInterests: [
      "Artificial Intelligence",
      "Data & Charts",
      "Software & Game Logic"
    ],
    nextSkills: [
      "Linear Algebra & Probability",
      "Scikit-Learn",
      "TensorFlow or PyTorch",
      "Model Evaluation"
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI / UX Designer",
    category: "Design",
    description:
      "Designs user-friendly interfaces, wireframes, and layouts so apps and websites are easy and enjoyable to use.",
    requiredSkills: [
      "UI / Graphic Design",
      "HTML & CSS",
      "Communication & Writing",
      "Project Management / Teamwork"
    ],
    relatedInterests: [
      "Visual Design & User Experience",
      "Building Websites",
      "Mobile Apps"
    ],
    nextSkills: [
      "Figma",
      "Wireframing & Prototyping",
      "User Research Basics",
      "Color Theory & Typography"
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security & Networks",
    description:
      "Protects computer systems, networks, and user data from cyber attacks and security vulnerabilities.",
    requiredSkills: [
      "Networking Basics",
      "C / C++",
      "Python",
      "Problem Solving & Logic",
      "Testing & Debugging"
    ],
    relatedInterests: [
      "Cybersecurity & Ethical Hacking",
      "Cloud & IT Systems"
    ],
    nextSkills: [
      "Linux Command Line",
      "TCP/IP & Network Protocols",
      "Ethical Hacking Fundamentals",
      "Vulnerability Scanning"
    ]
  },
  {
    id: "it-coordinator",
    title: "IT Project Coordinator",
    category: "Management & Product",
    description:
      "Guides software teams, organizes project timelines, and makes sure tech products meet user needs.",
    requiredSkills: [
      "Communication & Writing",
      "Project Management / Teamwork",
      "Testing & Debugging",
      "HTML & CSS"
    ],
    relatedInterests: [
      "Leading Teams & Products",
      "Building Websites",
      "Visual Design & User Experience"
    ],
    nextSkills: [
      "Agile & Scrum Basics",
      "Trello or Jira",
      "Requirement Documentation",
      "Presentation Skills"
    ]
  }
];

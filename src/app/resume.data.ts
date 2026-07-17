export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  duration: string;
  stack: string;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  period: string;
  degree: string;
  details: { label: string; value: string }[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ContactEntry {
  icon: string;
  label: string;
  display: string;
  href: string;
  isFA: boolean;
}

export const PROFILE = {
  name: 'Mihai Simion Varga',
  title: 'Lead Full Stack Developer — Independent Contractor',
  location: 'Remote — Cluj-Napoca, Cluj, Romania',
  photo: 'assets/photo.jpeg',
};

export const SUMMARY = {
  body: `I am a Lead Full Stack Developer and Technical Lead with over 15 years of experience architecting, building, and scaling web applications and microservices. I specialise in modern JavaScript/TypeScript ecosystems (NodeJS, Angular, React) and cloud infrastructure (AWS, Azure), with a proven track record of taking complex projects from client ideation to successful deployment.`,
  body2: `As a career-long tech enthusiast and freelancer, I view programming languages simply as tools — I am highly adaptable and pride myself on my ability to jump seamlessly between tech stacks to find the best architectural solutions. Beyond writing clean, scalable code, I am deeply passionate about engineering leadership. I excel at managing agile teams, mentoring junior developers, and translating complex business requirements into robust technical realities. I also have hands-on experience integrating LLM and AI services into production applications.`,
  coreCompetencies: 'Full-Stack Architecture · Microservices · Cloud Infrastructure (AWS/Azure) · CI/CD & GitOps · Big Data Integration · LLM/AI Integrations · Team Leadership & Mentorship',
  primaryStack: 'NodeJS, TypeScript, Angular, PHP, PostgreSQL, MySQL, Docker, Kubernetes',
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Backend',
    skills: ['NodeJS', 'TypeScript', 'PHP', 'Python', '.NET Core', 'Go', 'Java'],
  },
  {
    category: 'Frontend',
    skills: ['JavaScript', 'Angular', 'React', 'VueJS', 'SCSS'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS CDK/Lambda/S3', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'CI/CD'],
  },
  {
    category: 'Databases & Data',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Databricks', 'OpenSearch', 'Redis'],
  },
  {
    category: 'Methodologies & Tools',
    skills: ['Agile', 'Git', 'Azure DevOps', 'Automated Testing', 'LLM Integrations'],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Lead Full Stack Developer',
    company: 'Henkel',
    period: 'Sep 2024 – Present',
    duration: '~2 years',
    stack: 'NodeJS (Apollo JS), TypeScript, Angular, Databricks, Azure',
    bullets: [
      'Leading frontend and backend development within a team of 12 on an internal Big Data platform that unifies diverse data sources in Databricks for role-based data visualisation and manipulation by internal employees.',
    ],
  },
  {
    title: 'Lead Full Stack Developer',
    company: 'AWIN Global',
    period: 'Feb 2023 – Sep 2024',
    duration: '1.5 years',
    stack: 'NodeJS, TypeScript, Angular',
    bullets: [
      'Served as the expert JavaScript unit within a team of 10, advising and supporting other product teams across this affiliate marketing platform.',
      'Delivered complex implementations across auth, payment, and planning projects while maintaining up-to-date dependencies.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'FreewayCamper',
    period: 'Mar 2022 – Feb 2023',
    duration: '1 year',
    stack: 'NodeJS, TypeScript, AWS Lambda, DynamoDB, AWS CDK, Angular, .NET Core',
    bullets: [
      'Built and maintained a camper rental platform in a team of 6, focusing on the booking flow and payment integrations using AWS Lambda and Angular.',
      'Delivered feature work and bug fixes on the legacy .NET Core / Angular application.',
    ],
  },
  {
    title: 'Full Stack Lead Developer',
    company: 'Businessmate',
    period: 'Sep 2021 – May 2022',
    duration: '9 months',
    stack: 'NestJS, TypeScript, Postgres, Redis, Minio, Keycloak, Kubernetes, Terraform, Helm, Angular, VueJS',
    bullets: [
      'Led a team of 5 developers building a microservice-based business process automation platform with custom-defined workflows and data tables.',
      'Owned infrastructure DevOps responsibilities including Kubernetes cluster management with Terraform and Helm.',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'Upper',
    period: 'Sep 2020 – Sep 2021',
    duration: '1 year',
    stack: 'NodeJS, TypeScript, NestJS, Postgres, Redis, AWS S3, Laravel',
    bullets: [
      'Built GraphQL API integrations for a freelancers community platform, connecting third-party services including Google Calendar, Zoom, and PandaDoc.',
      'Maintained and extended the legacy PHP CMS built with Laravel Nova.',
    ],
  },
  {
    title: 'Lead Full Stack Developer & Technical Lead',
    company: 'WarnerBoothe',
    period: 'Sep 2018 – Sep 2022',
    duration: '4 years, part-time',
    stack: 'PHP, Node.js, .NET Core, MySQL, Yii2, Angular, React, Vue, AWS Lambda',
    bullets: [
      'Led a team of 9 on a custom video generation platform and CMS using PHP and AWS Lambda backend APIs.',
      'Oversaw development of two companion native mobile apps (iOS and Android).',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Aktan',
    period: '2019',
    duration: '8 months',
    stack: 'Angular, Angular Material, Firebase, Firestore, Cloud Functions',
    bullets: [
      'Developed an employee persona analysis platform in a team of 6, integrating backend AI services.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Voya.ai',
    period: '2017 – 2019',
    duration: '2 years',
    stack: 'Angular, AngularJS, Node.js, TypeScript, Java, DevOps',
    bullets: [
      'Worked in a team of 20 on a business travel platform with Java and Node.js backends and AngularJS / Angular frontends.',
    ],
  },
  {
    title: 'Full Stack Developer & Technical Lead',
    company: 'CenterMetrics',
    period: '2014 – 2017',
    duration: '3 years, part-time',
    stack: 'PHP, Angular, TypeScript',
    bullets: [
      'Technical lead for a team of 5, primarily delivering a custom self-storage platform CMS for a US client.',
    ],
  },
  {
    title: 'Full Stack Developer & Technical Lead',
    company: 'InsideOut Development',
    period: '2009 – 2017',
    duration: '8.5 years',
    stack: 'PHP (Laravel, Symfony), MySQL, MongoDB, AngularJS, Angular 2+, Java (Salesforce), C#',
    bullets: [
      'Managed a team of 3 developers and QA, Linux server administration, and security maintenance.',
      'Developed internal and client-facing web apps across a wide range of stacks and participated in product planning meetings.',
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    institution: '"Babeș-Bolyai" University Cluj-Napoca',
    period: '2004 – 2008',
    degree: 'Bachelor of Science',
    details: [
      { label: 'Faculty', value: 'Informatics — Computer Software Engineering' },
      { label: 'Language', value: 'Programme taught in English' },
    ],
  },
  {
    institution: "'Avram Iancu' Highschool Cluj-Napoca",
    period: '2000 – 2004',
    degree: 'Computer Science Class',
    details: [
      { label: 'Focus', value: 'Computer Science' },
    ],
  },
];

export const CONTACT: ContactEntry[] = [
  {
    icon: 'fa fa-globe',
    label: 'Portfolio',
    display: 'mihaivarga.com',
    href: 'https://mihaivarga.com',
    isFA: true,
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    display: 'linkedin.com/in/mihaivarga',
    href: 'https://linkedin.com/in/mihaivarga',
    isFA: true,
  },
  {
    icon: 'fab fa-github',
    label: 'Github',
    display: 'mihaivarga',
    href: 'https://github.com/mihaivarga',
    isFA: true,
  },
  {
    icon: 'fa fa-envelope',
    label: 'Email',
    display: 'me.shuv@gmail.com',
    href: 'mailto:me.shuv@gmail.com',
    isFA: true,
  },
  {
    icon: 'fa fa-phone',
    label: 'Phone',
    display: '+40 748 15 66 59',
    href: 'tel:+40748156659',
    isFA: true,
  },
];

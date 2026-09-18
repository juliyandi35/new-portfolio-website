// All content below is grounded in verified source documents (cv.pdf,
// government riwayat-hidup record) and the live github.com/juliyandi35
// public repository catalog. No metric, employer, credential, or project is
// invented. Internal HR identifiers (NIP/NIK/KTP/rank dates/unit codes) are
// deliberately excluded per the privacy rule in the guiding master prompt.

export const person = {
  name: 'Juli Yandi Rahman',
  credential: 'S.Mat',
  tagline: 'Data & Security Systems Practitioner',
  summary:
    'Statistical modeling and applied AI work grounded in a public-sector data infrastructure practice, from econometric and machine-learning methods to the network and security fundamentals that keep the systems carrying that data upright.',
  origin: 'Born in Kumai, Kotawaringin Barat, Central Kalimantan',
  location: 'Jakarta, Indonesia',
  email: 'juliyandi35@gmail.com',
  phone: '+62 813-4860-9836',
  linkedin: 'https://www.linkedin.com/in/juli-yandi-rahman-3a2257290',
  github: 'https://github.com/juliyandi35',
} as const;

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Data Management Practitioner, National Data Center',
    org: 'Ministry of Defense, Republic of Indonesia',
    period: '2025 to present',
    summary:
      'Civil-service role inside a national data center, working on data management and information-systems operations that support government data infrastructure.',
    highlights: [
      'Applies statistical and data-systems training to public-sector data management.',
      'Operates within a formal information-security and network-operations environment.',
    ],
  },
  {
    role: 'Research Consultant, Statistical Data Processing',
    org: 'Educativa ID',
    period: '2023 to 2024',
    summary:
      'Processed client research data end-to-end: model selection, analysis, interpretation, and direct client communication.',
    highlights: [
      'Applied regression, clustering, machine-learning, and other methods to client research data on request.',
      'Wrote interpretation sections and full results and discussion chapters for completed analyses.',
      'Ran client-facing sessions to present findings and field methodological questions.',
    ],
  },
];

export interface EducationEntry {
  program: string;
  org: string;
  period: string;
  detail: string;
}

export const education: EducationEntry[] = [
  {
    program: 'S1, Mathematics',
    org: 'Republic of Indonesia Defense University (UNHAN RI)',
    period: '2020 to 2024',
    detail: 'GPA 3.56',
  },
  {
    program: 'Data and Information Science Research Program',
    org: 'National Research and Innovation Agency (BRIN)',
    period: '2023',
    detail: 'GPA 4.00',
  },
];

export interface CertificationEntry {
  name: string;
  org: string;
  year: string;
  track: 'security' | 'network' | 'data' | 'language';
}

export const certifications: CertificationEntry[] = [
  { name: 'Gen AI Engineer Bootcamp, Build AI Apps and Agents in Python', org: 'Udemy', year: '2026', track: 'data' },
  { name: 'MTCNA, MikroTik Certified Network Associate', org: 'PT Citraweb Solusi Teknologi', year: '2025', track: 'network' },
  { name: 'Security Operations Center', org: 'PT Xirka Dama Persada', year: '2025', track: 'security' },
  { name: 'Vulnerability Assessment and Penetration Testing', org: 'PT Xirka Dama Persada', year: '2025', track: 'security' },
  { name: 'Ethical Hacking', org: 'PT Xirka Dama Persada', year: '2025', track: 'security' },
  { name: 'Network Defense', org: 'PT Xirka Dama Persada', year: '2025', track: 'network' },
  { name: 'Network Enterprise', org: 'PT Xirka Dama Persada', year: '2025', track: 'network' },
  { name: 'Network Foundation Specialist', org: 'PT Xirka Dama Persada', year: '2025', track: 'network' },
  { name: 'Aptis English Certification', org: 'British Council Indonesia', year: '2024', track: 'language' },
  { name: 'Spatial Data Analysis with R, QGIS and More', org: 'Udemy', year: '2024', track: 'data' },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Statistical and Econometric Methods',
    items: [
      'Regression, correlation and econometrics',
      'Time series and forecasting',
      'Hypothesis testing and experimental design',
      'SEM and psychometrics',
      'Meta-analysis and evidence synthesis',
    ],
  },
  {
    label: 'Machine Learning and AI',
    items: [
      'NLP and sentiment analysis (IndoBERT, transformer fine-tuning)',
      'Computer vision (YOLOv8, CNN architectures)',
      'Classification and clustering',
      'Metaheuristic optimization (genetic algorithms, VRP)',
    ],
  },
  {
    label: 'Data and Geospatial Systems',
    items: ['Spatial and GIS analysis', 'Geographically weighted models', 'Dashboard and reporting development'],
  },
  {
    label: 'Security and Network Systems',
    items: [
      'SOC monitoring fundamentals',
      'Vulnerability assessment and penetration testing',
      'Ethical hacking methodology',
      'Network defense, enterprise, and foundation administration',
    ],
  },
  {
    label: 'Tools and Platforms',
    items: ['R / RStudio', 'Python', 'MATLAB', 'SPSS', 'EViews', 'Stata', 'SmartPLS', 'JASP', 'Minitab', 'QGIS', 'MySQL'],
  },
];

export const languages = [
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'Fluent, Aptis certified' },
  { name: 'Japanese', level: 'Active' },
];

export interface FlagshipProject {
  slug: string;
  title: string;
  methodFamilies: string[];
  application: string;
  problem: string;
  method: string;
}

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: 'model-indobert-with-cnn-ltsm-python',
    title: 'Sentiment analysis with IndoBERT and CNN-LSTM',
    methodFamilies: ['Machine learning, AI & data mining'],
    application: 'Python',
    problem: 'Informal, code-mixed Indonesian text breaks lexicon-based sentiment tools and shallow classifiers alike.',
    method:
      'Fine-tuned IndoBERT contextual embeddings feed a CNN-LSTM head, pairing local n-gram detection with sequential context.',
  },
  {
    slug: 'vrp-genetic-algorithm-python',
    title: 'Vehicle routing with genetic-algorithm optimization',
    methodFamilies: ['MCDM, optimasi & riset operasi'],
    application: 'Python',
    problem:
      'Minimizing total route distance and cost across a capacity-constrained fleet is a combinatorial problem exact solvers cannot scale to.',
    method: 'A genetic-algorithm metaheuristic, population search with crossover and mutation, searches for near-optimal routes.',
  },
  {
    slug: 'geographically-weighted-poisson-regression-r',
    title: 'Geographically weighted Poisson regression',
    methodFamilies: ['Regresi, korelasi & ekonometrika', 'Spasial, geografis & GIS'],
    application: 'R / RStudio',
    problem:
      'A single global Poisson regression hides how the relationship between predictors and count outcomes shifts from region to region.',
    method: 'Geographically weighted regression fits a local Poisson model at every location, letting coefficients vary spatially.',
  },
  {
    slug: 'image-detection-with-yolov8-python',
    title: 'Object detection with YOLOv8',
    methodFamilies: ['Machine learning, AI & data mining'],
    application: 'Python',
    problem: 'Detecting and localizing objects in images and video frames within a real-time inference budget.',
    method: 'A single-stage YOLOv8 detector, trained and evaluated for the accuracy and speed trade-off.',
  },
  {
    slug: 'modwt-arima-r',
    title: 'MODWT-ARIMA hybrid forecasting',
    methodFamilies: ['Deret waktu & peramalan'],
    application: 'R / RStudio',
    problem:
      'A raw time series mixes trend, cycle, and noise at different frequencies that a single ARIMA model fits poorly all at once.',
    method:
      'Maximal Overlap Discrete Wavelet Transform decomposes the series into frequency components; ARIMA forecasts each component before recombination.',
  },
];

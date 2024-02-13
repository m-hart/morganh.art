export interface PortfolioItem {
  title: string;
  subtitle: string;
  description: string;
  href: string
  position: string;
  technologies: string[];
  // Extra metadata
  meta?: {
    text: string;
    href?: string;
  }[];
}

export const ITEMS: PortfolioItem[] = [
  {
    title: 'The Orb',
    subtitle: '2018 - 2022',
    description: 'interactive multimedia eductional resource about tasmanian aboriginal cultural practice',
    href: 'https://www.theorb.tas.gov.au/',
    position: 'junior frontend developer',
    technologies: ['typescript', 'react', 'redux', 'sass', 'postcss', 'webpack', 'node', 'mapboxgl'],
    meta: [
      { 
        text: '2019 ATOM award winner of best educational website',
        href: 'https://atomawards.org/2019-tertiary-industry-entry/the-orb/',
      }
    ],
  },
  {
    title: 'Rosella Street',
    subtitle: '2022 - 2023',
    description: 'online marketplace with a focus on circular economy',
    href: 'https://www.rosellastreet.com',
    position: 'full stack developer',
    technologies: ['javascript', 'react', 'redux', 'sharetribe flex', 'node', 'postcss', 'expressjs', 'aws dynamodb, s3, ecs and ec2'],
  },
  {
    title: 'Dark MOFO',
    subtitle: '2023',
    description: 'program website for tasmania\'s biggest annual festival',
    href: 'https://darkmofo.net.au/',
    position: 'contract frontend developer',
    technologies: ['typescript', 'nextjs', 'sass', 'graphql', 'sanity', 'mapboxgl'],
    meta: [
      {
        text: 'website currently on display for summer MONA FOMA with updated colours (otherwise identical)',
        href: 'https://monafoma.net.au/'
      }
    ]
  },
  {
    title: 'traceably.io',
    subtitle: '2023 - present',
    description: 'collaboration platform revolutionising digital transformation',
    href: 'https://traceably.io/',
    position: 'contract full stack developer',
    technologies: ['typescript', 'nextjs', 'sass', 'supabase', 'postgres', 'drizzle-orm'],
  },
]

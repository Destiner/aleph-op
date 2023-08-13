import {
  OPTIMISM,
  OPTIMISM_GOERLI,
  BASE,
  BASE_GOERLI,
  MODE_SEPOLIA,
  Chain,
} from '@/utils/chains';

type Category = 'defi' | 'nft' | 'gaming' | 'social' | 'infra';

interface App {
  name: string;
  description: string;
  iconPath: string;
  url: string;
  category: Category;
}

type AppWithChain = App & { chains: Chain[] };

function getApps(chain: Chain): App[] {
  return APPS.filter((app) => app.chains.includes(chain)).map<App>((app) => {
    return {
      name: app.name,
      description: app.description,
      iconPath: app.iconPath,
      url: app.url,
      category: app.category,
    };
  });
}

const APPS: AppWithChain[] = [
  // DeFi
  {
    name: 'Uniswap',
    description: 'Decentralized exchange',
    iconPath: '/assets/icons/uniswap.svg',
    url: 'https://uniswap.org',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI, MODE_SEPOLIA],
  },
  {
    name: 'Velodrome',
    description: 'Liquidity mining',
    iconPath: '/assets/icons/velodrome.svg',
    url: 'https://velodrome.finance',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'Aave',
    description: 'Lending and borrowing',
    iconPath: '/assets/icons/aave.svg',
    url: 'https://aave.com',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'Synthetix',
    description: 'Synthetic assets',
    iconPath: '/assets/icons/synthetix.svg',
    url: 'https://synthetix.io',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'Yearn',
    description: 'Lending aggregator',
    iconPath: '/assets/icons/yearn.svg',
    url: 'https://yearn.finance',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'Sonne',
    description: 'Lending protocol',
    iconPath: '/assets/icons/sonne.svg',
    url: 'https://sonne.finance',
    category: 'defi',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
];

export { Category, App, getApps };

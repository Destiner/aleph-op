import {
  OPTIMISM,
  OPTIMISM_GOERLI,
  BASE,
  BASE_GOERLI,
  ZORA,
  ZORA_TESTNET,
  Chain,
} from '@/utils/chains';

type Category = 'provider' | 'indexing' | 'explorer' | 'oracle' | 'development';

interface Tool {
  name: string;
  description: string;
  iconPath: string;
  url: string;
  category: Category;
}

type ToolWithChain = Tool & { chains: Chain[] };

function getTools(chain: Chain): Tool[] {
  return TOOLS.filter((tool) => tool.chains.includes(chain)).map<Tool>(
    (tool) => {
      return {
        name: tool.name,
        description: tool.description,
        iconPath: tool.iconPath,
        url: tool.url,
        category: tool.category,
      };
    },
  );
}

const TOOLS: ToolWithChain[] = [
  // Providers
  {
    name: 'Alchemy',
    description: 'Blockchain developer platform',
    iconPath: '/assets/icons/alchemy.svg',
    url: 'https://alchemy.com',
    category: 'provider',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'Infura',
    description: 'Blockchain infrastructure for developers',
    iconPath: '/assets/icons/infura.svg',
    url: 'https://infura.io',
    category: 'provider',
    chains: [OPTIMISM, OPTIMISM_GOERLI],
  },
  {
    name: 'QuickNode',
    description: 'Blockchain infrastructure for developers',
    iconPath: '/assets/icons/quicknode.svg',
    url: 'https://quicknode.com',
    category: 'provider',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  {
    name: 'Ankr',
    description: 'Blockchain infrastructure for developers',
    iconPath: '/assets/icons/ankr.svg',
    url: 'https://ankr.com',
    category: 'provider',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  // Indexing
  {
    name: 'The Graph',
    description: 'Indexing and querying protocol for the decentralized web',
    iconPath: '/assets/icons/thegraph.svg',
    url: 'https://thegraph.com',
    category: 'indexing',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  {
    name: 'Covalent',
    description: 'Blockchain data infrastructure',
    iconPath: '/assets/icons/covalent.svg',
    url: 'https://covalenthq.com',
    category: 'indexing',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI, ZORA, ZORA_TESTNET],
  },
  // Explorers
  {
    name: 'Blockscout',
    description: 'Blockchain explorer',
    iconPath: '/assets/icons/blockscout.svg',
    url: 'https://blockscout.com',
    category: 'explorer',
    chains: [
      OPTIMISM,
      OPTIMISM_GOERLI,
      BASE_GOERLI,
      ZORA,
      ZORA_TESTNET,
      BASE_GOERLI,
    ],
  },
  {
    name: 'Etherscan',
    description: 'Blockchain explorer',
    iconPath: '/assets/icons/etherscan.svg',
    url: 'https://etherscan.io',
    category: 'explorer',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  // Oracles
  {
    name: 'Chainlink',
    description: 'Decentralized oracle network',
    iconPath: '/assets/icons/chainlink.svg',
    url: 'https://chain.link',
    category: 'oracle',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  {
    name: 'Pyth',
    description: 'Decentralized oracle network',
    iconPath: '/assets/icons/pyth.svg',
    url: 'https://pyth.network',
    category: 'oracle',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  {
    name: 'API3',
    description: 'Decentralized oracle network',
    iconPath: '/assets/icons/api3.png',
    url: 'https://api3.org',
    category: 'oracle',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI],
  },
  {
    name: 'UMA',
    description: 'Decentralized oracle network',
    iconPath: '/assets/icons/uma.svg',
    url: 'https://uma.xyz',
    category: 'oracle',
    chains: [OPTIMISM],
  },
  // Development
  {
    name: 'Foundry',
    description: 'Ethereum development environment',
    iconPath: '/assets/icons/foundry.png',
    url: 'https://getfoundry.sh',
    category: 'development',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI, ZORA, ZORA_TESTNET],
  },
  {
    name: 'Hardhat',
    description: 'Ethereum development environment',
    iconPath: '/assets/icons/hardhat.svg',
    url: 'https://hardhat.org',
    category: 'development',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI, ZORA, ZORA_TESTNET],
  },
  {
    name: 'Truffle',
    description: 'Ethereum development environment',
    iconPath: '/assets/icons/truffle.png',
    url: 'https://trufflesuite.com',
    category: 'development',
    chains: [OPTIMISM, OPTIMISM_GOERLI, BASE, BASE_GOERLI, ZORA, ZORA_TESTNET],
  },
];

export { Category, Tool, getTools };

import { Category } from '.';

function formatCategory(category: Category): string {
  switch (category) {
    case 'defi':
      return 'DeFi';
    case 'nft':
      return 'NFT';
    case 'gaming':
      return 'Gaming';
    case 'social':
      return 'Social';
    case 'infra':
      return 'Infrastructure';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { formatCategory };

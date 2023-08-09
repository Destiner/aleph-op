import { Category } from '.';

function formatCategory(category: Category): string {
  switch (category) {
    case 'development':
      return 'Development Tools';
    case 'explorer':
      return 'Block Explorers';
    case 'indexing':
      return 'Data Indexing';
    case 'oracle':
      return 'Oracles';
    case 'provider':
      return 'Providers';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { formatCategory };

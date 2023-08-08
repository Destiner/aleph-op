<template>
  <AlephPage>
    <template #toc>
      <TableOfContents
        :sections="sections"
        :active="active"
      />
    </template>
    <div class="wrapper">
      <h1>{{ activeDoc.title }}</h1>
      <MarkdownView :source="activeDoc.content" />
    </div>
    <template #outline>
      <ContentOutline :sections="contentSections" />
    </template>
  </AlephPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import MarkdownView from '@/components/__common/MarkdownView.vue';
import ContentOutline, {
  Section as ContentSection,
} from '@/components/__common/nav/ContentOutline.vue';
import TableOfContents, {
  Section,
} from '@/components/__common/nav/TableOfContents.vue';
import AlephPage from '@/components/_app/AlephPage.vue';
import { sluggify } from '@/utils/formatting';

interface DocSection {
  title: string;
  docs: Doc[];
}

interface Doc {
  title: string;
  content: string;
}

const sections = computed<Section[]>(() =>
  docs.map((doc) => ({
    title: doc.title,
    path: sluggify(doc.title),
    pages: doc.docs.map((page) => ({
      title: page.title,
      path: sluggify(page.title),
    })),
  })),
);

const active = computed(() => ({
  sectionIndex: 0,
  pageIndex: 1,
}));

const activeDoc = computed(() => {
  const section = docs[active.value.sectionIndex];
  return section.docs[active.value.pageIndex];
});

const docs: DocSection[] = [
  {
    title: 'Building on Optimism',
    docs: [
      {
        title: 'Transaction fees on OP Mainnet',
        content: '',
      },
      {
        title: 'Interacting with OP Mainnet contracts',
        content: `
OP Mainnet is composed, in part, of a series of smart contracts on both L1 (Ethereum) and L2 (OP Mainnet).
You may want to interact with these contracts for any number of reasons, including:

- Sending messages between L1 and L2
- Sending tokens between L1 and L2
- Querying information about the current [L1 data fee](./transaction-fees.md#the-l1-data-fee)
- And lots more!

On this page we'll show you how to work with these contracts directly from other contracts and how to work with them from the client side.

## Finding contract addresses

You'll need to find the address of the particular contract that you want to interact with before you can actually interact with it.
Check out the [Networks and Connection Details page](../../useful-tools/networks.md) for links to the contract addresses for each network.
You can also find the addresses for all networks in the [deployments folder](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts/deployments) of the [\`contracts\` package](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts).

## Interacting from another contract

All you need to interact with the OP Mainnet system contracts from another contract is an address and an interface.
You can follow [the instructions above](#finding-contract-addresses) to find the address of the contract you want to interact with.
Now you simply need to import the appropriate contracts.

### Installing via NPM or Yarn

We export a package [\`@eth-optimism/contracts\`](https://www.npmjs.com/package/@eth-optimism/contracts?activeTab=readme) that makes it easy to use the OP Mainnet contracts within NPM or Yarn based projects.
Install the package as follows:

\`\`\`
npm install @eth-optimism/contracts
\`\`\`

### Importing contracts

Simply import the desired contract or interface from the \`@eth-optimism/contracts\` package:

\`\`\`solidity
import { SomeOptimismContract } from "@eth-optimism/contracts/path/to/SomeOptimismContract.sol";
\`\`\`

Please note that \`path/to/SomeOptimismContract\` is the path to the contract [within this folder](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/contracts).
For example, if you wanted to import the [\`L1CrossDomainMessenger\`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol) contract, you would use the following import:

\`\`\`solidity
import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
\`\`\`

### Getting L2 contract addresses

Addresses of system contracts on the L2 side of the network are the same on every network.
We provide these addresses as constants within the [\`Lib_PredeployAddresses\`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) contract.

## Interacting from the client side

Just like when interacting from another contract, we've created a few packages that make it easy to interact with the OP Mainnet system contracts from the client side.

### Installing via NPM or Yarn

You can use the [\`@eth-optimism/contracts\`](https://www.npmjs.com/package/@eth-optimism/contracts?activeTab=readme) package to interact with the OP Mainnet system contracts from a JavaScript or TypeScript based project.
Install the package as follows:

\`\`\`
npm install @eth-optimism/contracts
\`\`\`

### Getting contract artifacts, interfaces, and ABIs

You can get the compiler artifact, bytecode, and ABI for any OP Mainnet contract as follows:

\`\`\`ts
import { getContractDefinition } from '@eth-optimism/contracts'

const artifact = getContractDefinition('SomeOptimismContract')
const abi = artifact.abi
const bytecode = artifact.bytecode
const deployedBytecode = artifact.deployedBytecode
\`\`\`

Similarly, you can also get [ethers Interface objects](https://docs.ethers.io/v5/api/utils/abi/interface/) for any contract:

\`\`\`ts
import { getContractInterface } from '@eth-optimism/contracts'

const iface = getContractInterface('SomeOptimismContract')
\`\`\`

### Getting L2 contract addresses

You can get the address of any L2 contract as follows:

\`\`\`ts
import { predeploys } from '@eth-optimism/contracts'

const address = predeploys.CONTRACT_NAME_GOES_HERE
\`\`\`
`,
      },
      { title: 'Running a local development environment', content: '' },
      { title: 'Running an OP Mainnet or testnet node', content: '' },
      { title: 'Differences between Ethereum and OP Mainnet', content: '' },
      {
        title: 'Testing Decentralized Applications for OP Mainnet',
        content: '',
      },
      { title: 'Making OP Mainnet Dapps Even Cheaper', content: '' },
    ],
  },
  {
    title: 'Bridging L1 and L2',
    docs: [
      {
        title: 'Bridging basics',
        content: '',
      },
      {
        title: 'Using the Standard Bridge',
        content: '',
      },
      {
        title: 'Sending data between L1 and L2',
        content: '',
      },
    ],
  },
  {
    title: '',
    docs: [
      {
        title: 'Known Issues',
        content: '',
      },
    ],
  },
  {
    title: 'Useful Tools',
    docs: [
      {
        title: 'Networks, Public RPC Endpoints, & APIs',
        content: '',
      },
      {
        title: 'Transaction Debugging Tools',
        content: '',
      },
      { title: 'Network Faucets', content: '' },
      { title: 'Monitoring', content: '' },
      { title: 'Block Explorers', content: '' },
      { title: 'Node & API Providers', content: '' },
      { title: 'Oracles', content: '' },
    ],
  },
];

const contentSections = computed<ContentSection[]>(() => [
  {
    title: 'Finding contract addresses',
    path: sluggify('Finding contract addresses'),
    items: [],
  },
  {
    title: 'Interacting from another contract',
    path: sluggify('Interacting from another contract'),
    items: [
      {
        title: 'Installing via NPM or Yarn',
        path: sluggify('Installing via NPM or Yarn'),
      },
      {
        title: 'Importing contracts',
        path: sluggify('Importing contracts'),
      },
      {
        title: 'Getting L2 contract addresses',
        path: sluggify('Getting L2 contract addresses'),
      },
    ],
  },
  {
    title: 'Interacting from the client side',
    path: sluggify('Interacting from the client side'),
    items: [
      {
        title: 'Installing via NPM or Yarn',
        path: sluggify('Installing via NPM or Yarn'),
      },
      {
        title: 'Getting contract artifacts, interfaces, and ABIs',
        path: sluggify('Getting contract artifacts, interfaces, and ABIs'),
      },
      {
        title: 'Getting L2 contract addresses',
        path: sluggify('Getting L2 contract addresses'),
      },
    ],
  },
]);
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1 {
  margin: 0;
}
</style>

interface DocSection {
  title: string;
  docs: Doc[];
}

interface Doc {
  title: string;
  content: string;
}

const docs: DocSection[] = [
  {
    title: 'Building on Optimism',
    docs: [
      {
        title: 'Transaction fees on OP Mainnet',
        content: `
Transaction fees on OP Mainnet work a lot like fees on EthereHowever, Layer 2 introduces some new paradigms that means it can never be exactly like Ethereum.
Luckily, OP Mainnet's [EVM equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) makes these differences easy to understand and even easier to handle within your app.

This page includes the formula for calculating the gas cost of transactions on OP Mainnet.
You can [use our SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas) to calculate those costs for you. If the SDK is too heavy, or you just want to walk through some reference code, use [@eth-optimism/fee-estimation](https://github.com/ethereum-optimism/optimism/tree/develop/packages/fee-estimation). OP Stack fee estimation will soon be natively availabe in your favorite Ethereum tools.

There are two costs for transaction on OP Mainnet: the L2 execution fee and the L1 data/security fee.

## The L2 execution fee

Just like on Ethereum, transactions on OP Mainnet have to pay **gas** for the amount of computation and storage that they use.
Every L2 transaction will pay some **execution fee**, equal to the amount of gas used by the transaction multiplied by the gas price attached to the transaction.
This is exactly how fees work on Ethereum with the added bonus that gas prices on OP Mainnet are seriously low.

Here's the (simple) math:

\`\`\`
transaction_gas_price = l2_base_fee + l2_priority_fee
l2_execution_fee = transaction_gas_price * l2_gas_used
\`\`\`

The amount of L2 gas used depends on the particular transaction that you're trying to send.
Thanks to [EVM equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), transactions typically use approximately the same amount of gas on OP Mainnet as they do on Ethereum.
Gas prices fluctuate with time and congestion, but you can always check the current estimated L2 gas price on the [public OP Mainnet dashboard](https://optimism.io/gas-tracker).



### Base fee

The [base fee](https://eips.ethereum.org/EIPS/eip-1559#simple-summary) is charged for each unit of gas that a transaction uses.
It is the same base fee for each transaction in the block, and is determined by formula based on the base fee of the previous block and how full that block was.


[The EIP-1559 parameters](./differences.md#eip-1559) have different values in OP Mainnet (and most other OP Stack chain) than those on L1 Ethereum.
As a result, in every block the base fee can be between 98% and 110% of the previous value. 

The base fee specified in the transaction (\`max_gas_fee - max_priority_fee\`) is not necessarily the base fee that the user will pay, *it is merely an upper limit to that amount*.
In most cases, it makes sense to specify a much higher base fee than the current value, to ensure acceptance. 

For example, as I'm writing this, ETH is about $2000, and a cent is about 5000 gwei. 
Assuming 20% of a cent is an acceptable base fee for a transaction, and that the transaction is a big 5,000,000 gas one (at the target block size), this gives us a base fee of 200,000 wei. 
That plus a reasonable priority fee would be the value to put in the transaction as max gas fee, even though the L2 base fee (as I'm writing this) is 2,420 wei. 

You can get the current L2 base fee [in the gas tracker dashboard](https://optimism.io/gas-tracker).



### Priority fee

In contrast to the base fee, the priority fee in the transaction is the amount that the user pays, and therefore it makes sense to keep it as low as possible.
To enable your users to select a priority fee, you can [build a priority fee estimator](https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559).
If you already have estimating code you use for L1 Ethereum, you can just use that.


## The L1 data fee

OP Mainnet differs from Ethereum because all transactions on OP Mainnet are also published to Ethereum.
This step is crucial to the security properties of OP Mainnet because it means that all of the data you need to sync an OP Mainnet node is always publicly available on Ethereum.
It's what makes OP Mainnet an L2.

Users on OP Mainnet have to pay for the cost of submitting their transactions to Ethereum.
We call this the **L1 data fee**, and it's the primary discrepancy between OP Mainnet (and other L2s) and Ethereum.
Because the cost of gas is so expensive on Ethereum, the L1 data fee typically dominates the total cost of a transaction on OP Mainnet.
This fee is based on four factors:

1. The current gas price on Ethereum.
2. The gas cost to publish the transaction to Ethereum. This scales roughly with the size of the transaction (in bytes).
3. A fixed overhead cost denominated in gas. This is currently set to 188.
4. A dynamic overhead cost which scales the L1 fee paid by a fixed number. This is currently set to 0.684.

Here's the math:

\`\`\`
l1_data_fee = l1_gas_price * (tx_data_gas + fixed_overhead) * dynamic_overhead
\`\`\`

Where \`tx_data_gas\` is:

\`\`\`
tx_data_gas = count_zero_bytes(tx_data) * 4 + count_non_zero_bytes(tx_data) * 16
\`\`\`

You can read the parameter values from the [gas oracle contract](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F#readContract).


## Transaction fees' effect on software development

### Sending transactions

The process of sending a transaction on OP Mainnet is identical to the process of sending a transaction on Ethereum.
When sending a transaction, you should provide a gas price greater than or equal to the current L2 gas price, or use [transaction type 2](https://www.educative.io/answers/type-0-vs-type-2-ethereum-transactions) and a priority fee that is within the same range as the transactions included in the latest block.
Similarly, you should set your transaction gas limit in the same way that you would set your transaction gas limit on Ethereum (e.g. via \`eth_estimateGas\`).


### Displaying fees to users

Many Ethereum applications display estimated fees to users by multiplying the gas price by the gas limit.
However, as discussed earlier, users on OP Mainnet are charged both an L2 execution fee and an L1 data fee.
As a result, you should display the sum of both of these fees to give users the most accurate estimate of the total cost of a transaction.

[See here for a code sample using the JavaScript SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas)

#### Estimating the L2 execution fee

You can estimate the L2 execution fee by multiplying the gas price by the gas limit, just like on Ethereum.

#### Estimating the L1 data fee

You can use the SDK [(see here)](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
Alternatively, you can estimate the L1 data fee using the \`GasPriceOracle\` predeployed smart contract located at [\`0x420000000000000000000000000000000000000F\`](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F).
[The \`GasPriceOracle\` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) is located at the same address on every Optimism network (mainnet and testnet).
To do so, call \`GasPriceOracle.getL1Fee(<unsigned RLP encoded transaction>)\`.

#### Estimating the total fee

You can estimate the total fee by combining your estimates for the L2 execution fee and L1 data fee.

### Sending max ETH

Sending the maximum amount of ETH that a user has in their wallet is a relatively common use case.
When doing this, you will need to subtract the estimated L2 execution fee and the estimated L1 data fee from the amount of ETH you want the user to send.
Use the logic described above for estimating the total fee.

## Additional RPC Errors

### Insufficient funds

- Error code: \`-32000\`
- Error message: \`invalid transaction: insufficient funds for l1Fee + l2Fee + value\`

You'll get this error when attempting to send a transaction and you don't have enough ETH to pay for the value of the transaction, the L2 execution fee, and the L1 data fee.
You might get this error when attempting to send max ETH if you aren't properly accounting for both the L2 execution fee and the L1 data fee.`,
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
      {
        title: 'Running a local development environment',
        content: `
  ## What is this?

A development environment is a local installation of the entire OP Mainnet system.
Our default development environment includes both L1 and L2 development nodes.
Running the OP Mainnet environment locally is a great way to test your code and see how your contracts will behave on OP Mainnet before you graduate to a testnet deployment (and eventually a mainnet deployment).

Alternatively, you can get a hosted development node from [Alchemy](https://www.alchemy.com/optimism) or [any of these providers](../../useful-tools/providers.md).


## Do I need this?

We generally recommend using the local development environment if your application falls into one of the following categories:

1. **You're building contracts on both OP Mainnet and Ethereum that need to interact with one another.** The local development environment is a great way to quickly test interactions between L1 and L2. The OP Mainnet and test networks have a communication delay between L1 and L2 that can make testing slow during the early stages of development.

2. **You're building an application that might be subject to one of the few [differences between Ethereum and OP Mainnet](./differences.md).** Although OP Mainnet is [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), it's not exactly the same as Ethereum. If you're building an application that might be subject to one of these differences, you should use the local development environment to double check that everything is running as expected. You might otherwise have unexpected issues when you move to testnet. We strongly recommend reviewing these differences carefully to see if you might fall into this category.

However, not everyone will need to use the local development environment.
OP Mainnet is [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), which means that OP Mainnet looks almost exactly like Ethereum under the hood.
If you don't fall into one of the above categories, you can probably get away with simply relying on existing testing tools like Truffle or Hardhat.
If you don't know whether or not you should be using the development environment, feel free to hop into the [Optimism discord](https://discord-gateway.optimism.io).
Someone nice will help you out!


## How to do it

The Optimism monorepo includes [a devnode setup you can use](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/meta/devnet.md).

### Installation 

1. First, make sure these components are installed.
Note that the command line directions were verified under Ubuntu 20.04 LTS.
Other OSes or versions may use different tools.

- The command line utilities \`make\` and \`jq\`.

\`\`\`sh
sudo apt install -y make jq
  \`\`\`
  
  - [Go programming language](https://go.dev/)  

\`\`\`sh
sudo apt update
wget https://go.dev/dl/go1.20.linux-amd64.tar.gz
tar xvzf go1.20.linux-amd64.tar.gz
sudo cp go/bin/go /usr/bin/go
sudo mv go /usr/lib
echo export GOROOT=/usr/lib/go >> ~/.bashrc
  \`\`\`
  
  - [Docker (the engine version is enough)](https://docs.docker.com/engine/install/#server)

The latest version of docker uses \`docker compose\` instead of a separate \`docker-compose\` executable.
  To process scripts that use \`docker-compose\`, run these commands:
  
  \`\`\`sh  
echo docker compose '$*' | sudo tee /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose 
  \`\`\`
  
  - The Optimism monorepo.

\`\`\`sh
git clone https://github.com/ethereum-optimism/optimism.git
cd optimism
\`\`\`
  
  
### Additional information

- To start, run (in the root directory of the monorepo) \`make devnet-up\`.  
The first time it runs it will be relatively slow because it needs to download the images, after that it will be faster.
  
- To stop, run (in the root directory of the monorepo) \`make devnet-down\`.

- To clean everything, run (in the root directory of the monorepo) \`make devnet-clean\`.

- [The monorepo includes the L1 contract addresses](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/deploy-config/devnetL1.json).
The L2 contract addresses are, of course, the standard ones.
  
- There are some differences between the development node and the real world (a.k.a. Ethereum mainnet and OP Mainnet):

| Parameter | Real-world | Devnode |
| - | -: | -: |
| L1 chain ID |  1 | 900 
| L2 chain ID | 10 | 901
| Time between L1 blocks (in seconds) | 12 | 3
  
- Test ETH:

- Address: \`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266\`
  - Private key: \`ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80\`
  `,
      },
      {
        title: 'Running an OP Mainnet or testnet node',
        content: `
If you're looking to build an app on OP Mainnet you'll need access to an OP Mainnet node. You have two options - use a hosted node from providers like Alchemy or run your own. 

## Hosted node providers

You can get a free, hosted one from [any of these providers](../../useful-tools/providers.md) to get up and building quickly. Of them, [Alchemy](https://www.alchemy.com/optimism) is our preferred node provider, and is used to power our [public endpoint](../../useful-tools/networks.md). 

However, you might be interested in running your very own node.
Here we'll go over the process of running an OP Mainnet or testnet node for yourself.

## Upgrades

If you run a node you need to subscribe to [an update feed](../releases.md) (either [the mailing list](https://groups.google.com/a/optimism.io/g/optimism-announce) or [the RSS feed](https://changelog.optimism.io/feed.xml)) to know when to upgrade. 
Otherwise, your node will eventually stop working.

## Configuration choices

### Hardware requirements

Replicas need to store the transaction history of OP Mainnet (or the relevant OP testnet) and to run Geth. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 500 GB free (for OP Mainnet).

### Source of synchronization



[The \`op-geth\` component](../bedrock/explainer.md#execution-client) synchronizes from both other OP Mainnet (or testnet) nodes (https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#happy-path-sync), meaning L2, [and Ethereum (or the appropriate L1 testnet)](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#worst-case-sync) if necessary.

To synchronize only from L1, you edit the [op-node configuration](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md) to set \`OP_NODE_P2P_DISABLE\` to \`true\`.

When you use RPC to get block information (https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md#l2-output-rpc-method), you can specify one of four options for \`blockNumber\`:

- an actual block number
- **pending**: Latest L2 block
- **latest**: Latest block written to L1
- **finalized**: Latest block fully finalized on L1 (a process that takes 12 minutes with Proof of Stake)



## Docker configuration

The recommended method to create a replica is to use [Docker](https://www.docker.com/) and the Docker images we provide for [\`op-geth\`](https://github.com/ethereum-optimism/op-geth/releases/latest) and [\`op-node\`](https://github.com/ethereum-optimism/optimism/releases/).
For \`op-node\` you need to scroll down to the latest release that has \`op-node\`.

They include all the configuration settings.
This is the recommended method because it is what we for our own systems.
As such, the docker images go through a lot more tests than any other configuration.

### Configuring and running the node

Follow [these instructions](https://github.com/smartcontracts/simple-optimism-node) to build and run the node.


## Non-docker configuration

Here are the instructions if you want to build you own read-only replica without relying on our images.
These instructions were generated on an Ubuntu 20.04 box, but they should work with other systems too.

**Note:** This is *not* the recommended configuration.
While we did QA on these instructions and they work, the QA that the docker images undergo is much more extensive.


### Build the Optimism Monorepo

1. Clone the [Optimism Monorepo](https://github.com/ethereum-optimism/optimism).

    \`\`\`bash
    cd ~
    git clone https://github.com/ethereum-optimism/optimism.git
    \`\`\`

1. Install required modules. 
   This is a slow process, while it is running you can already start building \`op-geth\`, as shown below.

    \`\`\`bash
    cd optimism
    yarn install
    \`\`\`

1. Build the various packages inside of the Optimism Monorepo.

    \`\`\`bash
    make op-node
    yarn build
    \`\`\`

### Build op-geth

1. Clone [\`op-geth\`](https://github.com/ethereum-optimism/op-geth):

    \`\`\`bash
    cd ~
    git clone https://github.com/ethereum-optimism/op-geth.git
    \`\`\`


1. Build \`op-geth\`:

    \`\`\`bash
    cd op-geth    
    make geth
    \`\`\`



### Get the data dir

The next step is to download the data directory for \`op-geth\`.

1. Download the correct data directory snapshot.

   - [OP Mainnet](https://datadirs.optimism.io/mainnet-bedrock.tar.zst)
   - [OP Goerli](https://datadirs.optimism.io/goerli-bedrock.tar.zst)

1. Create the data directory in \`op-geth\` and fill it.
   Note that these directions assume the data directory snapshot is at \`~\`, the home directory. Modify if needed.

   \`\`\`sh
   cd ~/op-geth
   mkdir datadir
   cd datadir
   tar xvf ~/*bedrock.tar
   \`\`\`

1. Create a shared secret with \`op-node\`:

   \`\`\`sh
   cd ~/op-geth
   openssl rand -hex 32 > jwt.txt
   cp jwt.txt ~/optimism/op-node
   \`\`\`

### Scripts to start the different components

#### \`op-geth\`

This is the script for OP Goerli.
For OP Mainnet (or other OP networks in the future, [get the sequencer URL here](../../useful-tools/networks.md)).

\`\`\`
#! /usr/bin/bash

SEQUENCER_URL=https://goerli-sequencer.optimism.io/

cd ~/op-geth

./build/bin/geth \
  --ws \
  --ws.port=8546 \
  --ws.addr=0.0.0.0 \
  --ws.origins="*" \
  --http \
  --http.port=8545 \
  --http.addr=0.0.0.0 \
  --http.vhosts="*" \
  --http.corsdomain="*" \
  --authrpc.addr=localhost \
  --authrpc.jwtsecret=./jwt.txt \
  --authrpc.port=8551 \
  --authrpc.vhosts="*" \
  --verbosity=3 \
  --rollup.sequencerhttp=$SEQUENCER_URL \
  --nodiscover \
  --syncmode=full \
  --maxpeers=0 \
  --datadir=./datadir \
  --snapshot=false
\`\`\`


#### \`op-node\`

- Change \`<< URL to L1 >>\` to a service provider's URL for the L1 network (either L1 Ethereum or Goerli).
- Set \`L1KIND\` to the network provider you are using (alchemy, infura, etc.).
- Set \`NET\` to either \`goerli\` or \`mainnet\`.


\`\`\`
#! /usr/bin/bash

L1URL=  << URL to L1 >>
L1KIND=alchemy
NET=goerli

cd ~/optimism/op-node

./bin/op-node \
        --l1=$L1UL  \
        --l1.rpckind=$L1KIND \
        --l2=http://localhost:8551 \
        --l2.jwt-secret=./jwt.txt \
        --network=$NET \
        --rpc.addr=0.0.0.0 \
        --rpc.port=8547

\`\`\`        




### The initial synchornization

The datadir provided by Optimism is not updated continuously, so before you can use the node you need a to synchronize it.

During that process you get log messages from \`op-node\`, and nothing else appears to happen.

\`\`\`
INFO [06-26|13:31:20.389] Advancing bq origin                      origin=17171d..1bc69b:8300332 originBehind=false
\`\`\`

That is normal - it means that \`op-node\` is looking for a location in the batch queue. 
After a few minutes it finds it, and then it can start synchronizing.

While it is synchronizing, you can expect log messages such as these from \`op-node\`:

\`\`\`
INFO [06-26|14:00:59.460] Sync progress                            reason="processed safe block derived from L1" l2_finalized=ef93e6..e0f367:4067805 l2_safe=7fe3f6..900127:4068014 l2_unsafe=7fe3f6..900127:4068014 l2_time=1,673,564,096 l1_derived=6079cd..be4231:8301091
INFO [06-26|14:00:59.460] Found next batch                         epoch=8e8a03..11a6de:8301087 batch_epoch=8301087 batch_timestamp=1,673,564,098
INFO [06-26|14:00:59.461] generated attributes in payload queue    txs=1  timestamp=1,673,564,098
INFO [06-26|14:00:59.463] inserted block                           hash=e80dc4..72a759 number=4,068,015 state_root=660ced..043025 timestamp=1,673,564,098 parent=7fe3f6..900127 prev_randao=78e43d..36f07a fee_recipient=0x4200000000000000000000000000000000000011 txs=1  update_safe=true
\`\`\`

And log messages such as these from \`op-geth\`:

\`\`\`
INFO [06-26|14:02:12.974] Imported new potential chain segment     number=4,068,194 hash=a334a0..609a83 blocks=1         txs=1         mgas=0.000  elapsed=1.482ms     mgasps=0.000   age=5mo2w20h dirty=2.31MiB
INFO [06-26|14:02:12.976] Chain head was updated                   number=4,068,194 hash=a334a0..609a83 root=e80f5e..dd06f9 elapsed="188.373µs" age=5mo2w20h
INFO [06-26|14:02:12.982] Starting work on payload                 id=0x5542117d680dbd4e
\`\`\`

#### How long will the synchronization take?

To estimate how long the synchronization will take, you need to first find out how many blocks you synchronize in a minute. 

You can use this script, which uses [Foundry](https://book.getfoundry.sh/). and the UNIX Note that this script is for OP Goerli. 
For OP Mainnet substitute \`https://mainnet.optimism.io\`

\`\`\`sh
#! /usr/bin/bash

export ETH_RPC_URL=http://localhost:8545
T0=\`cast block latest number\` ; sleep 60 ; T1=\`cast block latest number\`
PER_MIN=\`expr $T1 - $T0\`
echo Blocks per minute: $PER_MIN


if [ $PER_MIN -eq 0 ]; then
    echo Not synching
    exit;
fi

# During that minute the head of the chain progressed by thirty blocks
PROGRESS_PER_MIN=\`expr $PER_MIN - 30\`
echo Progress per minute: $PROGRESS_PER_MIN


# How many more blocks do we need?
HEAD=\`cast block --rpc-url https://goerli.optimism.io latest number\`
BEHIND=\`expr $HEAD - $T1\` 
MINUTES=\`expr $BEHIND / $PROGRESS_PER_MIN\`
HOURS=\`expr $MINUTES / 60\`
echo Hours until sync completed: $HOURS

if [ $HOURS -gt 24 ] ; then
   DAYS=\`expr $HOURS / 24\`
   echo Days until sync complete: $DAYS
fi
\`\`\`


### Operations

It is best to start \`op-geth\` first and shut it down last.
      `,
      },
      {
        title: 'Differences between Ethereum and OP Mainnet',
        content: `
It's important to note that there are various minor discrepancies between the behavior of OP Mainnet and Ethereum.
You should be aware of these descrepancies when building apps on top of OP Mainnet.

## Opcode Differences

| Opcode  | Solidity equivalent | Behavior |
| - | - | - |
| \`COINBASE\`	| \`block.coinbase\`   | Undefined |
| \`DIFFICULTY\` | \`block.difficulty\` | Random value. As this value is set by the sequencer, it is not as reliably random as the L1 equivalent. [You can use an oracle for randomness](../../useful-tools/oracles.md#verifiable-randomness-function-vrf). |
| \`NUMBER\`     | \`block.number\`     | L2 block number
| \`TIMESTAMP\`  | \`block.timestamp\`  | Timestamp of the L2 block
| \`ORIGIN\`     | \`tx.origin\`        | If the transaction is an L1 ⇒ L2 transaction, then \`tx.origin\` is set to the [aliased address](#address-aliasing) of the address that triggered the L1 ⇒ L2 transaction. Otherwise, this opcode behaves normally. |
| \`CALLER\`     | \`msg.sender\`      | If the transaction is an L1 ⇒ L2 transaction, and this is the initial call (rather than an internal transaction from one contract to another), the same [address aliasing](#address-aliasing) behavior applies.
| [\`PUSH0\`](https://www.evm.codes/#5f?fork=shanghai)      | N/A               | Opcode not supported yet (will be added in a hardfork)


### Accessing L1 information

If you need the equivalent information from the latest L1 block, you can get it from [the \`L1Block\` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L1Block.sol).
This contract is a predeploy at address [\`0x4200000000000000000000000000000000000015\`](https://goerli-optimism.etherscan.io/address/0x4200000000000000000000000000000000000015).
You can use [the getter functions](https://docs.soliditylang.org/en/v0.8.12/contracts.html#getter-functions) to get these parameters:

- \`number\`: The latest L1 block number known to L2
- \`timestamp\`: The timestamp of the latest L1 block
- \`basefee\`: The base fee of the latest L1 block
- \`hash\`: The hash of the latest L1 block
- \`sequenceNumber\`: The number of the L2 block within the epoch (the epoch changes when there is a new L1 block)

### Address Aliasing

<details>

Because of the behavior of the \`CREATE\` opcode, it is possible for a user to create a contract on L1 and on L2 that share the same address but have different bytecode.
This can break trust assumptions, because one contract may be trusted and another be untrusted (see below).
To prevent this problem the behavior of the \`ORIGIN\` and \`CALLER\` opcodes (\`tx.origin\` and \`msg.sender\`) differs slightly between L1 and L2.

The value of \`tx.origin\` is determined as follows:


| Call source                        | \`tx.origin\`                                |
| ---------------------------------- | ------------------------------------------ | 
| L2 user (Externally Owned Account) | The user's address (same as in Ethereum)   |
| L1 user (Externally Owned Account) | The user's address (same as in Ethereum)   |
| L1 contract (using \`CanonicalTransactionChain.enqueue\`) | \`L1_contract_address + 0x1111000000000000000000000000000000001111\` |


The value of \`msg.sender\` at the top-level (the very first contract being called) is always equal to \`tx.origin\`.
Therefore, if the value of \`tx.origin\` is affected by the rules defined above, the top-level value of \`msg.sender\` will also be impacted.

Note that in general, [\`tx.origin\` should *not* be used for authorization](https://docs.soliditylang.org/en/latest/security-considerations.html#tx-origin). 
However, that is a separate issue from address aliasing because address aliasing also affects \`msg.sender\`.



#### Why is address aliasing an issue?


The problem with two identical source addresses (the L1 contract and the L2 contract) is that we extend trust based on the address.
It is possible that we will want to trust one of the contracts, but not the other.

1. Helena Hacker forks [Uniswap](https://uniswap.org/) to create her own exchange (on L2), called Hackswap.

   **Note:** There are actually multiple contracts in Uniswap, so this explanation is a bit simplified.
   [See here if you want additional details](https://ethereum.org/en/developers/tutorials/uniswap-v2-annotated-code/).

1. Helena Hacker provides Hackswap with liquidity that appears to allow for profitable arbitrage opportunities.
   For example, she can make it so that you can spend 1 [DAI](https://www.coindesk.com/price/dai/)to buy 1.1 [USDT](https://www.coindesk.com/price/tether/).
   Both of those coins are supposed to be worth exactly $1. 

1. Nimrod Naive knows that if something looks too good to be true it probably is.
   However, he checks the Hackswap contract's bytecode and verifies it is 100% identical to Uniswap.
   He decides this means the contract can be trusted to behave exactly as Uniswap does.

1. Nimrod approves an allowance of 1000 DAI for the Hackswap contract.
   Nimrod expects to call the swap function on Hackswap and receive back nearly 1100 USDT.


1. Before Nimrod's swap transaction is sent to the blockchain, Helena Hacker sends a transaction from an L1 contract with the same address as Hackswap.
   This transaction transfers 1000 DAI from Nimrod's address to Helena Hacker's address.
   If this transaction were to come from the same address as Hackswap on L2, it would be able to transfer the 1000 DAI because of the allowance Nimrod *had* to give Hackswap in the previous step to swap tokens.
   
   Nimrod, despite his naivete, is protected because OP Mainnet modified the transaction's \`tx.origin\` (which is also the initial \`msg.sender\`).
   That transaction comes from a *different* address, one that does not have the allowance.

**Note:** It is simple to create two different contracts on the same address in different chains. 
But it is nearly impossible to create two that are different by a specified amount, so Helena Hacker can't do that.

</details>



## Transactions

### Transaction costs

[Transaction costs on OP Mainnet](./transaction-fees.md) include an [L2 execution fee](./transaction-fees.md#the-l2-execution-fee) and an [L1 data fee](./transaction-fees.md#the-l1-data-fee). 

#### EIP-1559

The L2 execution fee is calculated using [EIP-1559](https://notes.ethereum.org/@vbuterin/eip-1559-faq). The cost of a unit of gas is composed of two components:

- **Base fee**: This fee is the same for all transactions in a block. It varies between blocks based on the difference between the actual size of the blocks (which depends on the demand for block space) and the target block size. When the block uses more gas than the target block size the base fee goes up to discourage demand. When the block uses less gas than the target block size the base fee goes down to encourage demand.
- **Priority fee**: This fee is specified in the transaction itself and varies between transactions. Block proposers are expected to select the transactions that offer them the highest priority fees first.

The EIP-1559 parameters are different:

  | Parameter | OP Mainnet value | Ethereum value (for reference) |
  | - | -: | -: |
  | Block gas limit | 30,000,000 gas | 30,000,000 gas
  | Block gas target | 5,000,000 gas | 15,000,000 gas
  | EIP-1559 elasticity multiplier | 6 | 2
  | EIP-1559 denominator | 50 | 8
  | Maximum base fee increase (per block) | 10% | 12.5%
  | Maximum base fee decrease (per block) | 2% | 12.5%
  | Block time in seconds | 2 | 12



### Transaction pool (a.k.a. mempool)

As in L1 Ethereum, transactions are stored in a pool until they can be included in a block.
To minimize MEV, Bedrock's mempool is private. 
To submit transactions, you will need to configure \`op-geth\` to forward transactions to the sequencer. This may change in the future.

The sequencer processes transactions in the mempool in order of their base and priority fees.


## Blocks

There are several differences in the way blocks are produced between L1 Ethereum and OP Mainnet.


| Parameter           | L1 Ethereum | Optimism Bedrock |
| - | -: | -: |
| Time between blocks | 12 seconds<sup>1</sup>  | 2 seconds |
| Block target size   | 15,000,000 gas | 5,000,000 gas |
| Block maximum size  | 30,000,000 gas | 30,000,000 gas | 

(1) This is the ideal. 
    If any blocks are missed it could be an integer multiple such as 24 seconds, 36 seconds, etc.

**Note:** The L1 Ethereum parameter values are taken from [ethereum.org](https://ethereum.org/en/developers/docs/blocks/#block-time).


## Network specifications

### JSON-RPC differences

OP Mainnet uses the same [JSON-RPC API](https://eth.wiki/json-rpc/API) as Ethereum.
Some additional OP Mainnet specific methods have been introduced.
See the full list of [custom JSON-RPC methods](./json-rpc.md) for more information.


## Contract addresses

The addresses in which various infrastructure contracts are installed are different between L1 Ethereum and OP Mainnet.
For example, [WETH9](https://github.com/gnosis/canonical-weth/blob/master/contracts/WETH9.sol) is installed on L1 Ethereum on [address \`0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\`](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2). 
On OP Mainnet the same contract is installed on [address \`0x4200000000000000000000000000000000000006\`](https://explorer.optimism.io/address/0x4200000000000000000000000000000000000006).
      `,
      },
      {
        title: 'Testing Decentralized Applications for OP Mainnet',
        content: `        
For the most part running applications on OP Mainnet is identical to running them on Ethereum, so the testing is identical too.
In this article you learn the best practices for OP Mainnet testing where there are differences.


## Unit tests and single layer integration tests

The vast majority of tests do not involve any OP Mainnet-specific features.
In those cases, while you *could* test everything on OP Mainnet or a test network, that would normally be inefficient.
Most Ethereum development stacks include features that make testing easier, which normal Ethereum clients, such as geth (and our modified version, \`op-geth\`) don't support.
Therefore, it is a good idea to run the majority of tests, which do not rely on OP Mainnet-specific features, in the development stack.
It is a lot faster.

Ideally you would want to be able to run some tests on an OP test network, either a [local development environment](dev-node.md) or [the test network](../../useful-tools/networks.md#op-goerli).
This would be a much slower process, but it would let you identify cases where [the equivalence between OP Mainnet and Ethereum breaks down](differences.md) (or the equivalence between Ethereum itself and the development stack, for that matter).

## Multilayer integration tests

Some dapps need OP Mainnet-specific features that aren't available as part of the development stack.
For example, if your decentralized application relies on [inter-domain communication](../bridge/messaging.md), the effort of developing a stub to let you debug it in a development stack is probably greater than the hassle of having the automated test go to [a local development environment](dev-node.md) each time.


## Integration with other products

In many cases a decentralized application requires the services of other contracts. 
For example, [Perpetual v. 2](https://support.perp.com/hc/en-us/articles/5748372509081-Perpetual-Uniswap) cannot function without [Uniswap v. 3](https://uniswap.org/blog/uniswap-v3).

If that is the case you can use [mainnet forking](https://hardhat.org/hardhat-network/guides/mainnet-forking.html). 
It works with OP Mainnet. 
Alternatively, you can connect to our [test network](../../useful-tools/networks.md#op-goerli) if those contracts are also deployed there (in many cases they are).
        `,
      },
      {
        title: 'Making OP Mainnet Dapps Even Cheaper',
        content: `      
The cost of using a decentralized application in OP Mainnet is much lower than the cost of the equivalent application on L1 Ethereum.
[See here](https://l2fees.info/) for the current values.
However, with proper optimization, we can make our decentralized applications even cheaper.
Here are some strategies.

## Background
      
This is a basic introduction into some of the concepts you need to understand to fully optimise your contracts in the OP Mainnet environment.
      
### What are the transaction fees?
      
The cost of an L2 transaction on OP Mainnet is composed of two components:
      
- L2 execution fee, which is proportional to the gas actually used in processing the transaction.
         
- L1 data fee, which is proportional to:
- The gas cost of writing the transaction's data to L1 (roughly equal to the transaction's length)
- The cost of gas on L1.
The cost of gas on L1 can be extremely volatile. 
        
To view the current gas costs as a user, [see here](https://optimism.io/gas-tracker). To retrieve them programatically, [see here](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
      
For a more in depth look at how transaction fees are calculated see our [fee documentation](transaction-fees.md).
      
### Optimization tradeoffs
      
In almost all cases, the L1 data fee is the vast majority of the transaction's cost.
The L2 execution fee is, comparatively speaking, negligible.
This means that the optimization tradeoffs are very different in OP Mainnet than they are in Ethereum.
      
Transaction call data is *expensive*.
The cost of writing a byte to L1 is approximately 16 gas.
At a cost of 45 gwei per L1 gas unit, writing one byte to L1 on OP Mainnet costs 720 gwei, or 720,000 units of L2 gas (at the non-congested price of 0.001 gwei per L2 gas unit).
      
In comparison, onchain processing and storage are cheap.
The worst case for writing to storage (previously uninitialized storage) is a cost of [22100 L2 gas per EVM word, which contains 32 bytes of data](https://www.evm.codes/#55), which averages out to less than 700 L2 gas / byte.
At a cost of 45 gwei per L1 gas unit, this means it is cheaper to write a whole kilobyte to storage, rather than add one byte to the transaction call data. 
      
## Modify the [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html)
      
[The standard ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) was designed with L1 tradeoffs in mind. 
It uses four byte function selectors and pads values to a 32 byte size. 
Neither is optimal when using OP Mainnet.
      
It is much more efficient to [create a shorter ABI with just the required bytes, and decode it onchain](https://ethereum.org/en/developers/tutorials/short-abi/).
All of your [\`view\`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) and [\`pure\`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) functions can use the standard ABI at no cost.
      

## Use smaller values when possible
      
Your modified ABI is not going to pad values, so the less bytes you use the better.
For example, it is standard to use \`uint256\` for amounts.
This means that the highest number we can represent is 2<sup>256</sup>-1, or about 1.2*10<sup>77</sup>. 
When storing ETH balances, for example, using \`uint256\` is overkill as there are only [120 million ETH](https://ycharts.com/indicators/ethereum_supply). Thus, we can safely store ETH balances in \`uint88\` which is just eleven bytes.
      
Go through your contracts and identify any values that will never reach 32 bytes and reduce them to logical sizes. You can do this same process for ints, bytes and [other Solidity data types](https://docs.soliditylang.org/en/develop/types.html#types).
      
      `,
      },
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

export { Doc, DocSection, docs };

interface RecipeSection {
  title: string;
  recipes: Recipe[];
}

interface Recipe {
  title: string;
  content: string;
}

const recipes: RecipeSection[] = [
  {
    title: 'Getting Started',
    recipes: [
      {
        title: 'Adding to Wallet',
        content: '',
      },
      {
        title: 'Deploying a Contract',
        content: '',
      },
      {
        title: 'Making a Tx',
        content: '',
      },
      {
        title: 'Querying the Data',
        content: '',
      },
    ],
  },
  {
    title: 'Bridging',
    recipes: [
      {
        title: 'Ether Transfers',
        content: `
        #! /usr/local/bin/node

        // Transfers between L1 and L2 using the Optimism SDK
        
        const ethers = require("ethers")
        const optimismSDK = require("@eth-optimism/sdk")
        require('dotenv').config()
        
        
        const mnemonic = process.env.MNEMONIC
        
        const words = process.env.MNEMONIC.match(/[a-zA-Z]+/g).length
        validLength = [12, 15, 18, 24]
        if (!validLength.includes(words)) {
           console.log(\`The mnemonic (\${process.env.MNEMONIC}) is the wrong number of words\`)
           process.exit(-1)
        }
        
        const l1Url = \`https://eth-goerli.g.alchemy.com/v2/\${process.env.GOERLI_ALCHEMY_KEY}\`
        const l2Url = \`https://opt-goerli.g.alchemy.com/v2/\${process.env.OP_GOERLI_ALCHEMY_KEY}\`
        
        
        // Global variable because we need them almost everywhere
        let crossChainMessenger
        let addr    // Our address
        
        const getSigners = async () => {
            const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url)
            const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url)
            const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
            const privateKey = hdNode.derivePath(ethers.utils.defaultPath).privateKey
            const l1Wallet = new ethers.Wallet(privateKey, l1RpcProvider)
            const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider)
        
            return [l1Wallet, l2Wallet]
        }   // getSigners
        
        
        const setup = async() => {
          const [l1Signer, l2Signer] = await getSigners()
          addr = l1Signer.address
          crossChainMessenger = new optimismSDK.CrossChainMessenger({
              l1ChainId: 5,    // Goerli value, 1 for mainnet
              l2ChainId: 420,  // Goerli value, 10 for mainnet
              l1SignerOrProvider: l1Signer,
              l2SignerOrProvider: l2Signer,
          })
        }    // setup
        
        
        
        const gwei = BigInt(1e9)
        const eth = gwei * gwei   // 10^18
        const centieth = eth/100n
        
        
        const reportBalances = async () => {
          const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString().slice(0,-9)
          const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString().slice(0,-9)
        
          console.log(\`On L1:\${l1Balance} Gwei    On L2:\${l2Balance} Gwei\`)
        }    // reportBalances
        
        
        const depositETH = async () => {
        
          console.log("Deposit ETH")
          await reportBalances()
          const start = new Date()
        
          const response = await crossChainMessenger.depositETH(1000n * gwei)
          console.log(\`Transaction hash (on L1): \${response.hash}\`)
          await response.wait()
          console.log("Waiting for status to change to RELAYED")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash,
                                                          optimismSDK.MessageStatus.RELAYED)
        
          await reportBalances()
          console.log(\`depositETH took \${(new Date()-start)/1000} seconds\`)
        }     // depositETH()

        const withdrawETH = async () => { 
          
          console.log("Withdraw ETH")
          const start = new Date()  
          await reportBalances()
        
          const response = await crossChainMessenger.withdrawETH(centieth)
          console.log(\`Transaction hash (on L2): \${response.hash}\`)
          console.log(\`\tFor more information: https://goerli-optimism.etherscan.io/tx/\${response.hash}\`)
          await response.wait()
        
          console.log("Waiting for status to be READY_TO_PROVE")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash, 
            optimismSDK.MessageStatus.READY_TO_PROVE)
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.proveMessage(response.hash)
          
        
          console.log("In the challenge period, waiting for status READY_FOR_RELAY") 
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash, 
                                                        optimismSDK.MessageStatus.READY_FOR_RELAY) 
          console.log("Ready for relay, finalizing message now")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.finalizeMessage(response.hash)
        
          console.log("Waiting for status to change to RELAYED")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.waitForMessageStatus(response, 
            optimismSDK.MessageStatus.RELAYED)
          
          await reportBalances()   
          console.log(\`withdrawETH took \${(new Date()-start)/1000} seconds\`)  
        }     // withdrawETH()

        const main = async () => {
            await setup()
            await depositETH()
            await withdrawETH()
            // await depositERC20()
            // await withdrawERC20()
        }  // main
        
        
        
        main().then(() => process.exit(0))
          .catch((error) => {
            console.error(error)
            process.exit(1)
          })
        
        `,
      },
      {
        title: 'ERC20 Transfers',
        content: `
        #! /usr/local/bin/node

        // ERC-20 transfers between L1 and L2 using the Optimism SDK
        
        const ethers = require("ethers")
        const optimismSDK = require("@eth-optimism/sdk")
        require('dotenv').config()
        
        
        const mnemonic = process.env.MNEMONIC
        
        const words = process.env.MNEMONIC.match(/[a-zA-Z]+/g).length
        validLength = [12, 15, 18, 24]
        if (!validLength.includes(words)) {
           console.log(\`The mnemonic (\${process.env.MNEMONIC}) is the wrong number of words\`)
           process.exit(-1)
        }
        
        const l1Url = \`https://eth-goerli.g.alchemy.com/v2/\${process.env.GOERLI_ALCHEMY_KEY}\`
        const l2Url = \`https://opt-goerli.g.alchemy.com/v2/\${process.env.OP_GOERLI_ALCHEMY_KEY}\`
        
        
        // Contract addresses for OPTb tokens, taken
        // from https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/OUTb/data.json
        const erc20Addrs = {
          l1Addr: "0x32B3b2281717dA83463414af4E8CfB1970E56287",
          l2Addr: "0x3e7eF8f50246f725885102E8238CBba33F276747"
        }    // erc20Addrs
        
        // To learn how to deploy an L2 equivalent to an L1 ERC-20 contract,
        // see here: 
        // https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token
        
        
        // Global variable because we need them almost everywhere
        let crossChainMessenger
        let l1ERC20, l2ERC20    // OUTb contracts to show ERC-20 transfers
        let ourAddr             // The address of the signer we use.  
        
        
        // Get signers on L1 and L2 (for the same address). Note that 
        // this address needs to have ETH on it, both on Optimism and
        // Optimism Georli
        const getSigners = async () => {
            const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url)
            const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url)
            const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
            const privateKey = hdNode.derivePath(ethers.utils.defaultPath).privateKey
            const l1Wallet = new ethers.Wallet(privateKey, l1RpcProvider)
            const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider)
        
            return [l1Wallet, l2Wallet]
        }   // getSigners
        
        
        
        // The ABI fragment for the contract. We only need to know how to do two things:
        // 1. Get an account's balance
        // 2. Call the faucet to get more (only works on L1). Of course, production 
        //    ERC-20 tokens tend to be a bit harder to acquire.
        const erc20ABI = [
          // balanceOf
          {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          },
          // faucet
          {
            inputs: [],
            name: "faucet",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          }  
        ]    // erc20ABI
        
        
        
        const setup = async() => {
          const [l1Signer, l2Signer] = await getSigners()
          ourAddr = l1Signer.address
          crossChainMessenger = new optimismSDK.CrossChainMessenger({
              l1ChainId: 5,    // Goerli value, 1 for mainnet
              l2ChainId: 420,  // Goerli value, 10 for mainnet
              l1SignerOrProvider: l1Signer,
              l2SignerOrProvider: l2Signer,
          })
          l1ERC20 = new ethers.Contract(erc20Addrs.l1Addr, erc20ABI, l1Signer)
          l2ERC20 = new ethers.Contract(erc20Addrs.l2Addr, erc20ABI, l2Signer)
        }    // setup
        
        
        
        const reportERC20Balances = async () => {
          const l1Balance = (await l1ERC20.balanceOf(ourAddr)).toString().slice(0,-18)
          const l2Balance = (await l2ERC20.balanceOf(ourAddr)).toString().slice(0,-18)
          console.log(\`OUTb on L1:\${l1Balance}     OUTb on L2:\${l2Balance}\`)
        
          if (l1Balance != 0) {
            return
          }
        
          console.log(\`You don't have enough OUTb on L1. Let's call the faucet to fix that\`)
          const tx = (await l1ERC20.faucet())
          console.log(\`Faucet tx: \${tx.hash}\`)
          console.log(\`\tMore info: https://goerli.etherscan.io/tx/\${tx.hash}\`)
          await tx.wait()
          const newBalance = (await l1ERC20.balanceOf(ourAddr)).toString().slice(0,-18)
          console.log(\`New L1 OUTb balance: \${newBalance}\`)
        }    // reportERC20Balances
        
        
        
        
        const oneToken = BigInt(1e18)
        
        
        const depositERC20 = async () => {
        
          console.log("Deposit ERC20")
          await reportERC20Balances()
          const start = new Date()
        
          // Need the l2 address to know which bridge is responsible
          const allowanceResponse = await crossChainMessenger.approveERC20(
            erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
          await allowanceResponse.wait()
          console.log(\`Allowance given by tx \${allowanceResponse.hash}\`)
          console.log(\`\tMore info: https://goerli.etherscan.io/tx/\${allowanceResponse.hash}\`)
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
        
          const response = await crossChainMessenger.depositERC20(
            erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
          console.log(\`Deposit transaction hash (on L1): \${response.hash}\`)
          console.log(\`\tMore info: https://goerli.etherscan.io/tx/\${response.hash}\`)
          await response.wait()
          console.log("Waiting for status to change to RELAYED")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash,
                                                          optimismSDK.MessageStatus.RELAYED)
        
          await reportERC20Balances()
          console.log(\`depositERC20 took \${(new Date()-start)/1000} seconds\`)
        }     // depositERC20()
        
        
        
        const withdrawERC20 = async () => {
        
          console.log("Withdraw ERC20")
          const start = new Date()
          await reportERC20Balances()
        
          const response = await crossChainMessenger.withdrawERC20(
            erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
          console.log(\`Transaction hash (on L2): \${response.hash}\`)
          console.log(\`\tFor more information: https://goerli-optimism.etherscan.io/tx/\${response.hash}\`)
          await response.wait()
        
          console.log("Waiting for status to be READY_TO_PROVE")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash, 
            optimismSDK.MessageStatus.READY_TO_PROVE)
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.proveMessage(response.hash)
          
        
          console.log("In the challenge period, waiting for status READY_FOR_RELAY") 
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)
          await crossChainMessenger.waitForMessageStatus(response.hash, 
                                                        optimismSDK.MessageStatus.READY_FOR_RELAY) 
          console.log("Ready for relay, finalizing message now")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.finalizeMessage(response.hash)
        
          console.log("Waiting for status to change to RELAYED")
          console.log(\`Time so far \${(new Date()-start)/1000} seconds\`)  
          await crossChainMessenger.waitForMessageStatus(response, 
            optimismSDK.MessageStatus.RELAYED)
          await reportERC20Balances()   
          console.log(\`withdrawERC20 took \${(new Date()-start)/1000} seconds\`)  
        }     // withdrawERC20()
        
        
        
        
        const main = async () => {
            await setup()
            await depositERC20()
            await withdrawERC20()
        }  // main
        
        
        
        main().then(() => process.exit(0))
          .catch((error) => {
            console.error(error)
            process.exit(1)
          })        
        `,
      },
      {
        title: 'Sending Data between L1 and L2',
        content: '',
      },
    ],
  },
  {
    title: 'Advanced',
    recipes: [
      {
        title: 'Running a Node',
        content: '',
      },
      {
        title: 'Tracing a Transaction between Layers',
        content: '',
      },
      {
        title: 'Creating an ERC20 Token',
        content: '',
      },
    ],
  },
];

export { RecipeSection, Recipe, recipes };

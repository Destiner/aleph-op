import { Ref, computed } from 'vue';

import useChain from '@/composables/useChain';
import {
  BASE,
  BASE_GOERLI,
  Chain,
  MODE_SEPOLIA,
  OPTIMISM,
  OPTIMISM_GOERLI,
  ZORA,
  ZORA_TESTNET,
} from '@/utils/chains';
import { AbiFragment, Contract } from '@/utils/contracts';

interface UseContracts {
  contracts: Ref<Contract[]>;
}

function useContracts(): UseContracts {
  const { id } = useChain();

  const contracts = computed<Contract[]>(() => getContracts(id.value));

  return { contracts };
}

const gasOracleAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    payable: false,
  },
  {
    inputs: [],
    name: 'DECIMALS',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'baseFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'gasPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [{ internalType: 'bytes', name: '_data', type: 'bytes' }],
    name: 'getL1Fee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [{ internalType: 'bytes', name: '_data', type: 'bytes' }],
    name: 'getL1GasUsed',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'l1BaseFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'overhead',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'scalar',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
] satisfies AbiFragment[];

const l1BlockAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    payable: false,
  },
  {
    inputs: [],
    name: 'DEPOSITOR_ACCOUNT',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'basefee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'batcherHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'hash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'l1FeeOverhead',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'l1FeeScalar',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'number',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'sequenceNumber',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      { internalType: 'uint64', name: '_number', type: 'uint64' },
      { internalType: 'uint64', name: '_timestamp', type: 'uint64' },
      { internalType: 'uint256', name: '_basefee', type: 'uint256' },
      { internalType: 'bytes32', name: '_hash', type: 'bytes32' },
      {
        internalType: 'uint64',
        name: '_sequenceNumber',
        type: 'uint64',
      },
      {
        internalType: 'bytes32',
        name: '_batcherHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_l1FeeOverhead',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_l1FeeScalar',
        type: 'uint256',
      },
    ],
    name: 'setL1BlockValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [],
    name: 'timestamp',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
] satisfies AbiFragment[];

const l2CrossDomainMessengerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l1CrossDomainMessenger',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
    payable: false,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'msgHash',
        type: 'bytes32',
      },
    ],
    name: 'FailedRelayedMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'msgHash',
        type: 'bytes32',
      },
    ],
    name: 'RelayedMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'messageNonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
    ],
    name: 'SentMessage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'SentMessageExtension1',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MESSAGE_VERSION',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'MIN_GAS_CALLDATA_OVERHEAD',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'MIN_GAS_DYNAMIC_OVERHEAD_DENOMINATOR',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'MIN_GAS_DYNAMIC_OVERHEAD_NUMERATOR',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'OTHER_MESSENGER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'RELAY_CALL_OVERHEAD',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'RELAY_CONSTANT_OVERHEAD',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'RELAY_GAS_CHECK_BUFFER',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'RELAY_RESERVED_GAS',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      { internalType: 'bytes', name: '_message', type: 'bytes' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
    ],
    name: 'baseGas',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'pure',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'failedMessages',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [],
    name: 'l1CrossDomainMessenger',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'messageNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_nonce', type: 'uint256' },
      { internalType: 'address', name: '_sender', type: 'address' },
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
      {
        internalType: 'uint256',
        name: '_minGasLimit',
        type: 'uint256',
      },
      { internalType: 'bytes', name: '_message', type: 'bytes' },
    ],
    name: 'relayMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'bytes', name: '_message', type: 'bytes' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'successfulMessages',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'xDomainMessageSender',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
] satisfies AbiFragment[];

const l2StandardBridgeAbi = [
  {
    inputs: [
      {
        internalType: 'addresspayable',
        name: '_otherBridge',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
    payable: false,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'l2Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'DepositFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'localToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'remoteToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'ERC20BridgeFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'localToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'remoteToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'ERC20BridgeInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'ETHBridgeFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'ETHBridgeInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'l2Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'WithdrawalInitiated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MESSENGER',
    outputs: [
      {
        internalType: 'contractCrossDomainMessenger',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'OTHER_BRIDGE',
    outputs: [
      {
        internalType: 'contractStandardBridge',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_localToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_remoteToken',
        type: 'address',
      },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_localToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_remoteToken',
        type: 'address',
      },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeERC20To',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeETHTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'deposits',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_localToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_remoteToken',
        type: 'address',
      },
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'finalizeBridgeERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'finalizeBridgeETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'finalizeDeposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [],
    name: 'l1TokenBridge',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'messenger',
    outputs: [
      {
        internalType: 'contractCrossDomainMessenger',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      {
        internalType: 'uint32',
        name: '_minGasLimit',
        type: 'uint32',
      },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
] satisfies AbiFragment[];

const l2ToL1MessagePasserAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    payable: false,
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'withdrawalHash',
        type: 'bytes32',
      },
    ],
    name: 'MessagePassed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawerBalanceBurnt',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MESSAGE_VERSION',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    payable: false,
    constant: false,
  },
  {
    inputs: [
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'uint256', name: '_gasLimit', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'initiateWithdrawal',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    constant: false,
  },
  {
    inputs: [],
    name: 'messageNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'sentMessages',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
    payable: false,
    constant: true,
  },
  { stateMutability: 'payable', type: 'receive', payable: true },
] satisfies AbiFragment[];

function getContracts(chain: Chain): Contract[] {
  // TODO support all chains
  switch (chain) {
    case OPTIMISM:
      return [
        {
          address: '0x420000000000000000000000000000000000000F',
          name: 'Gas Price Oracle',
          abi: gasOracleAbi,
        },
        {
          name: 'L1 Block',
          address: '0x4200000000000000000000000000000000000015',
          abi: l1BlockAbi,
        },
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0x4200000000000000000000000000000000000007',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x4200000000000000000000000000000000000010',
          abi: l2StandardBridgeAbi,
        },
        {
          name: 'L2-to-L1 Message Passer',
          address: '0x4200000000000000000000000000000000000016',
          abi: l2ToL1MessagePasserAbi,
        },
      ];
    case OPTIMISM_GOERLI:
      return [
        {
          address: '0x420000000000000000000000000000000000000F',
          name: 'Gas Price Oracle',
          abi: gasOracleAbi,
        },
        {
          name: 'L1 Block',
          address: '0x4200000000000000000000000000000000000015',
          abi: l1BlockAbi,
        },
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0x4200000000000000000000000000000000000007',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x4200000000000000000000000000000000000010',
          abi: l2StandardBridgeAbi,
        },
        {
          name: 'L2-to-L1 Message Passer',
          address: '0x4200000000000000000000000000000000000016',
          abi: l2ToL1MessagePasserAbi,
        },
      ];
    case BASE:
      return [
        {
          address: '0x420000000000000000000000000000000000000F',
          name: 'Gas Price Oracle',
          abi: gasOracleAbi,
        },
        {
          name: 'L1 Block',
          address: '0x4200000000000000000000000000000000000015',
          abi: l1BlockAbi,
        },
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0x4200000000000000000000000000000000000007',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x4200000000000000000000000000000000000010',
          abi: l2StandardBridgeAbi,
        },
        {
          name: 'L2-to-L1 Message Passer',
          address: '0x4200000000000000000000000000000000000016',
          abi: l2ToL1MessagePasserAbi,
        },
      ];
    case BASE_GOERLI:
      return [
        {
          address: '0x420000000000000000000000000000000000000F',
          name: 'Gas Price Oracle',
          abi: gasOracleAbi,
        },
        {
          name: 'L1 Block',
          address: '0x4200000000000000000000000000000000000015',
          abi: l1BlockAbi,
        },
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0x4200000000000000000000000000000000000007',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x4200000000000000000000000000000000000010',
          abi: l2StandardBridgeAbi,
        },
        {
          name: 'L2-to-L1 Message Passer',
          address: '0x4200000000000000000000000000000000000016',
          abi: l2ToL1MessagePasserAbi,
        },
      ];
    case ZORA:
      return [
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0xdC40a14d9abd6F410226f1E6de71aE03441ca506',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x3e2Ea9B92B7E48A52296fD261dc26fd995284631',
          abi: l2StandardBridgeAbi,
        },
      ];
    case ZORA_TESTNET:
      return [
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0xD87342e16352D33170557A7dA1e5fB966a60FafC',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x7CC09AC2452D6555d5e0C213Ab9E2d44eFbFc956',
          abi: l2StandardBridgeAbi,
        },
      ];
    case MODE_SEPOLIA:
      return [
        {
          address: '0x420000000000000000000000000000000000000F',
          name: 'Gas Price Oracle',
          abi: gasOracleAbi,
        },
        {
          name: 'L1 Block',
          address: '0x4200000000000000000000000000000000000015',
          abi: l1BlockAbi,
        },
        {
          name: 'L2 Cross-Domain Messenger',
          address: '0x4200000000000000000000000000000000000007',
          abi: l2CrossDomainMessengerAbi,
        },
        {
          name: 'L2 Standard Bridge',
          address: '0x4200000000000000000000000000000000000010',
          abi: l2StandardBridgeAbi,
        },
        {
          name: 'L2-to-L1 Message Passer',
          address: '0x4200000000000000000000000000000000000016',
          abi: l2ToL1MessagePasserAbi,
        },
      ];
    default:
      return [];
  }
}

export default useContracts;

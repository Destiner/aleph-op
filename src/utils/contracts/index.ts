import { Chain } from '../chains';

type ContractAddresses = ContractSingleAddress | ContractMultipleAddresses;

interface ContractSingleAddress {
  type: 'single';
  editable: boolean;
  values: Record<Chain, string>;
}

interface ContractMultipleAddresses {
  type: 'multiple';
  editable: boolean;
  values: ContractMultipleAddressValues;
}

type ContractMultipleAddressValues = Record<
  Chain,
  {
    label?: string;
    value: string;
  }[]
>;

interface Contract {
  name: string;
  address: string;
  abi: AbiFragment[];
  description?: string;
}

type AbiFragment =
  | ConstructorFragment
  | FallbackFragment
  | EventFragment
  | FunctionFragment
  | ReceiveFragment;

interface ConstructorFragment {
  payable: boolean;
  type: 'constructor';
  inputs: Input[];
  stateMutability: 'nonpayable' | 'payable';
}

interface FallbackFragment {
  payable: boolean;
  type: 'fallback';
  stateMutability: 'nonpayable' | 'payable';
}

interface EventFragment {
  type: 'event';
  anonymous: boolean;
  inputs: (Input & { indexed: boolean })[];
  name: string;
}

interface FunctionFragment {
  constant: boolean;
  payable: boolean;
  type: 'function';
  inputs: Input[];
  name: string;
  outputs: Input[];
  stateMutability: 'view' | 'pure' | 'nonpayable' | 'payable';
  description?: string;
}

interface ReceiveFragment {
  payable: boolean;
  type: 'receive';
  stateMutability: 'nonpayable' | 'payable';
}

type Fragment =
  | ConstructorFragment
  | EventFragment
  | FunctionFragment
  | ReceiveFragment;

type Input = ArrayInput | TupleInput | TupleArrayInput | PrimitiveInput;

type Output = Input;

interface BaseInput {
  name?: string;
  description?: string;
}

interface ArrayInput extends BaseInput {
  internalType?: string;
  type: `${PrimitiveInputType}[]`;
}

interface TupleInput extends BaseInput {
  type: 'tuple';
  components: Input[];
}

interface TupleArrayInput extends BaseInput {
  type: 'tuple[]';
  components: Input[];
}

interface PrimitiveInput extends BaseInput {
  internalType?: string;
  type: PrimitiveInputType;
}

type BytesInputType =
  | 'bytes'
  | 'bytes1'
  | 'bytes2'
  | 'bytes3'
  | 'bytes4'
  | 'bytes5'
  | 'bytes6'
  | 'bytes7'
  | 'bytes8'
  | 'bytes9'
  | 'bytes10'
  | 'bytes11'
  | 'bytes12'
  | 'bytes13'
  | 'bytes14'
  | 'bytes15'
  | 'bytes16'
  | 'bytes17'
  | 'bytes18'
  | 'bytes19'
  | 'bytes20'
  | 'bytes21'
  | 'bytes22'
  | 'bytes23'
  | 'bytes24'
  | 'bytes25'
  | 'bytes26'
  | 'bytes27'
  | 'bytes28'
  | 'bytes29'
  | 'bytes30'
  | 'bytes31'
  | 'bytes32';
type IntInputType =
  | 'int8'
  | 'int16'
  | 'int24'
  | 'int32'
  | 'int40'
  | 'int48'
  | 'int56'
  | 'int64'
  | 'int72'
  | 'int80'
  | 'int88'
  | 'int96'
  | 'int104'
  | 'int112'
  | 'int120'
  | 'int128'
  | 'int136'
  | 'int144'
  | 'int152'
  | 'int160'
  | 'int168'
  | 'int176'
  | 'int184'
  | 'int192'
  | 'int200'
  | 'int208'
  | 'int216'
  | 'int224'
  | 'int232'
  | 'int240'
  | 'int248'
  | 'int256';
type UintInputType = `u${IntInputType}`;

type PrimitiveInputType =
  | 'address'
  | 'bool'
  | BytesInputType
  | 'string'
  | IntInputType
  | UintInputType;

function getArrayParamItem(param: ArrayInput, index: number): PrimitiveInput {
  return {
    type: param.type.substring(0, param.type.length - 2) as PrimitiveInputType,
    name: index.toString(),
  };
}

function getTupleArrayParamItem(
  param: TupleArrayInput,
  index: number,
): TupleInput {
  return {
    type: 'tuple',
    name: index.toString(),
    components: param.components,
  };
}

function getConstructors(contract: Contract): ConstructorFragment[] {
  return contract.abi.filter(
    (fragment): fragment is ConstructorFragment =>
      fragment.type === 'constructor',
  );
}

function getFunctions(contract: Contract): FunctionFragment[] {
  return contract.abi.filter(
    (fragment): fragment is FunctionFragment => fragment.type === 'function',
  );
}

function isFunction(fragment: AbiFragment): fragment is FunctionFragment {
  return fragment.type === 'function';
}

function isReadFunction(fragment: FunctionFragment): boolean {
  return ['view', 'pure'].includes(fragment.stateMutability);
}

function getReadFunctions(contract: Contract): FunctionFragment[] {
  const functions = getFunctions(contract);
  const readFunctions = functions.filter((f) => isReadFunction(f));
  // Move constants to the end of the list
  readFunctions.sort((a, b) => {
    if (isConstant(a) && !isConstant(b)) {
      return 1;
    }
    if (!isConstant(a) && isConstant(b)) {
      return -1;
    }
    return 0;
  });
  return readFunctions;
}

function isConstant(func: FunctionFragment): boolean {
  return func.name === func.name.toUpperCase() && func.inputs.length === 0;
}

function getWriteFunctions(contract: Contract): FunctionFragment[] {
  const functions = getFunctions(contract);
  return functions.filter((f) =>
    ['nonpayable', 'payable'].includes(f.stateMutability),
  );
}

function getEvents(contract: Contract): EventFragment[] {
  return contract.abi.filter(
    (fragment): fragment is EventFragment => fragment.type === 'event',
  );
}

function getReceives(contract: Contract): ReceiveFragment[] {
  return contract.abi.filter(
    (fragment): fragment is ReceiveFragment => fragment.type === 'receive',
  );
}

function isArray(input: Input): input is ArrayInput {
  return input.type.endsWith('[]') && !isTupleArray(input);
}

function isTuple(input: Input): input is TupleInput {
  return input.type === 'tuple';
}

function isTupleArray(input: Input): input is TupleArrayInput {
  return input.type === 'tuple[]';
}

export {
  AbiFragment,
  ArrayInput,
  BytesInputType,
  Contract,
  ContractAddresses,
  ContractMultipleAddressValues,
  Fragment,
  FunctionFragment,
  ConstructorFragment,
  EventFragment,
  Input,
  Output,
  IntInputType,
  PrimitiveInput,
  UintInputType,
  getArrayParamItem,
  getTupleArrayParamItem,
  getConstructors,
  getFunctions,
  getReadFunctions,
  getWriteFunctions,
  getEvents,
  getReceives,
  isFunction,
  isReadFunction,
  isArray,
  isTuple,
  isTupleArray,
};

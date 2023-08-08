import { createPublicClient, http } from 'viem';
import { Ref, computed } from 'vue';

import useChainStore from '@/stores/chain';
import { Chain, getChainData, getEndpointUrl } from '@/utils/chains';

import useEnv from './useEnv';

const { providerKey } = useEnv();

interface UseChain {
  id: Ref<Chain>;
  client: Ref<ReturnType<typeof createPublicClient>>;
  setChain: (chainId: Chain) => void;
}

function useChain(): UseChain {
  const store = useChainStore();

  const id = computed(() => store.id);
  const client = computed(() =>
    createPublicClient({
      chain: getChainData(id.value),
      transport: http(getEndpointUrl(id.value, providerKey)),
    }),
  );

  function setChain(chainId: Chain): void {
    store.setId(chainId);
  }

  return { id, client, setChain };
}

export default useChain;

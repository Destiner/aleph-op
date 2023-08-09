import { Ref, computed } from 'vue';

import useChain from '@/composables/useChain';
import { Tool, getTools } from '@/utils/tooling';

interface UseTools {
  tools: Ref<Tool[]>;
}

function useTools(): UseTools {
  const { id } = useChain();

  const tools = computed<Tool[]>(() => getTools(id.value));

  return { tools };
}

export default useTools;

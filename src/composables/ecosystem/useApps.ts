import { Ref, computed } from 'vue';

import useChain from '@/composables/useChain';
import { App, getApps } from '@/utils/ecosystem';

interface UseApps {
  apps: Ref<App[]>;
}

function useApps(): UseApps {
  const { id } = useChain();

  const apps = computed<App[]>(() => getApps(id.value));

  return { apps };
}

export default useApps;

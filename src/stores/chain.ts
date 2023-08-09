import { defineStore } from 'pinia';
import { ref } from 'vue';

import { OPTIMISM, Chain } from '@/utils/chains';

const useStore = defineStore('chain', () => {
  const id = ref<Chain>(OPTIMISM);

  function setId(newId: Chain): void {
    id.value = newId;
  }

  return {
    id,
    setId,
  };
});

export default useStore;

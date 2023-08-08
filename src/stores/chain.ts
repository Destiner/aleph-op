import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ETHEREUM, Chain } from '@/utils/chains';

const useStore = defineStore('chain', () => {
  const id = ref<Chain>(ETHEREUM);

  function setId(newId: Chain): void {
    id.value = newId;
  }

  return {
    id,
    setId,
  };
});

export default useStore;

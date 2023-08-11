<template>
  <div class="header">
    <div class="description">
      <MarkdownView
        v-if="contract.description"
        :source="contract.description"
      />
    </div>
    <div class="header-address">
      <AddressView
        :model-value="address"
        :address="contract.address"
      />
      <div class="header-address-controls">
        <ButtonCopy
          :label="'Address'"
          :content="address"
        />
        <ButtonCopy
          :label="'ABI'"
          :content="JSON.stringify(contract.abi, null, 4)"
        />
        <ButtonLink :address="address" />
      </div>
    </div>
  </div>
  <div class="fragments">
    <FragmentList
      v-if="constructors.length > 0"
      :title="'Constructors'"
      :fragments="constructors"
      @select="handleFragmentSelect"
    />
    <FragmentList
      v-if="readFunctions.length > 0"
      :title="'Read Functions'"
      :fragments="readFunctions"
      @select="handleFragmentSelect"
    />
    <FragmentList
      v-if="writeFunctions.length > 0"
      :title="'Write Functions'"
      :fragments="writeFunctions"
      @select="handleFragmentSelect"
    />
    <FragmentList
      v-if="events.length > 0"
      :title="'Events'"
      :fragments="events"
      @select="handleFragmentSelect"
    />
    <FragmentList
      v-if="receives.length > 0"
      :title="'Receives'"
      :fragments="receives"
      @select="handleFragmentSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import MarkdownView from '@/components/__common/MarkdownView.vue';
import AddressView from '@/components/contracts/AddressView.vue';
import ButtonCopy from '@/components/contracts/ButtonCopy.vue';
import ButtonLink from '@/components/contracts/ButtonLink.vue';
import {
  Contract,
  getConstructors,
  getReadFunctions,
  getWriteFunctions,
  getEvents,
  getReceives,
  Fragment,
} from '@/utils/contracts';

import FragmentList from './FragmentList.vue';

const props = defineProps<{
  contract: Contract;
  address: string;
}>();

const emit = defineEmits<{
  select: [fragment: Fragment];
}>();

const constructors = computed(() => getConstructors(props.contract));
const readFunctions = computed(() => getReadFunctions(props.contract));
const writeFunctions = computed(() => getWriteFunctions(props.contract));
const events = computed(() => getEvents(props.contract));
const receives = computed(() => getReceives(props.contract));

function handleFragmentSelect(fragment: Fragment): void {
  emit('select', fragment);
}
</script>

<style scoped>
.header {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
}

.header-address {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--spacing-big);
}

.header-address-controls {
  display: flex;
  gap: var(--spacing-normal);
}
</style>

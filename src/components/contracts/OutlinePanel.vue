<template>
  <div class="outline">
    <div
      v-if="constructors.length > 0"
      class="section"
    >
      <div class="section-heading">Constructor</div>
      <div class="section-list">
        <a
          v-for="(_con, index) in constructors"
          :key="index"
          :href="'#constructor'"
          class="section-item"
        >
          constructor
        </a>
      </div>
    </div>
    <div
      v-if="readFunctions.length > 0"
      class="section"
    >
      <div class="section-heading">Read functions</div>
      <div class="section-list">
        <a
          v-for="(func, index) in readFunctions"
          :key="index"
          :href="`#${func.name}`"
          class="section-item"
        >
          {{ func.name }}
        </a>
      </div>
    </div>
    <div
      v-if="writeFunctions.length > 0"
      class="section"
    >
      <div class="section-heading">Write functions</div>
      <div class="section-list">
        <a
          v-for="(func, index) in writeFunctions"
          :key="index"
          :href="`#${func.name}`"
          class="section-item"
        >
          {{ func.name }}
        </a>
      </div>
    </div>
    <div
      v-if="events.length > 0"
      class="section"
    >
      <div class="section-heading">Events</div>
      <div class="section-list">
        <a
          v-for="(event, index) in events"
          :key="index"
          :href="`#${event.name}`"
          class="section-item"
        >
          {{ event.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  Contract,
  getConstructors,
  getReadFunctions,
  getWriteFunctions,
  getEvents,
} from '@/utils/contracts';

const props = defineProps<{
  contract: Contract;
}>();

const constructors = computed(() => getConstructors(props.contract));
const readFunctions = computed(() => getReadFunctions(props.contract));
const writeFunctions = computed(() => getWriteFunctions(props.contract));
const events = computed(() => getEvents(props.contract));
</script>

<style scoped>
.outline {
  display: flex;
  gap: var(--spacing-big);
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  opacity: 0.5;
}

.outline:hover {
  opacity: 1;
}

.section {
  display: flex;
  gap: var(--spacing-normal);
  flex-direction: column;
}

.section-heading {
  opacity: 0.5;
  color: var(--color-text-primary);
}

.section-list {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

.section-item {
  opacity: 0.5;
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  text-decoration: none;
}

.section-item::before {
  content: '\2012';
  display: inline-block;
  padding-right: 6px;
}

.section-item:hover {
  opacity: 1;
}
</style>

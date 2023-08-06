<template>
  <div class="select">
    <AlephLabel
      v-if="label"
      :value="label"
      :target="id"
      :disabled="disabled"
    />
    <div>
      <Listbox
        :model-value="selectedOption"
        @update:model-value="handleUpdate"
      >
        <ListboxButton
          :id="id"
          class="trigger"
          :class="{ disabled }"
        >
          <div class="trigger-label">{{ selectedOption.label }}</div>
          <IconChevronDown class="trigger-icon" />
        </ListboxButton>

        <transition name="list">
          <ListboxOptions class="list">
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.value"
              :value="option.value"
              as="template"
            >
              <li
                class="item"
                :class="{ active, selected }"
              >
                {{ option.label }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </Listbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { computed } from 'vue';

import AlephLabel from './AlephLabel.vue';
import IconChevronDown from './icon/ChevronDown.vue';

const props = defineProps<{
  modelValue: string;
  options: Option[];
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const id = computed(() => `select-${Math.random().toString().substring(2)}`);

const selectedOption = computed<Option>(
  () =>
    props.options.find((option) => option.value === props.modelValue) as Option,
);

function handleUpdate(value: string): void {
  emit('update:modelValue', value);
}
</script>

<script lang="ts">
interface Option {
  value: string;
  label: string;
}

// eslint-disable-next-line import/prefer-default-export
export { Option };
</script>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
}

.trigger {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 4px 8px;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  outline: none;
  background: transparent;
  color: var(--color-text-primary);
  font-size: var(--font-size-small);
  cursor: pointer;
}

.trigger:hover {
  border-color: var(--color-border-primary);
  background: var(--color-bg-secondary);
}

.trigger.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.trigger-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trigger-icon {
  width: 14px;
  height: 14px;
}

.list-enter-active {
  transition: all 200ms ease-out;
}

.list-enter-from {
  opacity: 0;
}

.list-enter-to {
  opacity: 1;
}

.list-leave-active {
  transition: all 150ms ease-in;
}

.list-leave-form {
  opacity: 1;
}

.list-leave-to {
  opacity: 0;
}

.list {
  display: flex;
  position: absolute;
  z-index: 2;
  gap: var(--spacing-small);
  flex-direction: column;
  margin-top: var(--spacing-small);
  padding: 2px;
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

.item {
  padding: 4px 12px;
  overflow: hidden;
  border-radius: var(--border-radius-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-normal);
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.item.active {
  background: var(--color-bg-tertiary);
}
</style>

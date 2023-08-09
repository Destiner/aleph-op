<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      class="dialog"
      @close="close()"
    >
      <TransitionChild
        as="template"
        enter="backdrop-enter"
        enter-from="backdrop-enter-from"
        enter-to="backdrop-enter-to"
        leave="backdrop-leave"
        leave-from="backdrop-leave-from"
        leave-to="backdrop-leave-to"
      >
        <div
          class="backdrop"
          aria-hidden="true"
        />
      </TransitionChild>
      <div class="body">
        <IconX
          class="button-close"
          @click="handleCrossClick"
        />
        <TransitionChild
          as="template"
          enter="panel-enter"
          enter-from="panel-enter-from"
          enter-to="panel-enter-to"
          leave="panel-leave"
          leave-from="panel-leave-form"
          leave-to="panel-leave-to"
        >
          <DialogPanel
            as="div"
            class="panel"
          >
            <NavSidebar
              :active-contract="activeContract"
              @select="handleSelect"
            />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import IconX from '@/components/__common/icon/X.vue';
import { Contract } from '@/utils/contracts';

import NavSidebar from './NavSidebar.vue';

defineProps<{
  activeContract: Contract;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  select: [contract: Contract];
}>();

function close(): void {
  emit('close');
}

function handleCrossClick(): void {
  emit('close');
}

function handleSelect(contract: Contract): void {
  emit('select', contract);
}
</script>

<style scoped>
.dialog {
  position: relative;
  z-index: 1;
}

.backdrop {
  position: fixed;
  inset: 0;
  background: #000000c0;
}

.body {
  display: flex;
  position: fixed;
  inset: 0;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.backdrop-enter {
  transition: all 200ms ease-out;
}

.backdrop-enter-from {
  opacity: 0;
}

.backdrop-enter-to {
  opacity: 1;
}

.backdrop-leave {
  transition: all 150ms ease-in;
}

.backdrop-leave-from {
  opacity: 1;
}

.backdrop-leave-to {
  opacity: 0;
}

.button-close {
  width: 28px;
  height: 28px;
  margin: 16px;
  opacity: 0.8;
}

@media (width >= 768px) {
  .button-close {
    display: none;
  }
}

.panel-enter {
  transition: all 200ms ease-out;
}

.panel-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.panel-enter-to {
  transform: scale(1);
  opacity: 1;
}

.panel-leave {
  transition: all 150ms ease-in;
}

.panel-leave-form {
  transform: scale(1);
  opacity: 1;
}

.panel-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.panel {
  width: 100%;
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-primary);
}

@media (width >= 768px) {
  .panel {
    width: 450px;
    height: 60vh;
  }
}
</style>

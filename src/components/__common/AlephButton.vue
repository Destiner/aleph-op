<template>
  <button
    :class="{
      'type-accent': type === 'accent',
      'type-regular': type === 'regular',
      'type-outline': type === 'outline',
      'size-small': size === 'small',
      'size-regular': size === 'regular',
      'size-large': size === 'large',
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Type = 'accent' | 'regular' | 'outline';
type Size = 'small' | 'regular' | 'large';

withDefaults(
  defineProps<{
    type: Type;
    size?: Size;
  }>(),
  {
    size: 'regular',
  },
);
</script>

<style scoped>
button {
  margin: 0;
  transition: all 0.25s ease-in-out;
  border: none;
  cursor: pointer;
}

button.type-accent {
  border-radius: var(--border-radius-large);
  background: var(--color-accent);
  box-shadow: var(--shadow-medium);
  color: white;
}

button.type-regular {
  border-radius: var(--border-radius-big);
  background: var(--color-bg-tertiary);
}

button.type-outline {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-big);
  background: transparent;
  font-size: var(--font-size-normal);
}

button.size-small {
  padding: 6px 8px;
  font-size: var(--font-size-tiny);
}

button.size-regular {
  padding: 8px 14px;
  font-size: var(--font-size-normal);
}

button.size-large {
  padding: 10px 20px;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

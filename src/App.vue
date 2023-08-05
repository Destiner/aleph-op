<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { computed, onMounted } from 'vue';

import config from '@/config';

const styleProperties = computed<Record<string, string>>(() => {
  return {
    '--color-accent-hsl': config.styling.accent,
    '--color-accent': 'hsl(var(--color-accent-hsl))',
    '--color-bg-inverted-hsl': config.styling.background.inverted,
    '--color-bg-inverted': 'hsl(var(--color-bg-inverted-hsl))',
    '--color-text-inverted-hsl': config.styling.text.inverted,
    '--color-text-inverted': 'hsl(var(--color-text-inverted-hsl))',
  };
});

onMounted(() => {
  Object.entries(styleProperties.value).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
});
</script>

<style>
:root {
  --color-bg-primary: hsl(0deg 0% 100%);
  --color-bg-secondary: hsl(0deg 0% 98%);
  --color-bg-tertiary: hsl(0deg 0% 92%);
  --color-text-primary: hsl(0deg 0% 5%);
  --color-text-secondary-hsl: 240deg 5% 34%;
  --color-text-secondary: hsl(var(--color-text-secondary-hsl));
  --color-border-primary: hsl(0deg 0% 80%);
  --color-border-secondary: hsla(0deg 0% 80% / 60%);
  --color-error: hsl(3deg 100% 64%);
  --shadow-small: hsla(0deg 0% 0% 10%) 0 1px 1px 0;
  --shadow-small-inset: hsla(0deg 0% 0% 5%) 0 1px 1px 0 inset;
  --shadow-medium: hsla(0deg 0% 0% 20%) 0 2px 4px 0;
  --shadow-medium-inset: hsla(0deg 0% 0% 10%) 0 2px 2px 0 inset;
  --spacing-tiny: 2px;
  --spacing-small: 4px;
  --spacing-normal: 8px;
  --spacing-big: 16px;
  --spacing-large: 32px;
  --border-radius-small: 2px;
  --border-radius-medium: 4px;
  --border-radius-big: 8px;
  --border-radius-large: 12px;
  --font-size-tiny: 11px;
  --font-size-small: 12px;
  --font-size-normal: 14px;
  --font-size-big: 16px;
  --font-size-large: 20px;
  --font-size-extra-large: 36px;
  --font-sans: 'Inter', -apple-system, 'BlinkMacSystemFont', avenir next, avenir,
    segoe ui, helvetica neue, helvetica, 'Ubuntu', roboto, noto, arial,
    sans-serif;
  --font-serif: 'Iowan Old Style', 'Apple Garamond', 'Baskerville',
    'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro', serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono: 'Menlo', 'Consolas', 'Monaco', 'Liberation Mono',
    'Lucida Console', monospace;
}

body {
  margin: 0;
  font-family: var(--font-sans);
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}
</style>

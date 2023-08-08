interface ImportMeta {
  env: {
    VITE_PROVIDER_KEY?: string;
  };
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const component: ComponentOptions;
  export default component;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

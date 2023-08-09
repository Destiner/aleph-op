import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Contracts from './pages/Contracts.vue';
import Cookbook from './pages/Cookbook.vue';
import Docs from './pages/Docs.vue';
import JsonRpc from './pages/JsonRpc.vue';
import Tooling from './pages/Tooling.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', redirect: '/docs' },
    { path: '/docs', component: Docs },
    { path: '/cookbook', component: Cookbook },
    { path: '/json-rpc', component: JsonRpc },
    { path: '/contracts', component: Contracts },
    { path: '/tooling', component: Tooling },
  ],
});

const pinia = createPinia();
const head = createHead();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(head);

app.mount('#app');

export { routerHistory, router };

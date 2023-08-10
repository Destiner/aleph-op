import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Bridge from './pages/Bridge.vue';
import Contracts from './pages/Contracts.vue';
import Cookbook from './pages/Cookbook.vue';
import Docs from './pages/Docs.vue';
import Ecosystem from './pages/Ecosystem.vue';
import Faucet from './pages/Faucet.vue';
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
    { path: '/bridge', component: Bridge },
    { path: '/faucet', component: Faucet },
    { path: '/ecosystem', component: Ecosystem },
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

import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Docs from './pages/Docs.vue';
import Guides from './pages/Guides.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', redirect: '/docs' },
    { path: '/docs', component: Docs },
    { path: '/guides', component: Guides },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };

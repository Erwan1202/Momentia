import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Research from '../views/Research.vue';

const routes = [
  { path: '/', name: 'home', component: Home },

  {path: '/research', name: 'research', component: Research}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

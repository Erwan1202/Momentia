import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../views/Posts.vue';
import Home from '../views/Home.vue';

const routes = [
  { path: '/posts', name: 'posts' , component: Posts },

  { path: '/', name: 'home', component: Home },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

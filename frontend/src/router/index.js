import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Research from '../views/Research.vue';
import Profil from '../views/Profil.vue';
import NewPost from '../views/NewPost.vue';

const routes = [
  { path: '/', name: 'home', component: Home },

  {path: '/research', name: 'research', component: Research},

  {path: '/profil/:id', name: 'profil', component: Profil},

  {path: '/newpost', name: 'newpost', component: NewPost}


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

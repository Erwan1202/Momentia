import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Research from '../views/Research.vue';
import Profil from '../views/Profil.vue';
import LoginForm from '../views/LoginForm.vue';
import RegisterForm from '../views/RegisterForm.vue';



const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/research', name: 'research', component: Research},
  { path: '/profil/:id', name: 'profil', component: Profil},
  { path: '/login', name: 'login', component: LoginForm},
  { path: '/register', name: 'register', component: RegisterForm},


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

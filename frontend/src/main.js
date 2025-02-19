import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);
app.config.globalProperties.$axios = axios; // ✅ Ajout global d'Axios
app.use(router);
app.mount('#app');

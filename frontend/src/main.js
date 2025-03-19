import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';


const app = createApp(App);
app.use(router); // ✅ Assure-toi qu'il est appelé une seule fois
app.config.globalProperties.$axios = axios;
app.mount('#app'); // ✅ Vérifie qu'il est bien unique ici

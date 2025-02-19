<template>
  <div>
    <router-view />
    <button @click="handleClick">Click Me</button>
    <h1>{{ message }}</h1>
    <button @click="goToHomeView">Go to HomeView</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // ✅ Ajout pour Vue Router

export default {
  setup() {
    const message = ref("Chargement...");
    const router = useRouter(); // ✅ Utilisation de useRouter()

    // Charger le message depuis l'API
    const fetchMessage = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        message.value = response.data;
      } catch (error) {
        message.value = "Erreur de connexion au serveur";
        console.error("Erreur API :", error);
      }
    };

    // Naviguer vers HomeView
    const goToHomeView = () => {
      router.push('/'); // ✅ Correct
    };

    onMounted(fetchMessage);

    return {
      message,
      goToHomeView
    };
  }
};
</script>

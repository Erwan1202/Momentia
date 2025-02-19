<template>
  <div>
    <router-view />
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

    // Naviguer vers Posts
    const goToHomeView = () => {
      console.log("🔄 Navigation vers Posts..."); // ✅ Ajout pour débogage
      router.push({ name: 'posts' });    };

    // Fonction pour le bouton "Click Me"
    const handleClick = () => {
      console.log("🔘 Bouton Click Me cliqué !");
    };

    onMounted(fetchMessage);

    return {
      message,
      goToHomeView,
      handleClick // ✅ Ajout pour éviter une erreur
    };
  }
};
</script>

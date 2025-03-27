<template>
<div class="max-w-2xl ml-96 mr-auto">
  <h1 class="text-3xl font-bold text-center mb-8">📸 Fil d'actualité</h1>
    
    <ul class="space-y-4">
      <li 
        v-for="post in posts" 
        :key="post.id"
        class="bg-white shadow rounded-xl p-4"
      >
        <router-link :to="{ name: 'home', params: { id: post.id } }">
          <h3 class="text-xl font-semibold text-blue-500">{{ post.caption }}</h3>
        </router-link>
        <img 
          v-if="post.image_url"
          :src="post.image_url" 
          alt="Post Image"
          class="rounded-lg w-full my-4 object-cover max-h-[300px]"
        />
        <p><strong>📍 Localisation :</strong> {{ post.location || "Non précisée" }}</p>
        <p><strong>🕒 Publié le :</strong> {{ formatDate(post.created_at) }}</p>
      </li>
    </ul>

    <button 
      @click="goToHomeView"
      class="mt-8 mx-auto block bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-lg"
    >
      🏠 Retour à l'accueil
    </button>
  </div>
  <aside class="w-64 bg-gray-200 hidden lg:block">
      <Amis class="w-1/6"/>
  </aside>
</template>

<script>
import axios from 'axios';
import Amis from '../components/common/Amis.vue';

export default {
  components: { Amis },
  data() {
    return { posts: [] };
  },
  mounted() {
    this.fetchPosts();
  },
  mounted() {
  console.log("🏁 Composant monté !");
  this.fetchPosts();
},
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);

        console.log(response.data); // Ajoutez ce log pour vérifier les données
        this.posts = response.data;
      } catch (error) {
        console.error("Erreur chargement posts :", error);
      }
    },
    formatDate(dateString) {
      const options = { 
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit" 
      };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    },
    goToHomeView() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

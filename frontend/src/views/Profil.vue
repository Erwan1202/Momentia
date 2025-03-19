<template>
    <div class="container mx-auto p-6">
      <!-- Informations du profil -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          v-if="user.profile_picture"
          :src="user.profile_picture"
          alt="Profile Picture"
          class="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
        />
        <h1 class="text-2xl font-bold mt-4">{{ user.username }}</h1>
        <p class="text-gray-600">{{ user.bio || "Aucune biographie disponible." }}</p>
        <p class="text-gray-500 text-sm">Membre depuis : {{ formatDate(user.created_at) }}</p>
      </div>
  
      <!-- Mosaïque des posts -->
      <h2 class="text-xl font-bold mt-6 mb-4">🖼️ Posts de {{ user.username }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="post in posts"
          :key="post.id"
          class="relative bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            v-if="post.image_url"
            :src="post.image_url"
            alt="Post Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ post.caption }}</h3>
            <p class="text-gray-500 text-sm">{{ formatDate(post.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  export default {
    data() {
      return {
        user: {},
        posts: []
      };
    },
    async mounted() {
      const route = useRoute();
      const userId = route.params.id;
  
      try {
        // Récupérer les informations de l'utilisateur
        const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
        this.user = userResponse.data;
  
        // Récupérer les posts de l'utilisateur
        const postsResponse = await axios.get(`http://localhost:3000/api/posts?user_id=${userId}`);
        this.posts = postsResponse.data;
      } catch (error) {
        console.error("Erreur de chargement du profil :", error);
      }
    },
    methods: {
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  </style>
  
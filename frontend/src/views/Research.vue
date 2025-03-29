<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold text-center mb-6">🔍 Recherche d'utilisateurs</h1>
  
      <input 
        v-model="searchQuery"
        placeholder="Rechercher un utilisateur..."
        class="w-full p-2 border rounded-lg mb-4"
      />
  
      <ul v-if="filteredUsers.length" class="space-y-2">
        <li 
          v-for="user in filteredUsers" 
          :key="user.id"
          class="p-4 border rounded-lg shadow bg-white hover:bg-gray-100 transition"
        >
          <!-- ✅ Ajout du lien vers Profil.vue -->
          <router-link :to="`/profil/${user.id}`" class="flex items-center space-x-3">
            <img v-if="user.avatar_url" :src="user.avatar_url" class="w-10 h-10 rounded-full" alt="Avatar">
            <span class="text-lg font-semibold text-blue-600 hover:underline">{{ user.username }}</span>
          </router-link>
        </li>
      </ul>
  
      <p v-else class="text-gray-500 text-center">Aucun utilisateur trouvé.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        searchQuery: "",
        users: []
      };
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user =>
          user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async mounted() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        console.log("👀 Données utilisateurs :", response.data); 
        this.users = response.data;
      } catch (error) {
        console.error("Erreur de chargement des utilisateurs :", error);
      }
    }
  };
  </script>
  
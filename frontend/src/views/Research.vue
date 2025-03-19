<template>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-6">🔍 Recherche d'utilisateurs</h1>
      
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Rechercher un utilisateur..."
        class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      
      <ul v-if="filteredUsers.length" class="mt-6 space-y-3">
        <li 
          v-for="user in filteredUsers" 
          :key="user.id" 
          class="p-4 border rounded-lg shadow bg-white"
        >
          {{ user.username }}
        </li>
      </ul>
      <p v-else class="text-center text-gray-500 mt-4">Aucun utilisateur trouvé.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
        const response = await axios.get("http://localhost:3000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erreur de chargement des utilisateurs", error);
      }
    }
  };
  </script>
  
  <style scoped>
  input {
    transition: all 0.2s ease-in-out;
  }
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  </style>
  
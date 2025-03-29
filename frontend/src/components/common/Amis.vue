<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-center mb-4">Liste des utilisateurs</h2>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id" class="border p-4 mb-2 rounded bg-gray-100">
        {{ user.username }}
      </li>
    </ul>
    <p v-else class="text-center text-gray-500">Aucun utilisateur trouvé.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);

      this.users = response.data;
    } catch (error) {
      console.error("Erreur de chargement des utilisateurs", error);
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>

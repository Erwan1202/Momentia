<template>
    <div>
      <h1>📸 Fil d'actualité</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="{ name: 'post', params: { id: post.id } }">
            <h3>{{ post.caption }}</h3>
          </router-link>
          <img :src="post.image_url" alt="Post Image" width="300" />
          <p><strong>📍 Localisation :</strong> {{ post.location || "Non précisée" }}</p>
          <p><strong>🕒 Publié le :</strong> {{ formatDate(post.created_at) }}</p>
          <hr />
        </li>
      </ul>
      <button @click="goToHomeView">🏠 Retour à l'accueil</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // ✅ Importation d'Axios
  
  export default {
    data() {
      return { posts: [] };
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      // ✅ Récupérer les posts depuis l'API
      async fetchPosts() {
        try {
          const response = await axios.get("http://localhost:3000/api/posts");
          this.posts = response.data;
        } catch (error) {
          console.error("❌ Erreur de chargement des posts :", error);
        }
      },
      
      // ✅ Formater la date au format lisible
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
      },
  
      // ✅ Redirection vers la page d'accueil
      goToHomeView() {
        console.log("🔄 Retour à l'accueil...");
        this.$router.push({ name: 'home' });
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
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
  img {
    display: block;
    margin: 10px 0;
    border-radius: 10px;
  }
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  
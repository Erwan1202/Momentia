<template>
     
    
  
    <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">📤 Créer un nouveau post</h2>
  
      <form @submit.prevent="submitPost" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Légende</label>
          <input v-model="caption" type="text" class="w-full border p-2 rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Localisation</label>
          <input v-model="location" type="text" class="w-full border p-2 rounded" />
        </div>
  
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Image</label>
          <input type="file" @change="handleFileChange" accept="image/*" class="w-full" required />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
          Publier
        </button>
      </form>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        caption: '',
        location: '',
        image: null,
        user_id: 1, // temporairement un utilisateur test
      };
    },
    mounted() {
    console.log("✅ NewPost.vue monté");
    },

    methods: {
      handleFileChange(e) {
        this.image = e.target.files[0];
      },
      async submitPost() {
        const formData = new FormData();
        formData.append('caption', this.caption);
        formData.append('location', this.location);
        formData.append('user_id', this.user_id);
        formData.append('image', this.image);
  
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/posts`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );
  
          alert("✅ Post créé !");
          this.$router.push({ name: 'home' });
        } catch (error) {
          console.error('❌ Erreur création post :', error);
          alert("Erreur lors de la publication.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  input[type="file"] {
    padding: 6px 0;
  }
  </style>
  
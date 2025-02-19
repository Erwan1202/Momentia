<script>
import axios from 'axios'; // ✅ Ajout de l'importation d'Axios

export default {
  data() {
    return { posts: [] };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        this.posts = response.data;
      } catch (error) {
        console.error("Erreur de chargement des posts", error);
      }
    },
    goToHomeView() {
      this.$router.push({ name: 'home' }); // ✅ Fonctionne avec Option API
    }
  }
};
</script>

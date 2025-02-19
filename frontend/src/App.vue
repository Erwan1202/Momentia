<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Chargement..."
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/");
      const data = await response.text();
      this.message = data;
    } catch (error) {
      this.message = "Erreur de connexion au serveur";
    }
  }
};
</script>

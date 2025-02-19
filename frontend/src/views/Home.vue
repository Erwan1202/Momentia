<template>
    <div class="home">
      <h1>Welcome to Momentia</h1>
      <p>This is the home page of the Momentia application.</p>
      <button @click="goToPosts">Go to Posts</button> <!-- 🔘 Nouveau bouton -->

    </div>
  </template>
  
  <script>
  import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goToPosts = () => {
      console.log("🔄 Navigation vers Posts...");
      router.push({ name: "posts" }); // ✅ Navigation correcte
    };

    return {
      goToPosts,
    };
  },
};
</script>
  

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}

h1 {
    font-size: 2em;
    color: #333;
}

p {
    font-size: 1.2em;
    color: #666;
}
</style>
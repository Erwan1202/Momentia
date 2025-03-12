<template>
  <div class="home">
    <h1 class="text-4xl font-bold">Welcome to Momentia</h1>
    <p class="text-lg my-4">This is the home page of the Momentia application.</p>
    <button 
      @click="goToPosts"
      class="mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-lg"
    >
      Go to Posts
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const goToPosts = () => router.push({ name: "posts" });
    return { goToPosts };
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>

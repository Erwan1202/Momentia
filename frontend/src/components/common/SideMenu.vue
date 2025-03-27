<template>
  <nav class="fixed top-0 left-0 h-screen w-60 bg-gray-900 text-white flex flex-col justify-between p-4 shadow-lg">
    <div>
      <h1 class="text-2xl font-bold mb-8">🌟 Momentia</h1>
      <ul class="space-y-4">
        <li>
          <router-link to="/" class="flex items-center gap-2 hover:text-blue-400">
            <HomeIcon class="w-5 h-5"/> Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/research" class="flex items-center gap-2 hover:text-blue-400">
            <SearchIcon class="w-5 h-5"/> Recherche
          </router-link>
        </li>
        <li>
          <router-link to="/profil" class="flex items-center gap-2 hover:text-blue-400">
            <UserIcon class="w-5 h-5"/> Profil
          </router-link>
        </li>
        <li>
          <router-link to="/newpost" class="flex items-center gap-2 hover:text-blue-400">
            <PlusSquareIcon class="w-5 h-5"/> Nouveau Post
          </router-link>
        </li>
      </ul>
    </div>
    <div class="text-sm text-gray-400 text-center">
      &copy; 2025 MonApp
    </div>
  </nav>
</template>

<script setup>
</script>

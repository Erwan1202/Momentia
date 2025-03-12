<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- ✅ SideMenu bien positionné à gauche -->
    <SideMenu class="w-64" />

    <!-- ✅ Conteneur principal où les vues s'affichent -->
    <div class="flex-1 p-8">
      <router-view />
    </div>

    <!-- ✅ Espace pour "Amis" (visible sur grand écran) -->
    <div class="w-64 bg-gray-200 p-4 hidden lg:block">
      <h2 class="font-bold text-lg">Amis</h2>
      <p>🔜 Bientôt disponible...</p>
    </div>
  </div>
</template>

<script setup>
import SideMenu from './components/common/SideMenu.vue';
</script>

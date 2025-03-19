<template>
  <div class="flex min-h-screen bg-gray-100 flex-row">
    <!-- Menu à gauche -->
    <SideMenu class="w-1/6" />

    <!-- Contenu principal centré -->
    <main class="flex-1 flex justify-center p-8">
      <router-view />
    </main>
    
  </div>
</template>

<script setup>
import SideMenu from './components/common/SideMenu.vue'
import Amis from './components/common/Amis.vue'
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 flex-row">
    <!-- Menu à gauche -->
    <SideMenu class="w-1/6" />

    <!-- Contenu principal centré -->
    <main class="flex-1 flex justify-center p-8">
      <router-view />
    </main>

    <!-- Espace pour "Amis" à droite -->
    <aside class="w-64 bg-gray-200 hidden lg:block">
      <Amis class="w-1/6"/>
    </aside>
  </div>
</template>

<script setup>
import SideMenu from './components/common/SideMenu.vue'
import Amis from './components/common/Amis.vue'
</script>

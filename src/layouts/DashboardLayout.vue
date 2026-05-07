<script setup lang="ts">
import { ref } from 'vue'
import HeaderView from '@/components/HeaderView.vue'
import SidebarView from '@/components/SidebarView.vue'

const mobileOpen = ref(false)
</script>

<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <SidebarView :mobile-open="mobileOpen" @close="mobileOpen = false" />

    <!-- Right side -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header -->
      <HeaderView @toggle-sidebar="mobileOpen = true" />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

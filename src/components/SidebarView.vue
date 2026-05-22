<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  mobileOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

interface ChildItem {
  name: string
  path: string
}

interface MenuItem {
  title: string
  path?: string
  open?: boolean
  children?: ChildItem[]
}

const sidebarOpen = ref(true)

const menus = ref<MenuItem[]>([
  {
    title: 'Dashboard',
    path: '/',
  },
  // {
  //   title: 'Users',
  //   open: false,
  //   children: [
  //     {
  //       name: 'All Users',
  //       path: '/users',
  //     },
  //     {
  //       name: 'Roles',
  //       path: '/roles',
  //     },
  //   ],
  // },
  {
    title: 'Jobs',
    path: '/jobs',
  },
  {
    title: 'About',
    path: '/about',
  },
])

const toggleMenu = (index: number) => {
  if (menus.value[index]?.children) {
    menus.value[index].open = !menus.value[index].open
  }
}
</script>

<template>
  <!-- Backdrop (mobile only) -->
  <div v-if="mobileOpen" class="fixed inset-0 z-40 bg-black/40 md:hidden" @click="emit('close')" />

  <aside
    :class="[
      'bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50',
      'fixed md:relative top-0 left-0 h-full',
      mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      sidebarOpen ? 'w-64' : 'w-20',
    ]"
  >
    <!-- Header -->
    <div class="flex h-16 items-center justify-between border-b px-4">
      <div v-if="sidebarOpen">
        <h1 class="text-lg font-semibold">Admin Panel</h1>
        <p class="text-xs text-gray-500">Management System</p>
      </div>

      <!-- Desktop toggle -->
      <button
        class="hidden rounded-lg p-2 hover:bg-gray-100 md:block"
        @click="sidebarOpen = !sidebarOpen"
      >
        ☰
      </button>

      <!-- Mobile close -->
      <button class="rounded-lg p-2 hover:bg-gray-100 md:hidden" @click="emit('close')">✕</button>
    </div>

    <!-- Navigation -->
    <nav class="space-y-2 p-3">
      <div v-for="(menu, index) in menus" :key="menu.title">
        <button
          v-if="menu.children"
          @click="toggleMenu(index)"
          class="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-gray-100"
        >
          <span v-if="sidebarOpen">{{ menu.title }}</span>
          <span v-if="sidebarOpen">{{ menu.open ? '−' : '+' }}</span>
        </button>

        <RouterLink
          v-else
          :to="menu.path || '/'"
          class="block rounded-xl px-4 py-3 hover:bg-gray-100"
        >
          <span v-if="sidebarOpen">{{ menu.title }}</span>
        </RouterLink>

        <div v-if="menu.open && menu.children && sidebarOpen" class="ml-4 mt-1 border-l pl-3">
          <RouterLink
            v-for="child in menu.children"
            :key="child.path"
            :to="child.path"
            class="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
          >
            {{ child.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

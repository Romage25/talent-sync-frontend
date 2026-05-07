<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const loggingOut = ref(false)

/* USER MENU */
const userOpen = ref(false)

/* NOTIFICATIONS */
const notifOpen = ref(false)

const notifications = ref([
  { title: 'New user registered', time: '2 mins ago' },
  { title: 'Server backup completed', time: '1 hour ago' },
  { title: 'New message received', time: 'Yesterday' },
])

/* TOGGLES */
const toggleUser = () => {
  userOpen.value = !userOpen.value
  notifOpen.value = false
}

const toggleNotif = () => {
  notifOpen.value = !notifOpen.value
  userOpen.value = false
}

const closeAll = () => {
  userOpen.value = false
  notifOpen.value = false
}

/* CLICK OUTSIDE */
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('#user-menu') && !target.closest('#notif-menu')) {
    closeAll()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const logout = async () => {
  loggingOut.value = true

  try {
    await auth.logout()
    router.push('/login')
  } finally {
    loggingOut.value = false
  }
}
</script>

<template>
  <!-- Logout Loading Overlay -->
  <div
    v-if="loggingOut"
    class="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
  >
    <div class="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-5 shadow-lg">
      <!-- Spinner -->
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"
      ></div>

      <p class="text-sm font-medium text-gray-700">Signing you out...</p>
    </div>
  </div>

  <header
    class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm"
  >
    <!-- Left -->
    <button class="md:hidden rounded-lg p-2 hover:bg-gray-100" @click="$emit('toggle-sidebar')">
      ☰
    </button>

    <div>
      <h1 class="text-lg font-semibold text-gray-800">Dashboard</h1>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-4">
      <!-- Search
        <input
          type="text"
          placeholder="Search..."
          class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-gray-400 outline-none"
        /> -->

      <!-- NOTIFICATIONS -->
      <div class="relative" id="notif-menu">
        <button @click="toggleNotif" class="relative rounded-xl p-2 hover:bg-gray-100 transition">
          🔔

          <!-- badge -->
          <span
            class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white"
          >
            {{ notifications.length }}
          </span>
        </button>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="notifOpen"
            class="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            <div class="border-b px-4 py-3 text-sm font-semibold text-gray-700">Notifications</div>

            <div class="max-h-64 overflow-y-auto">
              <div
                v-for="(n, i) in notifications"
                :key="i"
                class="border-b px-4 py-3 hover:bg-gray-50"
              >
                <p class="text-sm text-gray-700">
                  {{ n.title }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ n.time }}
                </p>
              </div>
            </div>

            <div class="p-2 text-center">
              <button class="text-xs text-blue-600 hover:underline">Mark all as read</button>
            </div>
          </div>
        </transition>
      </div>

      <!-- USER MENU -->
      <div class="relative" id="user-menu">
        <button
          @click="toggleUser"
          class="flex items-center gap-2 rounded-xl p-2 hover:bg-gray-100 transition"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
          >
            R
          </div>

          <span class="hidden text-sm font-medium text-gray-700 md:block"> {{ auth.user?.first_name }} </span>
        </button>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="userOpen"
            class="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            <router-link
              to="/profile"
              class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              @click="closeAll"
            >
              👤 Profile
            </router-link>

            <button
              @click="logout"
              class="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

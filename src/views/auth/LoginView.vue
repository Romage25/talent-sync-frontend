<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { LoginForm } from '@/types/auth'

import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const googleLoading = ref(false)

const isDisabled = computed(() => loading.value || googleLoading.value)

const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const login = async () => {
  if (loading.value || googleLoading.value) return

  loading.value = true

  try {
    await auth.login(form)

    // redirect if no errors
    if (Object.keys(auth.errors).length === 0 && auth.user) {
      router.push('/')
    }
  } finally {
    form.email = ''
    form.password = ''

    loading.value = false
  }
}

const loginWithGoogle = () => {
  if (googleLoading.value || loading.value) return

  googleLoading.value = true

  setTimeout(() => {
    window.location.href = 'http://localhost:8000/auth/google/redirect?mode=login'
  }, 500)
}

onMounted(() => {
  if (route.query.error) {
    auth.errors.general = [String(route.query.error)]
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900"
  >
    <div class="w-full max-w-sm">
      <h2 class="mt-10 text-2xl font-bold text-center text-gray-900 dark:text-white">
        Sign in to your account
      </h2>

      <!-- General error -->
      <div class="text-center mt-2">
        <p v-if="auth.errors.general" class="text-red-500">
          {{ auth.errors.general[0] }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="mt-10 space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Email address
          </label>

          <input
            v-model="form.email"
            type="email"
            class="mt-2 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.email" class="text-red-500">
            {{ auth.errors.email[0] }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Password
          </label>

          <input
            v-model="form.password"
            type="password"
            class="mt-2 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.password" class="text-red-500">
            {{ auth.errors.password[0] }}
          </p>
        </div>

        <button
          :disabled="isDisabled"
          type="submit"
          class="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          {{
            googleLoading ? 'Google authentication...' : auth.loading ? 'Signing in...' : 'Sign In'
          }}
        </button>

        <!-- Divider -->
        <div class="my-6 flex items-center gap-3">
          <div class="h-px flex-1 bg-gray-300 dark:bg-white/10"></div>
          <span class="text-xs text-gray-400">or</span>
          <div class="h-px flex-1 bg-gray-300 dark:bg-white/10"></div>
        </div>

        <!-- Google Button -->
        <button
          type="button"
          @click="loginWithGoogle"
          :disabled="googleLoading"
          class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <!-- Spinner -->
          <svg
            v-if="googleLoading"
            class="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />

            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>

          <!-- Google Icon -->
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.35 11.1H12v2.9h5.35c-.23 1.45-1.74 4.26-5.35 4.26-3.22 0-5.85-2.67-5.85-5.96s2.63-5.96 5.85-5.96c1.83 0 3.06.78 3.76 1.46l2.57-2.48C17.64 4.6 15.04 3.5 12 3.5 6.75 3.5 2.5 7.76 2.5 13s4.25 9.5 9.5 9.5c5.48 0 9.1-3.85 9.1-9.28 0-.62-.07-1.1-.15-1.62z"
            />
          </svg>

          {{ googleLoading ? 'Redirecting to Google...' : 'Continue with Google' }}
        </button>
      </form>

      <div class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?
        <RouterLink
          to="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Create one
        </RouterLink>
      </div>
    </div>
  </div>
</template>

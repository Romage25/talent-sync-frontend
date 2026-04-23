<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { LoginForm } from '@/types/auth'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const login = async () => {
  await auth.login(form)

  // redirect if no errors
  if (Object.keys(auth.errors).length === 0 && auth.user) {
    router.push('/')
  }
}
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
          />

          <p v-if="auth.errors.password" class="text-red-500">
            {{ auth.errors.password[0] }}
          </p>
        </div>

        <button
          :disabled="auth.loading"
          type="submit"
          class="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          {{ auth.loading ? 'Signing in...' : 'Sign In' }}
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

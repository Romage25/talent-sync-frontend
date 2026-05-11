<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { RegisterForm } from '@/types/auth'
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const googleLoading = ref(false)

const isDisabled = computed(() => loading.value || googleLoading.value)

const form = reactive<RegisterForm>({
  first_name: '',
  last_name: '',
  address: '',
  phone_no: '',
  role: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const register = async () => {
  if (loading.value || googleLoading.value) return

  loading.value = true

  try {
    await auth.register(form)

    // redirect if no errors
    if (Object.keys(auth.errors).length === 0 && auth.user) {
      form.first_name = ''
      form.last_name = ''
      form.address = ''
      form.phone_no = ''
      form.role = ''
      form.email = ''
      form.password = ''
      form.password_confirmation = ''

      router.push('/')
    }
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = () => {
  if (googleLoading.value || loading.value) return

  googleLoading.value = true

  setTimeout(() => {
    window.location.href = 'http://localhost:8000/auth/google/redirect?mode=register'
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
    class="min-h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900 transition-colors"
  >
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Fill in your details to register
        </p>
      </div>

      <!-- General error -->
      <div class="text-center mt-2">
        <p v-if="auth.errors.general" class="text-red-500">
          {{ auth.errors.general[0] }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="register" class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- First Name -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> First Name </label>
          <input
            v-model="form.first_name"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.first_name" class="text-red-500">
            {{ auth.errors.first_name[0] }}
          </p>
        </div>

        <!-- Last Name -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Last Name </label>
          <input
            v-model="form.last_name"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.last_name" class="text-red-500">
            {{ auth.errors.last_name[0] }}
          </p>
        </div>

        <!-- Address (full width) -->
        <div class="md:col-span-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Address </label>
          <input
            v-model="form.address"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.address" class="text-red-500">
            {{ auth.errors.address[0] }}
          </p>
        </div>

        <!-- Phone -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Phone Number </label>
          <input
            v-model="form.phone_no"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.phone_no" class="text-red-500">
            {{ auth.errors.phone_no[0] }}
          </p>
        </div>

        <!-- Role -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Role </label>
          <select
            v-model="form.role"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          >
            <option value="">--Select--</option>
            <option value="applicant">Applicant</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <p v-if="auth.errors.role" class="text-red-500">
            {{ auth.errors.role[0] }}
          </p>
        </div>

        <!-- Email (full width) -->
        <div class="md:col-span-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Email </label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.email" class="text-red-500">
            {{ auth.errors.email[0] }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Password </label>
          <input
            v-model="form.password"
            type="password"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="auth.errors.password" class="text-red-500">
            {{ auth.errors.password[0] }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200">
            Confirm Password
          </label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />
        </div>

        <!-- Button full width -->
        <div class="md:col-span-2">
          <button
            :disabled="isDisabled"
            type="submit"
            class="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            {{
              googleLoading
                ? 'Google authentication...'
                : auth.loading
                  ? 'Creating account...'
                  : 'Create account'
            }}
          </button>
        </div>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?
        <router-link
          to="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign in
        </router-link>
      </div>

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
        class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.35 11.1H12v2.9h5.35c-.23 1.45-1.74 4.26-5.35 4.26-3.22 0-5.85-2.67-5.85-5.96s2.63-5.96 5.85-5.96c1.83 0 3.06.78 3.76 1.46l2.57-2.48C17.64 4.6 15.04 3.5 12 3.5 6.75 3.5 2.5 7.76 2.5 13s4.25 9.5 9.5 9.5c5.48 0 9.1-3.85 9.1-9.28 0-.62-.07-1.1-.15-1.62z"
          />
        </svg>

        Regsiter with Google
      </button>
    </div>
  </div>
</template>

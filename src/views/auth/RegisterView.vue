<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { RegisterForm } from '@/types/auth'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

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
  await auth.register(form)

  // redirect if no errors
  if (Object.keys(auth.errors).length === 0 && auth.user) {
    router.push('/')
  }
}
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
          />
        </div>

        <!-- Button full width -->
        <div class="md:col-span-2">
          <button
            :disabled="auth.loading"
            type="submit"
            class="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
          >
            {{ auth.loading ? 'Creating account...' : 'Create account' }}
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
    </div>
  </div>
</template>

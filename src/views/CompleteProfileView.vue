<script setup lang="ts">
import api from '@/service/api'
import type { RegisterForm } from '@/types/auth'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)

const errors = reactive<Record<string, string[]>>({})

const isDisabled = computed(() => loading.value)

const form = reactive<
  Pick<RegisterForm, 'first_name' | 'last_name' | 'address' | 'phone_no' | 'role'>
>({
  first_name: '',
  last_name: '',
  address: '',
  phone_no: '',
  role: '',
})

const completeProfile = async () => {
  if (loading.value) return

  loading.value = true

  // clear errors
  Object.keys(errors).forEach((key) => delete errors[key])

  try {
    await api.put('/complete-profile', form)

    // refresh user from backend
    await auth.fetchUser();

    router.push('/')
  } catch (error: any) {
    if (error.response?.status === 422) {
      Object.assign(errors, error.response.data.errors)
    }
  } finally {
    loading.value = false
  }
}

watch(
  () => auth.user,
  (user) => {
    if (!user) return

    form.first_name = user.first_name || ''
    form.last_name = user.last_name || ''
    form.address = user.address || ''
    form.phone_no = user.phone_no || ''
    form.role = user.role || ''
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900 transition-colors"
  >
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Complete your profile</h2>

        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please complete your account information to continue
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="completeProfile" class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- First Name -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> First Name </label>

          <input
            v-model="form.first_name"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="errors.first_name" class="text-red-500">
            {{ errors.first_name[0] }}
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

          <p v-if="errors.last_name" class="text-red-500">
            {{ errors.last_name[0] }}
          </p>
        </div>

        <!-- Address -->
        <div class="md:col-span-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-200"> Address </label>

          <input
            v-model="form.address"
            type="text"
            class="mt-1 w-full rounded-md px-3 py-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10"
            :disabled="isDisabled"
          />

          <p v-if="errors.address" class="text-red-500">
            {{ errors.address[0] }}
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

          <p v-if="errors.phone_no" class="text-red-500">
            {{ errors.phone_no[0] }}
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

          <p v-if="errors.role" class="text-red-500">
            {{ errors.role[0] }}
          </p>
        </div>

        <!-- Submit -->
        <div class="md:col-span-2">
          <button
            :disabled="isDisabled"
            type="submit"
            class="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : 'Update Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{ show: boolean }>()

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  description: '',
  location: '',
  job_type: 'Full Time',
  salary_min: null as number | null,
  salary_max: null as number | null,
})

const submitForm = () => {
  emit('submit', { ...form })
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <!-- Modal -->
    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 border-b flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Create Job</h2>
          <p class="text-sm text-gray-500">Fill in the job details below</p>
        </div>

        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>

      <!-- Form -->
      <div class="p-6 space-y-5">
        <!-- Job Title -->
        <div>
          <label class="text-sm font-medium text-gray-700">Job Title</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. Laravel Developer"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Describe the role, responsibilities, etc."
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          ></textarea>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Location -->
          <div>
            <label class="text-sm font-medium text-gray-700">Location</label>
            <input
              v-model="form.location"
              type="text"
              placeholder="Manila / Remote"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <!-- Job Type -->
          <div>
            <label class="text-sm font-medium text-gray-700">Job Type</label>
            <select
              v-model="form.job_type"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        <!-- Salary -->
        <div>
          <label class="text-sm font-medium text-gray-700">Salary Range (PHP)</label>

          <div class="grid grid-cols-2 gap-4 mt-1">
            <input
              v-model.number="form.salary_min"
              type="number"
              placeholder="Min"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              v-model.number="form.salary_max"
              type="number"
              placeholder="Max"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
        <button
          @click="emit('close')"
          class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          @click="submitForm"
          class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        >
          Create Job
        </button>
      </div>
    </div>
  </div>
</template>

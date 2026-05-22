<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const jobId = Number(route.params.id)

// Dummy data (replace with API later)
const jobs = [
  {
    id: 1,
    title: 'Laravel Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    job_type: 'Full Time',
    salary_min: 30000,
    salary_max: 60000,
  },
  {
    id: 2,
    title: 'Vue.js Frontend Developer',
    company: 'Startup PH',
    location: 'Makati',
    job_type: 'Contract',
    salary_min: 25000,
    salary_max: 45000,
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Digital Agency Co.',
    location: 'Cebu',
    job_type: 'Full Time',
    salary_min: 50000,
    salary_max: 90000,
  },
]

const job = computed(() => jobs.find((j) => j.id === jobId))

const goBack = () => {
  router.push('/jobs')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Back Button -->
    <button @click="goBack" class="mb-6 text-sm text-blue-600 hover:underline">
      ← Back to Jobs
    </button>

    <!-- If job not found -->
    <div v-if="!job" class="text-center text-gray-500">Job not found.</div>

    <!-- Job Content -->
    <div v-else class="space-y-6">
      <!-- Header -->
      <div class="border rounded-xl p-6 bg-white shadow-sm">
        <h1 class="text-2xl font-bold text-gray-900">
          {{ job.title }}
        </h1>

        <p class="text-gray-600 mt-1">{{ job.company }} • {{ job.location }}</p>

        <div class="mt-3 flex gap-2">
          <span class="px-3 py-1 text-xs bg-gray-100 rounded-full">
            {{ job.job_type }}
          </span>

          <span class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            ₱{{ job.salary_min.toLocaleString() }} - ₱{{ job.salary_max.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div class="border rounded-xl p-6 bg-white">
        <h2 class="text-lg font-semibold mb-2">Job Description</h2>
        <p class="text-gray-600 leading-relaxed">
          {{ job.description }}
        </p>
      </div>

      <!-- Requirements -->
      <div class="border rounded-xl p-6 bg-white">
        <h2 class="text-lg font-semibold mb-3">Requirements</h2>

        <ul class="list-disc pl-5 space-y-1 text-gray-600">
          <li v-for="(req, index) in job.requirements" :key="index">
            {{ req }}
          </li>
        </ul>
      </div>

      <!-- Apply Button -->
      <div class="flex justify-end">
        <button
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
</template>

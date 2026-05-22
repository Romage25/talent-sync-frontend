<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JobCreateModal from '@/views/components/jobs/JobCreateModal.vue'

const router = useRouter()

const dummyJobs = [
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

const showCreateModal = ref(false)

const openModal = () => {
  showCreateModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
}

const handleSubmit = (data: any) => {
  console.log('New Job:', data)

  // later: axios.post("/api/jobs", data)
}

const goToDetails = (id: number) => {
  router.push(`/jobs/${id}`)
}
</script>

<template>
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Jobs</h1>
      <p class="text-sm text-gray-500">Browse available job postings</p>
    </div>

    <button
      @click="openModal"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
    >
      Create Job
    </button>
  </div>

  <!-- Job List -->
  <div class="grid gap-4">
    <div
      v-for="job in dummyJobs"
      :key="job.id"
      @click="goToDetails(job.id)"
      class="p-5 border rounded-xl hover:shadow-md hover:border-blue-300 cursor-pointer transition bg-white"
    >
      <!-- Top Row -->
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">
            {{ job.title }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ job.company }}
          </p>
        </div>

        <span class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          {{ job.job_type }}
        </span>
      </div>

      <!-- Bottom Row -->
      <div class="mt-3 flex justify-between text-sm text-gray-600">
        <span>📍 {{ job.location }}</span>
        <span>
          ₱{{ job.salary_min.toLocaleString() }} - ₱{{ job.salary_max.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>

  <JobCreateModal :show="showCreateModal" @close="closeModal" @submit="handleSubmit" />
</template>

import './assets/main.css'
import '@tailwindplus/elements'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())

async function init() {
  const auth = useAuthStore()

  const token = localStorage.getItem('token')

  if (token) {
    auth.token = token
    await auth.fetchUser()
  }

  app.use(router)

  app.mount('#app') // Mount AFTER fetch
}

init()

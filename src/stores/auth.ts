import api from '@/service/api'
import type { LaravelValidationErrors, LoginForm, RegisterForm } from '@/types/auth'
import type { User } from '@/types/user'
import { handleLaravelError } from '@/utils/handleLaravelErrors'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    errors: {} as LaravelValidationErrors,
  }),

  actions: {
    async login(form: LoginForm) {
      this.loading = true
      this.errors = {}

      try {
        const res = await api.post('/login', form)

        // adjust depending on your backend response
        this.user = res.data.user
        this.token = res.data.token

        // persist token
        localStorage.setItem('token', this.token ?? '')
      } catch (err) {
        this.errors = handleLaravelError(err)
      } finally {
        this.loading = false
      }
    },

    async register(form: RegisterForm) {
      this.loading = true
      this.errors = {}

      try {
        const res = await api.post('/register', form)

        // adjust depending on your backend response
        this.user = res.data.user
        this.token = res.data.token

        // persist token
        localStorage.setItem('token', this.token ?? '')
      } catch (err) {
        this.errors = handleLaravelError(err)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (err) {
        console.log('Logout API error (ignored)', err)
      }

      // always clear frontend state
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})

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

        const { user, token } = res.data.data

        // adjust depending on your backend response
        this.user = user
        this.token = token

        // persist token
        localStorage.setItem('token', token)
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

        const { user, token } = res.data.data

        // adjust depending on your backend response
        this.user = user
        this.token = token

        // persist token
        localStorage.setItem('token', token)
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

    async fetchUser() {
      try {
        const res = await api.get('/user')

        this.user = res.data.user
      } catch (err: any) {
        const status = err?.response?.status

        if (status === 401) {
          this.user = null
          this.token = null
          localStorage.removeItem('token')
        }

        console.error(err)
      }
    },
  },
})

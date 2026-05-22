import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
        requiresProfile: true,
      },
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'jobs',
          component: () => import('@/views/JobView.vue'),
        },
        {
          path: "/jobs/:id",
          component: () => import('@/views/JobShow.vue'),
          props: true,
        },
        {
          path: 'about',
          component: () => import('@/views/AboutView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: AuthLayout,
      meta: {
        guestOnly: true,
      },
      children: [
        {
          path: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/auth/google/callback',
      component: () => import('@/views/auth/GoogleCallback.vue'),
    },
    {
      path: '/complete-profile',
      component: () => import('@/views/CompleteProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const token = localStorage.getItem('token')
  const auth = useAuthStore()

  if (token && !auth.user) {
    await auth.fetchUser()
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  const requiresProfile = to.matched.some((record) => record.meta.requiresProfile)

  // Protected routes
  if (requiresAuth && !token) {
    return '/login'
  }

  // Prevent logged-in users from accessing guest pages
  if (guestOnly && token) {
    return '/'
  }

  // Profile completeness check
  const isProfileComplete = Boolean(
    auth.user?.first_name && auth.user?.last_name && auth.user?.address && auth.user?.phone_no,
  )

  // Incomplete users
  if (requiresProfile && !isProfileComplete && to.path !== '/complete-profile' && token) {
    return '/complete-profile'
  }

  // Completed users
  if (to.path === '/complete-profile' && isProfileComplete && token) {
    return '/'
  }

  return true
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
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
      children: [
        {
          path: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
        {
          path: '/auth/google/callback',
          component: () => import('@/views/auth/GoogleCallback.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  // Protected routes
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  // Prevent logged-in users from accessing login/register
  if (to.meta.guestOnly && token) {
    return '/'
  }

  return true
})

export default router

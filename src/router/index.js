import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/quiz',
        name: 'quiz',
        component: () => import('../views/QuizView.vue')
      }
    ]})
    
export default router
import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from './components/DocsShell.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/components/:slug',
      alias: '/:slug',
      component: DocsShell,
    },
  ],
})

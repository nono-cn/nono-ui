import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from './components/DocsShell.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from) {
    if (to.path === from.path) return false
    return { top: 0, left: 0 }
  },
  routes: [
    { path: '/', redirect: '/components/accordion' },
    { path: '/components', redirect: '/components/accordion' },
    {
      path: '/components/:slug',
      alias: '/:slug',
      component: DocsShell,
    },
  ],
})

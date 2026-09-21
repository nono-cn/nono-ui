import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from './components/DocsShell.vue'
import PopoverPlaygroundPage from './components/PopoverPlaygroundPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/playground', component: PopoverPlaygroundPage },
    {
      path: '/components/:slug',
      alias: '/:slug',
      component: DocsShell,
    },
  ],
})

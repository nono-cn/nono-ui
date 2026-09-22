import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from './components/DocsShell.vue'
import PlaygroundPage from './components/PlaygroundPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/components/accordion' },
    { path: '/components', redirect: '/components/accordion' },
    { path: '/playground', component: PlaygroundPage },
    {
      path: '/components/:slug',
      alias: '/:slug',
      component: DocsShell,
    },
  ],
})

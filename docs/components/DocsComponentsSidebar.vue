<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { docsComponents } from '../config/docs-components'

const route = useRoute()
</script>

<template>
  <aside class="docs-sidebar">
    <div class="docs-sidebar-inner">
      <p>Componentes</p>
      <nav>
        <RouterLink
          v-for="component in docsComponents"
          :key="component.slug"
          :to="`/components/${component.slug}`"
          :class="{
            'bg-accent text-foreground': route.params.slug === component.slug,
          }"
        >
          {{ component.title }}
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>

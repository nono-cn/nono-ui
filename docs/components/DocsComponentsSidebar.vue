<script setup lang="ts">
import { docsComponents } from '../config/docs-components'
</script>

<template>
  <aside class="docs-sidebar">
    <div class="docs-sidebar-inner">
      <p>Components</p>
      <nav>
        <a
          v-for="component in docsComponents"
          :key="component.slug"
          :href="`/components/${component.slug}`"
        >
          {{ component.title }}
        </a>
      </nav>
    </div>
  </aside>
</template>

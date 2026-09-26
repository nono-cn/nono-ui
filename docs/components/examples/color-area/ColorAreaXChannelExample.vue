<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const channels = ['hue', 'saturation', 'lightness', 'alpha'] as const

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const channels = ['hue', 'saturation', 'lightness', 'alpha'] as const
${scriptEnd}

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <figure v-for="channel in channels" :key="channel" class="grid gap-2">
      <ColorArea color-space="hsl" :x-channel="channel" />
      <figcaption class="text-center text-sm">{{ channel }}</figcaption>
    </figure>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Horizontal channel"
    description="Compare the HSL channels that can change from left to right."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <figure v-for="channel in channels" :key="channel" class="grid gap-2">
        <ColorArea color-space="hsl" :x-channel="channel" />
        <figcaption class="text-center text-sm">{{ channel }}</figcaption>
      </figure>
    </div>
  </ComponentExample>
</template>

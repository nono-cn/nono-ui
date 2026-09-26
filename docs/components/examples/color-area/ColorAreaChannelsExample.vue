<script setup lang="ts">
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const channels = [
  { x: 'hue', y: 'saturation' },
  { x: 'hue', y: 'lightness' },
  { x: 'saturation', y: 'lightness' },
  { x: 'lightness', y: 'saturation' },
] as const

const code = `<script setup lang="ts">
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const channels = [
  { x: 'hue', y: 'saturation' },
  { x: 'hue', y: 'lightness' },
  { x: 'saturation', y: 'lightness' },
  { x: 'lightness', y: 'saturation' },
] as const
${scriptEnd}

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <figure v-for="channel in channels" :key="channel.x + '-' + channel.y" class="grid gap-2">
      <ColorArea
        color-space="hsl"
        :x-channel="channel.x"
        :y-channel="channel.y"
      />
      <figcaption class="text-center text-sm">
        Horizontal: {{ channel.x }} · Vertical: {{ channel.y }}
      </figcaption>
    </figure>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Channels"
    description="Compare HSL channel pairs mapped to the horizontal and vertical axes."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-6 sm:grid-cols-2">
      <figure v-for="channel in channels" :key="channel.x + '-' + channel.y" class="grid gap-2">
        <ColorArea color-space="hsl" :x-channel="channel.x" :y-channel="channel.y" />
        <figcaption class="text-center text-sm">
          Horizontal: {{ channel.x }} · Vertical: {{ channel.y }}
        </figcaption>
      </figure>
    </div>
  </ComponentExample>
</template>

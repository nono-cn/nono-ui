<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ColorArea,
  colorAreaDefaults,
  colorAreaColorSpaces,
  colorAreaChannels,
  type ColorAreaChannel,
  type ColorAreaColorSpace,
} from '@/components/ui/ColorArea'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colorSpace = ref<ColorAreaColorSpace>(colorAreaDefaults.colorSpace)
const xChannel = ref<ColorAreaChannel>(colorAreaDefaults.xChannel)
const yChannel = ref<ColorAreaChannel>(colorAreaDefaults.yChannel)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorArea,
  type ColorAreaChannel,
  type ColorAreaColorSpace,
} from '__DOCS_PACKAGE__/components/ui/ColorArea'

const colorSpace = ref<ColorAreaColorSpace>('${colorSpace.value}')
const xChannel = ref<ColorAreaChannel>('${xChannel.value}')
const yChannel = ref<ColorAreaChannel>('${yChannel.value}')
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-3">
    <ColorArea :color-space="colorSpace" :x-channel="xChannel" :y-channel="yChannel" />
    <p class="text-center text-sm">
      {{ colorSpace.toUpperCase() }} · Horizontal: {{ xChannel }} · Vertical: {{ yChannel }}
    </p>
  </div>
</template>`,
)

function reset() {
  colorSpace.value = colorAreaDefaults.colorSpace
  xChannel.value = colorAreaDefaults.xChannel
  yChannel.value = colorAreaDefaults.yChannel
}
</script>

<template>
  <ComponentExample
    title="Channels"
    description="Choose a color space and the channels controlled by each axis."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="colorSpace"
          label="Color space"
          :options="colorAreaColorSpaces"
        />
        <ExampleSelectControl
          v-model="xChannel"
          label="Horizontal channel"
          :options="colorAreaChannels"
        />
        <ExampleSelectControl
          v-model="yChannel"
          label="Vertical channel"
          :options="colorAreaChannels"
        />
      </div>
    </template>
    <div class="grid justify-items-center gap-3">
      <ColorArea :color-space="colorSpace" :x-channel="xChannel" :y-channel="yChannel" />
      <p class="text-center text-sm">
        {{ colorSpace.toUpperCase() }} · Horizontal: {{ xChannel }} · Vertical: {{ yChannel }}
      </p>
    </div>
  </ComponentExample>
</template>

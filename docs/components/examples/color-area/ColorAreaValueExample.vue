<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea, colorAreaDefaults } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const color = ref(colorAreaDefaults.modelValue)

function reset() {
  color.value = colorAreaDefaults.modelValue
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea, colorAreaDefaults } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const color = ref(colorAreaDefaults.modelValue)
${scriptEnd}

<template>
  <div class="grid gap-3">
    <ColorArea v-model="color" />
    <output class="text-center font-mono text-sm">{{ color }}</output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Model value"
    description="Bind the selected color with v-model."
    :code="code"
    @reset="reset"
  >
    <div class="grid gap-3">
      <ColorArea v-model="color" />
      <output class="text-center font-mono text-sm">{{ color }}</output>
    </div>
  </ComponentExample>
</template>

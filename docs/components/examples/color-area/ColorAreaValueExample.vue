<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea, colorAreaDefaults } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const color = ref(colorAreaDefaults.value)

function reset() {
  color.value = colorAreaDefaults.value
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea, colorAreaDefaults } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const color = ref(colorAreaDefaults.value)
${scriptEnd}

<template>
  <div class="grid gap-3">
    <ColorArea v-model:value="color" />
    <output class="text-center font-mono text-sm">{{ color }}</output>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Value"
    description="Bind the selected color with v-model:value."
    :code="code"
    @reset="reset"
  >
    <div class="grid gap-3">
      <ColorArea v-model:value="color" />
      <output class="text-center font-mono text-sm">{{ color }}</output>
    </div>
  </ComponentExample>
</template>

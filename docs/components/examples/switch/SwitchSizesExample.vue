<script setup lang="ts">
/* eslint-disable no-useless-escape -- The copyable snippet contains escaped SFC tags. */
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const values = ref([true, true, true, true, true])

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const values = ref([true, true, true, true, true])
<\/script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <div
      v-for="(size, index) in sizes"
      :key="size"
      class="flex items-center justify-between gap-4"
    >
      <Label :for="\`switch-size-\${size}\">{{ size }}</Label>
      <Switch
        :id="\`switch-size-\${size}\`"
        v-model:value="values[index]"
        :size="size"
      />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Tamaños"
    description="Compara los cinco tamaños disponibles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-3">
      <div
        v-for="(size, index) in sizes"
        :key="size"
        class="flex items-center justify-between gap-4"
      >
        <Label :for="`switch-size-${size}`">{{ size }}</Label>
        <Switch :id="`switch-size-${size}`" v-model:value="values[index]" :size="size" />
      </div>
    </div>
  </ComponentExample>
</template>

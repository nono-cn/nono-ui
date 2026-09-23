<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes = ['lg', 'xl', '2xl'] as const

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'

const sizes = ['lg', 'xl', '2xl'] as const
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-5">
    <div
      v-for="size in sizes"
      :key="size"
      class="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-4"
    >
      <span class="text-sm">{{ size }}</span>
      <Progress :value="68" :size="size" :aria-label="'Loading progress, size ' + size">
        <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
      </Progress>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Label"
    description="The label font size follows size; use the slot to customize its content."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-5">
      <div
        v-for="size in sizes"
        :key="size"
        class="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-4"
      >
        <span class="text-sm">{{ size }}</span>
        <Progress :value="68" :size="size" :aria-label="'Loading progress, size ' + size">
          <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
        </Progress>
      </div>
    </div>
  </ComponentExample>
</template>

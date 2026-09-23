<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const code = `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
${scriptEnd}

<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <div v-for="size in sizes" :key="size" class="grid gap-2">
      <Label :for="'textarea-' + size">{{ size.toUpperCase() }}</Label>
      <Textarea :id="'textarea-' + size" :size="size" placeholder="Write a message..." />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Compare the five available sizes."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4 sm:grid-cols-2">
      <div v-for="size in sizes" :key="size" class="grid gap-2">
        <Label :for="'textarea-' + size">{{ size.toUpperCase() }}</Label>
        <Textarea :id="'textarea-' + size" :size="size" placeholder="Write a message..." />
      </div>
    </div>
  </ComponentExample>
</template>

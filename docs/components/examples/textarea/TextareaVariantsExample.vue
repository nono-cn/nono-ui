<script setup lang="ts">
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variants = ['outline', 'subtle', 'soft', 'plain', 'none'] as const

const code = `<script setup lang="ts">
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'

const variants = ['outline', 'subtle', 'soft', 'plain', 'none'] as const
${scriptEnd}

<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <div v-for="variant in variants" :key="variant" class="grid gap-2">
      <Label :for="'textarea-' + variant">{{ variant }}</Label>
      <Textarea :id="'textarea-' + variant" :variant="variant" size="sm" />
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Compare the available border and background styles."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full gap-4 sm:grid-cols-2">
      <div v-for="variant in variants" :key="variant" class="grid gap-2">
        <Label :for="'textarea-' + variant">{{ variant }}</Label>
        <Textarea :id="'textarea-' + variant" :variant="variant" size="sm" />
      </div>
    </div>
  </ComponentExample>
</template>

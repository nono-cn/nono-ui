<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref('')

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'
import { Textarea } from '__DOCS_PACKAGE__/components/ui/Textarea'

const value = ref('')
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="feedback">Feedback</Label>
    <Textarea id="feedback" v-model:value="value" placeholder="Share your thoughts..." />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Bind the field value and associate it with a visible label."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-2">
      <Label for="feedback">Feedback</Label>
      <Textarea id="feedback" v-model:value="value" placeholder="Share your thoughts..." />
    </div>
  </ComponentExample>
</template>

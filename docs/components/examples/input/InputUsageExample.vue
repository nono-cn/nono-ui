<script setup lang="ts">
import { ref } from 'vue'
import { Input, inputDefaults } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(inputDefaults.modelValue)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const value = ref('')
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-2">
    <Label for="input-name">Name</Label>
    <Input id="input-name" v-model="value" name="name" autocomplete="name" placeholder="Your name" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Bind a value and give the field a visible label."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-2">
      <Label for="input-name">Name</Label>
      <Input
        id="input-name"
        v-model="value"
        name="name"
        autocomplete="name"
        placeholder="Your name"
      />
    </div>
  </ComponentExample>
</template>

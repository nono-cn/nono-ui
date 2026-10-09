<script setup lang="ts">
import { ref } from 'vue'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from 'reka-ui'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const formKey = ref(0)
const errors = ref<{ [key: string]: string | string[] }>({})
const message = ref('')

function onFormSubmit(values: { [key: string]: unknown }) {
  if (values.username === 'taken') {
    errors.value = { username: 'This username is already taken.' }
    message.value = ''
    return
  }
  errors.value = {}
  message.value = `Created ${String(values.username)}`
}

function reset() {
  formKey.value++
  errors.value = {}
  message.value = ''
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from 'reka-ui'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Form } from '__DOCS_PACKAGE__/components/ui/Form'

const errors = ref<{ [key: string]: string | string[] }>({})
const message = ref('')

function onFormSubmit(values: { [key: string]: unknown }) {
  if (values.username === 'taken') {
    errors.value = { username: 'This username is already taken.' }
    message.value = ''
    return
  }
  errors.value = {}
  message.value = \`Created \${String(values.username)}\`
}
${scriptEnd}

<template>
  <Form class="grid w-full max-w-sm gap-4" :errors="errors" @form-submit="onFormSubmit">
    <FieldRoot name="username" class="grid gap-2">
      <FieldLabel class="text-sm font-medium">Username</FieldLabel>
      <FieldControl as="input" class="h-9 rounded-md border px-3" placeholder="Try taken" />
      <FieldError class="text-sm text-destructive" />
    </FieldRoot>
    <Button type="submit" label="Create account" />
    <p v-if="message" role="status">{{ message }}</p>
  </Form>
</template>`
</script>

<template>
  <ComponentExample
    title="Server errors"
    description="Submit “taken” to display an error associated with the username field."
    :code="code"
    @reset="reset"
  >
    <Form
      :key="formKey"
      class="grid w-full max-w-sm gap-4"
      :errors="errors"
      @form-submit="onFormSubmit"
    >
      <FieldRoot name="username" class="grid gap-2">
        <FieldLabel class="text-sm font-medium">Username</FieldLabel>
        <FieldControl as="input" class="h-9 rounded-md border px-3" placeholder="Try taken" />
        <FieldError class="text-sm text-destructive" />
      </FieldRoot>
      <Button type="submit" label="Create account" />
      <p v-if="message" role="status">{{ message }}</p>
    </Form>
  </ComponentExample>
</template>

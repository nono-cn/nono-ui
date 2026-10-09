<script setup lang="ts">
import { computed, ref } from 'vue'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from 'reka-ui'
import { Button } from '@/components/ui/Button'
import { Form, type FormProps } from '@/components/ui/Form'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialMode = 'onSubmit'
const validationMode = ref<NonNullable<FormProps['validationMode']>>(initialMode)
const formKey = ref(0)
const message = ref('')
const validationModes = ['onSubmit', 'onBlur', 'onChange'] as const

function validateEmail(value: unknown) {
  if (!value) return 'Email is required.'
  return String(value).endsWith('@empresa.com') ? null : 'Use an @empresa.com email address.'
}

function onFormSubmit(values: { [key: string]: unknown }) {
  message.value = `Submitted ${String(values.email)}`
}

function reset() {
  validationMode.value = initialMode
  formKey.value++
  message.value = ''
}

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from 'reka-ui'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Form } from '__DOCS_PACKAGE__/components/ui/Form'

const message = ref('')

function validateEmail(value: unknown) {
  if (!value) return 'Email is required.'
  return String(value).endsWith('@empresa.com') ? null : 'Use an @empresa.com email address.'
}

function onFormSubmit(values: { [key: string]: unknown }) {
  message.value = \`Submitted \${String(values.email)}\`
}
${scriptEnd}

<template>
  <Form
    class="grid w-full max-w-sm gap-4"
    validation-mode="${validationMode.value}"
    @form-submit="onFormSubmit"
  >
    <FieldRoot name="email" required :validate="validateEmail" class="grid gap-2">
      <FieldLabel class="text-sm font-medium">Email</FieldLabel>
      <FieldControl as="input" type="email" class="h-9 rounded-md border px-3" />
      <FieldError class="text-sm text-destructive" />
    </FieldRoot>
    <Button type="submit" label="Send" />
    <p v-if="message" role="status">{{ message }}</p>
  </Form>
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Validation and field values"
    description="Select onChange, then type an address outside @empresa.com or clear the field to see custom validation."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl
        v-model="validationMode"
        label="Validation mode"
        :options="validationModes"
      />
    </template>
    <Form
      :key="formKey"
      class="grid w-full max-w-sm gap-4"
      :validation-mode="validationMode"
      @form-submit="onFormSubmit"
    >
      <FieldRoot name="email" required :validate="validateEmail" class="grid gap-2">
        <FieldLabel class="text-sm font-medium">Email</FieldLabel>
        <FieldControl as="input" type="email" class="h-9 rounded-md border px-3" />
        <FieldError class="text-sm text-destructive" />
      </FieldRoot>
      <Button type="submit" label="Send" />
      <p v-if="message" role="status">{{ message }}</p>
    </Form>
  </ComponentExample>
</template>

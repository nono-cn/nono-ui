<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const formKey = ref(0)
const message = ref('')

function onSubmit(event: SubmitEvent) {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const name = String(new FormData(form).get('name') ?? '')
  message.value = `Saved ${name}`
}

function reset() {
  formKey.value++
  message.value = ''
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Form } from '__DOCS_PACKAGE__/components/ui/Form'
import { Input } from '__DOCS_PACKAGE__/components/ui/Input'
import { Label } from '__DOCS_PACKAGE__/components/ui/Label'

const message = ref('')

function onSubmit(event: SubmitEvent) {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const name = String(new FormData(form).get('name') ?? '')
  message.value = \`Saved \${name}\`
}
${scriptEnd}

<template>
  <Form class="grid w-full max-w-sm gap-4" @submit="onSubmit">
    <div class="grid gap-2">
      <Label for="form-name">Name</Label>
      <Input id="form-name" name="name" placeholder="Your name" />
    </div>
    <Button type="submit" label="Save" />
    <p v-if="message" role="status">{{ message }}</p>
  </Form>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Use existing native controls and read their values in a submit handler."
    :code="code"
    @reset="reset"
  >
    <Form :key="formKey" class="grid w-full max-w-sm gap-4" @submit="onSubmit">
      <div class="grid gap-2">
        <Label for="form-name">Name</Label>
        <Input id="form-name" name="name" placeholder="Your name" />
      </div>
      <Button type="submit" label="Save" />
      <p v-if="message" role="status">{{ message }}</p>
    </Form>
  </ComponentExample>
</template>

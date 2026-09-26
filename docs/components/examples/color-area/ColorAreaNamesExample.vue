<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea } from '@/components/ui/ColorArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const submittedValues = ref('Submit the form to inspect the channel values.')

function handleSubmit(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement
  submittedValues.value = JSON.stringify(Object.fromEntries(new FormData(form)))
}

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { ColorArea } from '__DOCS_PACKAGE__/components/ui/ColorArea'

const submittedValues = ref('Submit the form to inspect the channel values.')

function handleSubmit(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement
  submittedValues.value = JSON.stringify(Object.fromEntries(new FormData(form)))
}
${scriptEnd}

<template>
  <form class="grid justify-items-start gap-4" @submit.prevent="handleSubmit">
    <ColorArea
      color-space="hsl"
      x-channel="hue"
      y-channel="saturation"
      x-name="hue"
      y-name="saturation"
    />
    <button type="submit" class="rounded-md border px-3 py-2 text-sm font-medium">
      Submit color channels
    </button>
    <output class="font-mono text-sm">{{ submittedValues }}</output>
  </form>
</template>`
</script>

<template>
  <ComponentExample
    title="Form field names"
    description="Submit the current horizontal and vertical channel values with their own field names."
    :code="code"
    :show-reset="false"
  >
    <form class="grid justify-items-start gap-4" @submit.prevent="handleSubmit">
      <ColorArea
        color-space="hsl"
        x-channel="hue"
        y-channel="saturation"
        x-name="hue"
        y-name="saturation"
      />
      <button type="submit" class="rounded-md border px-3 py-2 text-sm font-medium">
        Submit color channels
      </button>
      <output class="font-mono text-sm">{{ submittedValues }}</output>
    </form>
  </ComponentExample>
</template>

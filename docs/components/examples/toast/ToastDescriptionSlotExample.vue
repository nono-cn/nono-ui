<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Toast } from '@/components/ui/Toast'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider>
    <button type="button" @click="open = true">Show notification</button>
    <Toast v-model:open="open" label="Saved" description="Your changes have been saved." class="rounded-lg border bg-background p-4 shadow-lg">
      <template #description><span>Your changes have been <strong>saved</strong>.</span></template>
    </Toast>
  </ConfigProvider>
</template>`
</script>

<template>
  <ComponentExample
    title="Description slot"
    description="Use the description slot to replace the description prop with custom content."
    :code="code"
    @reset="open = false"
  >
    <ConfigProvider>
      <button type="button" class="rounded-md border px-3 py-2 text-sm" @click="open = true">
        Show notification
      </button>
      <Toast
        v-model:open="open"
        label="Saved"
        description="Your changes have been saved."
        class="rounded-lg border bg-background p-4 shadow-lg"
      >
        <template #description
          ><span>Your changes have been <strong>saved</strong>.</span></template
        >
      </Toast>
    </ConfigProvider>
  </ComponentExample>
</template>

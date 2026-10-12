<script setup lang="ts">
import { ref } from 'vue'
import { ToastClose } from 'reka-ui'
import { Toast } from '@/components/ui/Toast'
import { ConfigProvider } from '@/components/provider'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'
import { ToastClose } from 'reka-ui'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider>
    <button type="button" @click="open = true">Show notification</button>
    <Toast v-model:open="open" label="Saved" description="Your changes have been saved." class="rounded-lg border bg-background p-4 shadow-lg">
      <ToastClose aria-label="Dismiss notification">Dismiss</ToastClose>
    </Toast>
  </ConfigProvider>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="ConfigProvider supplies the provider; Toast renders an individual notification."
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
        <ToastClose aria-label="Dismiss notification" class="mt-2 text-sm underline"
          >Dismiss</ToastClose
        >
      </Toast>
    </ConfigProvider>
  </ComponentExample>
</template>

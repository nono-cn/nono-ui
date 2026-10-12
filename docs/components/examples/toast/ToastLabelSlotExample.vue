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
    <Toast v-model:open="open" label="Saved" class="rounded-lg border bg-background p-4 shadow-lg">
      <template #label><strong>Saved with custom markup</strong></template>
    </Toast>
  </ConfigProvider>
</template>`
</script>

<template>
  <ComponentExample
    title="Label slot"
    description="Use the label slot to replace the label prop with custom content."
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
        class="rounded-lg border bg-background p-4 shadow-lg"
      >
        <template #label><strong>Saved with custom markup</strong></template>
      </Toast>
    </ConfigProvider>
  </ComponentExample>
</template>

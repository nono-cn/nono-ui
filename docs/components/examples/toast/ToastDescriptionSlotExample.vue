<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider>
    <Button @click="open = true">Show notification</Button>
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
      <Button @click="open = true"> Show notification </Button>
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

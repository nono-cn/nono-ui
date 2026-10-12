<script setup lang="ts">
import { computed, ref } from 'vue'
import { ToastClose } from 'reka-ui'
import { ConfigProvider } from '@/components/provider'
import { Toast, toastDefaults, toastVariantNames, type ToastVariant } from '@/components/ui/Toast'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<ToastVariant>(toastDefaults.variant)
const open = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'
import { ToastClose } from 'reka-ui'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider>
    <button type="button" @click="open = true">Show notification</button>
    <Toast v-model:open="open" variant="${variant.value}" label="Saved" description="Your changes have been saved.">
      <ToastClose aria-label="Dismiss notification">Dismiss</ToastClose>
    </Toast>
  </ConfigProvider>
</template>`,
)

function reset() {
  variant.value = toastDefaults.variant
  open.value = false
}
</script>

<template>
  <ComponentExample
    title="Variant"
    description="Choose how the notification uses its color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="variant" label="Variant" :options="toastVariantNames" />
    </template>
    <ConfigProvider>
      <button type="button" class="rounded-md border px-3 py-2 text-sm" @click="open = true">
        Show notification
      </button>
      <Toast
        v-model:open="open"
        :variant="variant"
        label="Saved"
        description="Your changes have been saved."
      >
        <ToastClose aria-label="Dismiss notification" class="mt-2 text-sm underline"
          >Dismiss</ToastClose
        >
      </Toast>
    </ConfigProvider>
  </ComponentExample>
</template>

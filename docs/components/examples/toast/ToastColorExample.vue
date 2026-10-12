<script setup lang="ts">
import { computed, ref } from 'vue'
import { ToastClose } from 'reka-ui'
import { ConfigProvider } from '@/components/provider'
import { Toast, toastDefaults, toastVariantNames, type ToastVariant } from '@/components/ui/Toast'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(toastDefaults.color)
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const open = ref(false)
const variant = ref<ToastVariant>(toastDefaults.variant)

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
    <Toast v-model:open="open" color="${color.value}" variant="${variant.value}" label="Saved" description="Your changes have been saved.">
      <ToastClose aria-label="Dismiss notification">Dismiss</ToastClose>
    </Toast>
  </ConfigProvider>
</template>`,
)

function reset() {
  selectedColor.value = toastDefaults.color
  customColor.value = '#7c3aed'
  variant.value = toastDefaults.variant
  open.value = false
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleSelectControl v-model="variant" label="Variant" :options="toastVariantNames" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <ConfigProvider>
      <button type="button" class="rounded-md border px-3 py-2 text-sm" @click="open = true">
        Show notification
      </button>
      <Toast
        v-model:open="open"
        :color="color"
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Toast, toastDefaults, toastPositionNames, type ToastPosition } from '@/components/ui/Toast'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const position = ref<ToastPosition>(toastDefaults.position)
const open = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider>
    <button type="button" @click="open = true">Show notification</button>
    <Toast v-model:open="open" position="${position.value}" label="Saved" />
  </ConfigProvider>
</template>`,
)

function reset() {
  position.value = toastDefaults.position
  open.value = false
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Choose where the notification appears."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="position" label="Position" :options="toastPositionNames" />
    </template>
    <ConfigProvider>
      <button type="button" class="rounded-md border px-3 py-2 text-sm" @click="open = true">
        Show notification
      </button>
      <Toast v-model:open="open" :position="position" label="Saved" />
    </ConfigProvider>
  </ComponentExample>
</template>

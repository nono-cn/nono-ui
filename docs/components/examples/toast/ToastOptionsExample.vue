<script setup lang="ts">
import { computed, ref } from 'vue'
import { Toast } from '@/components/ui/Toast'
import { ConfigProvider, toastProviderDefaults } from '@/components/provider'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const disableSwipe = ref<boolean>(toastProviderDefaults.disableSwipe)
const duration = ref<number>(toastProviderDefaults.duration)
const limit = ref<number>(2)
const swipeThreshold = ref<number>(toastProviderDefaults.swipeThreshold)
const swipeDirection = ref<'right' | 'left' | 'down' | 'up'>(toastProviderDefaults.swipeDirection)
const open = ref(false)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from '__DOCS_PACKAGE__/components/ui/Toast'
import { ConfigProvider } from '__DOCS_PACKAGE__/components/provider'

const open = ref(false)
${scriptEnd}

<template>
  <ConfigProvider :toast="{ disableSwipe: ${disableSwipe.value}, duration: ${duration.value}, label: 'Notifications', limit: ${limit.value}, swipeDirection: '${swipeDirection.value}', swipeThreshold: ${swipeThreshold.value} }">
    <button type="button" @click="open = true">Show notification</button>
    <Toast v-model:open="open" label="Saved" class="rounded-lg border bg-background p-4 shadow-lg" />
  </ConfigProvider>
</template>`,
)

function reset() {
  disableSwipe.value = toastProviderDefaults.disableSwipe
  duration.value = toastProviderDefaults.duration
  limit.value = 2
  swipeThreshold.value = toastProviderDefaults.swipeThreshold
  swipeDirection.value = toastProviderDefaults.swipeDirection
  open.value = false
}
</script>

<template>
  <ComponentExample
    title="Provider options"
    description="Configure the shared provider through ConfigProvider."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleCheckboxControl v-model="disableSwipe" label="Disable swipe" />
        <ExampleNumberControl v-model="duration" label="Duration (ms)" :min="0" />
        <ExampleNumberControl v-model="limit" label="Limit" :min="1" />
        <ExampleNumberControl v-model="swipeThreshold" label="Swipe threshold (px)" :min="0" />
        <ExampleSelectControl
          v-model="swipeDirection"
          label="Swipe direction"
          :options="['right', 'left', 'down', 'up']"
        />
      </div>
    </template>
    <ConfigProvider
      :toast="{
        disableSwipe,
        duration,
        label: 'Notifications',
        limit,
        swipeDirection,
        swipeThreshold,
      }"
    >
      <button type="button" class="rounded-md border px-3 py-2 text-sm" @click="open = true">
        Show notification
      </button>
      <Toast
        v-model:open="open"
        label="Saved"
        class="rounded-lg border bg-background p-4 shadow-lg"
      />
    </ConfigProvider>
  </ComponentExample>
</template>

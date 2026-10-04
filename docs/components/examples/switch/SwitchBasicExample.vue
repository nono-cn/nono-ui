<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const value = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '__DOCS_PACKAGE__/components/ui/Switch'

const value = ref(${value.value})
${scriptEnd}

<template>
  <label class="flex items-center gap-3">
    <Switch v-model="value" />
    <span>Notifications: {{ value ? 'on' : 'off' }}</span>
  </label>
</template>`,
)

function reset() {
  value.value = false
}
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Toggle a boolean value."
    :code="code"
    @reset="reset"
  >
    <label class="flex items-center gap-3">
      <Switch v-model="value" />
      <span>Notifications: {{ value ? 'on' : 'off' }}</span>
    </label>
  </ComponentExample>
</template>

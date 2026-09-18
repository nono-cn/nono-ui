<script setup lang="ts">
import { computed, ref } from 'vue'
import { Switch, type SwitchSeverity } from '@/components/ui/Switch'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: SwitchSeverity = 'primary'
const severity = ref<SwitchSeverity>(initialSeverity)
const severities: SwitchSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@nono-cn/nono-ui/components/ui/Switch'

const severity = ref('${severity.value}')
${scriptEnd}

<template>
  <Switch :severity="severity" aria-label="Severity" />
</template>`,
)
function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Elige el color semántico del estado activado."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <select v-model="severity" class="h-9 rounded-md border bg-background px-3 text-sm">
        <option v-for="item in severities" :key="item" :value="item">{{ item }}</option>
      </select>
    </template>
    <Switch :severity="severity" aria-label="Severity" />
  </ComponentExample>
</template>

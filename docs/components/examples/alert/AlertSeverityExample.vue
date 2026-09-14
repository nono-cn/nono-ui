<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, type AlertSeverity } from '@/components/ui/Alert'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: AlertSeverity = 'primary'
const severity = ref<AlertSeverity>(initialSeverity)
const severities: AlertSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'

const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('${severity.value}')
${scriptEnd}

<template>
  <Alert
    label="Estado del proceso"
    description="Elige una severidad para comunicar el estado."
    variant="solid"
    :severity="severity"
  />
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Selecciona la severidad semántica del alert."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="alert-severity">
        severity
        <select
          id="alert-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="alertSeverity in severities" :key="alertSeverity" :value="alertSeverity">
            {{ alertSeverity }}
          </option>
        </select>
      </label>
    </template>
    <Alert
      label="Estado del proceso"
      description="Elige una severidad para comunicar el estado."
      variant="solid"
      :severity="severity"
    />
  </ComponentExample>
</template>

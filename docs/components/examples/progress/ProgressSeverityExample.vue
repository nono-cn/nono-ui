<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity = 'success'
const severity = ref(initialSeverity)
const severities = ['primary', 'secondary', 'success', 'warning', 'error'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@nono-cn/nono-ui/components/ui/Progress'

const severity = ref(${JSON.stringify(severity.value)})
${scriptEnd}

<template>
  <Progress :value="65" :severity="severity" />
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Usa colores semánticos para comunicar el estado del progreso."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid w-full max-w-md gap-1.5 text-xs font-medium" for="progress-severity">
        severity
        <select
          id="progress-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="option in severities" :key="option" :value="option">{{ option }}</option>
        </select>
      </label>
    </template>
    <Progress class="w-full max-w-md" :value="65" :severity="severity" />
  </ComponentExample>
</template>

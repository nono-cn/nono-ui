<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, type ButtonSeverity } from '@/components/ui/Button'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: ButtonSeverity = 'primary'
const severity = ref<ButtonSeverity>(initialSeverity)
const severities: ButtonSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'

const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('${severity.value}')
${scriptEnd}

<template>
  <Button label="Confirmar" variant="solid" :severity="severity" />
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Selecciona la severidad semántica del botón."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="button-severity">
        severity
        <select
          id="button-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option
            v-for="buttonSeverity in severities"
            :key="buttonSeverity"
            :value="buttonSeverity"
          >
            {{ buttonSeverity }}
          </option>
        </select>
      </label>
    </template>
    <Button label="Confirmar" variant="solid" :severity="severity" />
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, type CheckboxSeverity } from '@/components/ui/Checkbox'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: CheckboxSeverity = 'primary'
const severity = ref<CheckboxSeverity>(initialSeverity)
const severities: CheckboxSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']
const checked = ref(true)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const checked = ref(true)
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('${severity.value}')
${scriptEnd}

<template>
  <Checkbox v-model:value="checked" :severity="severity" aria-label="Severity" />
</template>`,
)

function reset() {
  severity.value = initialSeverity
  checked.value = true
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Elige el color semántico del estado seleccionado."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="checkbox-severity">
        severity
        <select
          id="checkbox-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in severities" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Checkbox v-model:value="checked" :severity="severity" aria-label="Severity" />
  </ComponentExample>
</template>

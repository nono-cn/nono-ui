<script setup lang="ts">
import { computed, ref } from 'vue'
import { Kbd, type KbdSeverity } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: KbdSeverity = 'secondary'
const severity = ref<KbdSeverity>(initialSeverity)
const severities: KbdSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Kbd } from '@nono-cn/nono-ui/components/ui/Kbd'

const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('${severity.value}')
${scriptEnd}

<template>
  <Kbd label="Ctrl" variant="solid" :severity="severity" />
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Selecciona la severidad que define los colores de la tecla."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="kbd-severity">
        severity
        <select
          id="kbd-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="kbdSeverity in severities" :key="kbdSeverity" :value="kbdSeverity">
            {{ kbdSeverity }}
          </option>
        </select>
      </label>
    </template>
    <Kbd label="Ctrl" variant="solid" :severity="severity" />
  </ComponentExample>
</template>

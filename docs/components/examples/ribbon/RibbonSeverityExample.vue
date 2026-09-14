<script setup lang="ts">
import { computed, ref } from 'vue'
import { Ribbon } from '@/components/ui/Ribbon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity = 'primary' as const
const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>(initialSeverity)
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Ribbon } from '@nono-cn/nono-ui/components/ui/Ribbon'

const severity = ref<'primary' | 'secondary' | 'warning' | 'success' | 'error'>('${severity.value}')
${scriptEnd}

<template>
  <Ribbon
    :ribbons="[{ label: 'Estado', severity }]"
    class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
  >
    <div class="relative z-10 grid h-full place-items-center text-center">
      <p class="font-semibold">Severidad: {{ severity }}</p>
    </div>
  </Ribbon>
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Selecciona la severidad que mejor representa el estado de la cinta."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="ribbon-severity">
        severity
        <select
          id="ribbon-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in severities" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Ribbon
      :ribbons="[{ label: 'Estado', severity }]"
      class="h-52 w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground"
    >
      <div class="relative z-10 grid h-full place-items-center text-center">
        <p class="font-semibold">Severidad: {{ severity }}</p>
      </div>
    </Ribbon>
  </ComponentExample>
</template>

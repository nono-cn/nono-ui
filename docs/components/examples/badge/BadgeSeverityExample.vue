<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, type BadgeSeverity } from '@/components/ui/Badge'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSeverity: BadgeSeverity = 'primary'
const severity = ref<BadgeSeverity>(initialSeverity)
const severities: BadgeSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const code = computed(
  () => `<script setup lang="ts">
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'

const severity = '${severity.value}' as const
${scriptEnd}

<template>
  <Badge label="Status" :severity="severity" />
</template>`,
)

function reset() {
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Representa la severidad semántica del estado sin depender únicamente del color."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="badge-severity">
        severity
        <select
          id="badge-severity"
          v-model="severity"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="badgeSeverity in severities" :key="badgeSeverity" :value="badgeSeverity">
            {{ badgeSeverity }}
          </option>
        </select>
      </label>
    </template>
    <Badge label="Status" :severity="severity" />
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer, type AnnouncerPoliteness } from '@/components/ui/Announcer'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialPoliteness: AnnouncerPoliteness = 'polite'
const politeness = ref<AnnouncerPoliteness>(initialPoliteness)
const politenessValues: AnnouncerPoliteness[] = ['assertive', 'polite', 'off']
const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return '—'
})

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@nono-cn/nono-ui/components/ui/Announcer'

const politeness = ref<'assertive' | 'polite' | 'off'>('${politeness.value}')
const role = computed(() => {
  if (politeness.value === 'assertive') return 'alert'
  if (politeness.value === 'polite') return 'status'
  return '—'
})
${scriptEnd}

<template>
  <div class="grid gap-2 text-center">
    <Announcer message="Se ha actualizado el estado." :politeness="politeness" />
    <span class="text-sm font-medium">aria-live: {{ politeness }} · role: {{ role }}</span>
  </div>
</template>`,
)

function reset() {
  politeness.value = initialPoliteness
}
</script>

<template>
  <ComponentExample
    title="Politeness"
    description="assertive usa role=alert, polite usa role=status y off no añade role."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="announcer-politeness">
        politeness
        <select
          id="announcer-politeness"
          v-model="politeness"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="value in politenessValues" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
      </label>
    </template>
    <div class="grid gap-2 text-center">
      <Announcer message="Se ha actualizado el estado." :politeness="politeness" />
      <span class="text-sm font-medium">aria-live: {{ politeness }} · role: {{ role }}</span>
    </div>
  </ComponentExample>
</template>

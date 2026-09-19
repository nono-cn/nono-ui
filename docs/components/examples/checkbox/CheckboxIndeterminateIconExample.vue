<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Checkbox } from '@/components/ui/Checkbox'
import type { IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName = 'minus'
const icon = ref<IconName>(initialIcon)
const value = ref<boolean | 'indeterminate'>('indeterminate')
const iconNames = Object.keys(ICONS) as IconName[]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const value = ref<boolean | 'indeterminate'>('indeterminate')
${scriptEnd}

<template>
  <Checkbox
    v-model:value="value"
    :indeterminate-icon="{ name: '${icon.value}' }"
    aria-label="Selección parcial"
  />
</template>`,
)

function reset() {
  icon.value = initialIcon
  value.value = 'indeterminate'
}
</script>

<template>
  <ComponentExample
    title="Indeterminate icon"
    description="Personaliza el icono mostrado cuando el valor es indeterminate."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="checkbox-indeterminate-icon">
        indeterminateIcon
        <select
          id="checkbox-indeterminate-icon"
          v-model="icon"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
            {{ iconName }}
          </option>
        </select>
      </label>
    </template>
    <Checkbox
      v-model:value="value"
      :indeterminate-icon="{ name: icon }"
      aria-label="Selección parcial"
    />
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Checkbox } from '@/components/ui/Checkbox'
import type { IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName = 'minus'
const icon = ref<IconName>(initialIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@nono-cn/nono-ui/components/ui/Checkbox'

const checked = ref(true)
${scriptEnd}

<template>
  <Checkbox
    v-model:value="checked"
    :icon="{ name: '${icon.value}' }"
    aria-label="Seleccionar opción"
  />
</template>`,
)

const checked = ref(true)

function reset() {
  icon.value = initialIcon
  checked.value = true
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Personaliza el icono del indicador mediante IconConfig."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="checkbox-icon">
        icon
        <select
          id="checkbox-icon"
          v-model="icon"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
            {{ iconName }}
          </option>
        </select>
      </label>
    </template>
    <Checkbox v-model:value="checked" :icon="{ name: icon }" aria-label="Seleccionar opción" />
  </ComponentExample>
</template>

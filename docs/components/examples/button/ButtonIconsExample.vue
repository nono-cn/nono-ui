<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Button, type ButtonProps } from '@/components/ui/Button'
import { type IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName | undefined = 'save'
const initialTrailingIcon: IconName | undefined = 'chevronRight'
const icon = ref<IconName | undefined>(initialIcon)
const trailingIcon = ref<IconName | undefined>(initialTrailingIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const buttonProps = computed<ButtonProps>(() => ({
  label: 'Guardar',
  icon: icon.value ? { name: icon.value } : undefined,
  trailingIcon: trailingIcon.value ? { name: trailingIcon.value } : undefined,
}))

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
const trailingIcon = ref<IconName | undefined>(${trailingIcon.value ? `'${trailingIcon.value}'` : 'undefined'})
${scriptEnd}

<template>
  <Button
    label="Guardar"
    :icon="icon ? { name: icon } : undefined"
    :trailing-icon="trailingIcon ? { name: trailingIcon } : undefined"
  />
</template>`,
)

function reset() {
  icon.value = initialIcon
  trailingIcon.value = initialTrailingIcon
}
</script>

<template>
  <ComponentExample
    title="Icons"
    description="Configura los iconos inicial y final con la forma IconConfig."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1.5 text-xs font-medium" for="button-icon">
          icon
          <select
            id="button-icon"
            v-model="icon"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option :value="undefined">Sin icono</option>
            <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
              {{ iconName }}
            </option>
          </select>
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="button-trailing-icon">
          trailingIcon
          <select
            id="button-trailing-icon"
            v-model="trailingIcon"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option :value="undefined">Sin icono</option>
            <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
              {{ iconName }}
            </option>
          </select>
        </label>
      </div>
    </template>
    <Button v-bind="buttonProps" />
  </ComponentExample>
</template>

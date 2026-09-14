<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Alert, type AlertProps } from '@/components/ui/Alert'
import { type IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName | undefined = 'info'
const icon = ref<IconName | undefined>(initialIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const alertProps = computed<AlertProps>(() => ({
  label: 'Información',
  description: 'Este mensaje incluye un icono decorativo.',
  icon: icon.value ? { name: icon.value, 'aria-hidden': 'true' } : undefined,
}))

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@nono-cn/nono-ui/components/ui/Alert'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
${scriptEnd}

<template>
  <Alert
    label="Información"
    description="Este mensaje incluye un icono decorativo."
    :icon="icon ? { name: icon, 'aria-hidden': 'true' } : undefined"
  />
</template>`,
)

function reset() {
  icon.value = initialIcon
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Selecciona un icono del mapa público y pásalo como IconConfig."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="alert-icon">
        icon
        <select
          id="alert-icon"
          v-model="icon"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option :value="undefined">Sin icono</option>
          <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
            {{ iconName }}
          </option>
        </select>
      </label>
    </template>
    <Alert v-bind="alertProps" />
  </ComponentExample>
</template>

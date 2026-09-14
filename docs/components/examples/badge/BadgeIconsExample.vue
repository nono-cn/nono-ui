<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { type IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName | undefined = 'check'
const initialTrailingIcon: IconName | undefined = 'chevronRight'
const icon = ref<IconName | undefined>(initialIcon)
const trailingIcon = ref<IconName | undefined>(initialTrailingIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const badgeProps = computed<BadgeProps>(() => ({
  label: 'Status',
  icon: icon.value,
  trailingIcon: trailingIcon.value ? { name: trailingIcon.value } : undefined,
}))

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@nono-cn/nono-ui/components/ui/Badge'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
const trailingIcon = ref<IconName | undefined>(${trailingIcon.value ? `'${trailingIcon.value}'` : 'undefined'})
${scriptEnd}

<template>
  <Badge
    label="Status"
    :icon="icon"
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
    description="Usa un nombre directo para el icono inicial o una configuración IconConfig para el icono final."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1.5 text-xs font-medium" for="badge-icon">
          icon
          <select
            id="badge-icon"
            v-model="icon"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option :value="undefined">Sin icono</option>
            <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
              {{ iconName }}
            </option>
          </select>
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="badge-trailing-icon">
          trailingIcon
          <select
            id="badge-trailing-icon"
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
    <Badge v-bind="badgeProps" />
  </ComponentExample>
</template>

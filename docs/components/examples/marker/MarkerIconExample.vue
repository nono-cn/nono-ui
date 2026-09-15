<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Marker } from '@/components/ui/Marker'
import type { IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName | undefined = 'info'
const icon = ref<IconName | undefined>(initialIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const markerIcon = computed(() => (icon.value ? { name: icon.value } : undefined))

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Marker } from '@nono-cn/nono-ui/components/ui/Marker'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
${scriptEnd}

<template>
  <Marker
    label="Hay información nueva"
    :icon="icon ? { name: icon } : undefined"
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
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="marker-icon">
        icon
        <select
          id="marker-icon"
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
    <Marker label="Hay información nueva" :icon="markerIcon" class="max-w-md" />
  </ComponentExample>
</template>

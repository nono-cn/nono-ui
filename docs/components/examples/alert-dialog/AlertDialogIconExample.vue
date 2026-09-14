<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import type { IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName = 'warning'
const icon = ref<IconName | undefined>(initialIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const iconConfig = computed(() =>
  icon.value ? { name: icon.value, 'aria-hidden': 'true' as const } : undefined,
)

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@nono-cn/nono-ui/components/ui/AlertDialog'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
const iconConfig = computed(() =>
  icon.value ? { name: icon.value, 'aria-hidden': 'true' as const } : undefined,
)
${scriptEnd}

<template>
  <AlertDialog
    label="¿Continuar con la acción?"
    description="El icono acompaña al texto y no sustituye la confirmación visible."
    :icon="iconConfig"
  >
    <Button variant="outline">Abrir confirmación</Button>
  </AlertDialog>
</template>`,
)

function reset() {
  icon.value = initialIcon
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Añade un icono al label mediante IconConfig y ocúltalo del árbol accesible cuando sea decorativo."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="alert-dialog-icon">
        icon
        <select
          id="alert-dialog-icon"
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
    <AlertDialog
      label="¿Continuar con la acción?"
      description="El icono acompaña al texto y no sustituye la confirmación visible."
      :icon="iconConfig"
    >
      <Button variant="outline">Abrir confirmación</Button>
    </AlertDialog>
  </ComponentExample>
</template>

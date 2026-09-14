<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Attachment } from '@/components/ui/Attachment'
import type { IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialIcon: IconName | undefined = 'file'
const icon = ref<IconName | undefined>(initialIcon)
const iconNames = Object.keys(ICONS) as IconName[]

const attachmentIcon = computed(() =>
  icon.value ? { name: icon.value, 'aria-hidden': true as const } : undefined,
)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'
import type { IconName } from '@nono-cn/nono-ui/components/ui/Icon'

const icon = ref<IconName | undefined>(${icon.value ? `'${icon.value}'` : 'undefined'})
${scriptEnd}

<template>
  <Attachment
    label="documento.pdf"
    description="2.4 MB · PDF"
    :icon="icon ? { name: icon, 'aria-hidden': true } : undefined"
    class="w-full max-w-md"
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
    description="Pasa un IconConfig para elegir la media del archivo o elimina el icono."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="attachment-icon">
        icon
        <select
          id="attachment-icon"
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
    <Attachment
      label="documento.pdf"
      description="2.4 MB · PDF"
      :icon="attachmentIcon"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>

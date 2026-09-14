<script setup lang="ts">
import { computed, ref } from 'vue'
import { ICONS } from '@/assets/icons'
import { Icon, type IconName } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialName: IconName = 'user'
const name = ref<IconName>(initialName)
const iconNames = Object.keys(ICONS) as IconName[]

const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '@nono-cn/nono-ui/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="${name.value}" />
</template>`,
)

function reset() {
  name.value = initialName
}
</script>

<template>
  <ComponentExample
    title="Name"
    description="Elige un nombre del mapa público ICONS."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="icon-name">
        name
        <select
          id="icon-name"
          v-model="name"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="iconName in iconNames" :key="iconName" :value="iconName">
            {{ iconName }}
          </option>
        </select>
      </label>
    </template>
    <Icon :name="name" />
  </ComponentExample>
</template>

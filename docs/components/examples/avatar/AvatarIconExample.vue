<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import type { IconName } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const icons: IconName[] = ['user', 'info', 'check', 'image']
const iconName = ref<IconName>('user')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '__DOCS_PACKAGE__/components/ui/Icon'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const iconName = ref<IconName>('${iconName.value}')
${scriptEnd}

<template>
  <Avatar :icon="{ name: iconName }" />
</template>`,
)

function reset() {
  iconName.value = 'user'
}
</script>

<template>
  <ComponentExample
    title="Icon"
    description="Choose the icon displayed in the avatar fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="iconName" label="Icon" :options="icons" />
      </div>
    </template>
    <Avatar :icon="{ name: iconName }" />
  </ComponentExample>
</template>

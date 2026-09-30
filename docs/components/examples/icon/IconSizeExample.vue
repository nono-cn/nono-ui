<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon, iconSizes, type IconSize } from '@/components/ui/Icon'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<IconSize>('md')
const code = computed(
  () => `<script setup lang="ts">
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'
${scriptEnd}

<template>
  <Icon name="check" size="${size.value}" />
</template>`,
)

function reset() {
  size.value = 'md'
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the icon’s visual size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="iconSizes" />
      </div>
    </template>
    <Icon name="check" :size="size" />
  </ComponentExample>
</template>

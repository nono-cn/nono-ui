<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, buttonDefaults, buttonTextSizes, type ButtonSize } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const size = ref<ButtonSize>(buttonDefaults.size)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const size = ref('${size.value}' as const)
${scriptEnd}

<template>
  <Button label="Save changes" :size="size" />
</template>`,
)

function reset() {
  size.value = buttonDefaults.size
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Choose the button’s visual size."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="size" label="Size" :options="buttonTextSizes" />
      </div>
    </template>
    <Button label="Save changes" :size="size" />
  </ComponentExample>
</template>

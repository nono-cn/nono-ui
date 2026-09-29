<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { themeShadows } from '../../../config/constants'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const shadow = ref<string>('lg')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const shadow = ref('${shadow.value}')
${scriptEnd}

<template>
  <Button label="Save changes" :shadow="shadow" />
</template>`,
)

function reset() {
  shadow.value = 'lg'
}
</script>

<template>
  <ComponentExample
    title="Shadow"
    description="Choose a shadow from the theme scale."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="shadow" label="Shadow" :options="themeShadows" />
      </div>
    </template>
    <Button label="Save changes" :shadow="shadow" />
  </ComponentExample>
</template>

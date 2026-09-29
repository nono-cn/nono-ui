<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { themeRadii } from '../../../config/constants'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const radii = [...themeRadii, 'custom']
const selectedRadius = ref('md')
const customRadius = ref('1rem')
const radius = computed(() =>
  selectedRadius.value === 'custom' ? customRadius.value : selectedRadius.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const radius = ref('${radius.value}' as const)
${scriptEnd}

<template>
  <Button label="Save changes" :radius="radius" />
</template>`,
)

function reset() {
  selectedRadius.value = 'md'
  customRadius.value = '1rem'
}
</script>

<template>
  <ComponentExample
    title="Radius"
    description="Choose a theme radius, a custom --radius-name token, or a CSS length."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedRadius" label="Radius" :options="radii" />
        <ExampleTextInputControl
          v-if="selectedRadius === 'custom'"
          v-model="customRadius"
          label="Custom radius"
          placeholder="eval or 1rem"
        />
      </div>
    </template>
    <Button label="Save changes" :radius="radius" />
  </ComponentExample>
</template>

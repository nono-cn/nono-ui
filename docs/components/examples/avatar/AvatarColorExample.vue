<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, avatarDefaults } from '@/components/ui/Avatar'
import { themeColors } from '@/components/ui/constants'
import ExampleColorControl from '../../controls/ExampleColorControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const colors = [...themeColors, 'custom']
const selectedColor = ref<string>(avatarDefaults.color)
const customColor = ref('#7c3aed')
const color = computed(() =>
  selectedColor.value === 'custom' ? customColor.value : selectedColor.value,
)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'

const color = ref('${color.value}')
${scriptEnd}

<template>
  <Avatar :color="color" label="JD" />
</template>`,
)

function reset() {
  selectedColor.value = avatarDefaults.color
  customColor.value = '#7c3aed'
}
</script>

<template>
  <ComponentExample
    title="Color"
    description="Choose a theme token or custom color for the avatar fallback."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedColor" label="Color" :options="colors" />
        <ExampleColorControl
          v-if="selectedColor === 'custom'"
          v-model="customColor"
          label="Custom color"
        />
      </div>
    </template>
    <Avatar :color="color" label="JD" />
  </ComponentExample>
</template>

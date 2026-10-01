<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults } from '@/components/ui/Chip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const standaloneOptions = ['false', 'true'] as const
const selectedStandalone = ref(String(chipDefaults.standalone))
const standalone = computed(() => selectedStandalone.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/ui/Chip'

const standalone = ref(${standalone.value})
${scriptEnd}

<template>
  <Chip :standalone="standalone">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`,
)

function reset() {
  selectedStandalone.value = String(chipDefaults.standalone)
}
</script>

<template>
  <ComponentExample
    title="Standalone"
    description="Choose whether the indicator is positioned independently from its content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl
          v-model="selectedStandalone"
          label="Standalone"
          :options="standaloneOptions"
        />
      </div>
    </template>
    <Chip :standalone="standalone">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>

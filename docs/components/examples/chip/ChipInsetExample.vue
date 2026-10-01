<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults } from '@/components/ui/Chip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const insetOptions = ['false', 'true'] as const
const selectedInset = ref(String(chipDefaults.inset))
const inset = computed(() => selectedInset.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/ui/Chip'

const inset = ref(${inset.value})
${scriptEnd}

<template>
  <Chip :inset="inset">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`,
)

function reset() {
  selectedInset.value = String(chipDefaults.inset)
}
</script>

<template>
  <ComponentExample
    title="Inset"
    description="Choose whether the chip stays within its positioned corner."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedInset" label="Inset" :options="insetOptions" />
      </div>
    </template>
    <Chip :inset="inset">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>

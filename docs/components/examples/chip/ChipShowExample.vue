<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults } from '@/components/ui/Chip'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const showOptions = ['true', 'false'] as const
const selectedShow = ref(String(chipDefaults.show))
const show = computed(() => selectedShow.value === 'true')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/ui/Chip'

const show = ref(${show.value})
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-2">
    <Chip :show="show">
      <Avatar label="NC" size="lg" />
    </Chip>
    <span>{{ show ? 'Visible' : 'Hidden' }}</span>
  </div>
</template>`,
)

function reset() {
  selectedShow.value = String(chipDefaults.show)
}
</script>

<template>
  <ComponentExample
    title="Show"
    description="Choose whether the chip indicator is visible."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="selectedShow" label="Show" :options="showOptions" />
      </div>
    </template>
    <div class="grid justify-items-center gap-2">
      <Chip :show="show">
        <Avatar label="NC" size="lg" />
      </Chip>
      <span>{{ show ? 'Visible' : 'Hidden' }}</span>
    </div>
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Card } from '@/components/ui/Card'
import {
  Ribbon,
  ribbonItemDefaults,
  ribbonPositions,
  ribbonRotations,
  type RibbonPosition,
} from '@/components/ui/Ribbon'
import ExampleNumberControl from '../../controls/ExampleNumberControl.vue'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const position = ref<RibbonPosition>(ribbonItemDefaults.position)
const rotate = ref<number>(ribbonRotations[ribbonItemDefaults.position])
// cada esquina tiene su rotación por defecto; al cambiarla se parte de esa rotación
watch(position, (value) => {
  rotate.value = ribbonRotations[value]
})
const customRotate = computed(() =>
  rotate.value === ribbonRotations[position.value] ? undefined : rotate.value,
)
const ribbons = computed(() => [
  { label: 'Featured', position: position.value, rotate: customRotate.value },
])
const code = computed(
  () => `<script setup lang="ts">
import { Card } from '__DOCS_PACKAGE__/components/ui/Card'
import { Ribbon } from '__DOCS_PACKAGE__/components/ui/Ribbon'

const ribbons = [
  { label: 'Featured', position: '${position.value}'${customRotate.value === undefined ? '' : `, rotate: ${customRotate.value}`} },
]
${scriptEnd}

<template>
  <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
    <Card label="Team plan" description="Placed on the ${position.value} corner." class="min-h-48">
      <p class="text-2xl font-semibold">$29/mo</p>
    </Card>
  </Ribbon>
</template>`,
)

function reset() {
  position.value = ribbonItemDefaults.position
  rotate.value = ribbonRotations[ribbonItemDefaults.position]
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Place the ribbon on any corner and override its rotation."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="position" label="Position" :options="ribbonPositions" />
        <ExampleNumberControl v-model="rotate" label="Rotate" :min="-90" :max="90" />
      </div>
    </template>
    <Ribbon :ribbons="ribbons" class="w-72 rounded-xl">
      <Card label="Team plan" :description="`Placed on the ${position} corner.`" class="min-h-48">
        <p class="text-2xl font-semibold">$29/mo</p>
      </Card>
    </Ribbon>
  </ComponentExample>
</template>

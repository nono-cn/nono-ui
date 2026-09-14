<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialShowArrow = true
const initialArrowWidth = 10
const initialArrowHeight = 5
const initialArrowRounded = false
const open = ref(true)
const showArrow = ref(initialShowArrow)
const arrowWidth = ref(initialArrowWidth)
const arrowHeight = ref(initialArrowHeight)
const arrowRounded = ref(initialArrowRounded)

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'

const open = ref(true)
const showArrow = ref(${showArrow.value})
const arrowWidth = ref(${arrowWidth.value})
const arrowHeight = ref(${arrowHeight.value})
const arrowRounded = ref(${arrowRounded.value})
${scriptEnd}

<template>
  <Popover
    v-model:open="open"
    :show-arrow="showArrow"
    :arrow-width="arrowWidth"
    :arrow-height="arrowHeight"
    :arrow-rounded="arrowRounded"
  >
    <Button variant="outline">Abrir popover</Button>

    <template #content>
      <p class="text-sm">La flecha se adapta a las dimensiones seleccionadas.</p>
    </template>
  </Popover>
</template>`,
)

function reset() {
  showArrow.value = initialShowArrow
  arrowWidth.value = initialArrowWidth
  arrowHeight.value = initialArrowHeight
  arrowRounded.value = initialArrowRounded
  open.value = true
}
</script>

<template>
  <ComponentExample
    title="Arrow"
    description="Muestra la flecha y ajusta su tamaño y forma."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label class="flex items-center gap-2 text-xs font-medium" for="popover-show-arrow">
          <input id="popover-show-arrow" v-model="showArrow" type="checkbox" />
          showArrow
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="popover-arrow-width">
          arrowWidth
          <input
            id="popover-arrow-width"
            v-model.number="arrowWidth"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
            min="1"
            type="number"
          />
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="popover-arrow-height">
          arrowHeight
          <input
            id="popover-arrow-height"
            v-model.number="arrowHeight"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
            min="1"
            type="number"
          />
        </label>
        <label class="flex items-center gap-2 text-xs font-medium" for="popover-arrow-rounded">
          <input id="popover-arrow-rounded" v-model="arrowRounded" type="checkbox" />
          arrowRounded
        </label>
      </div>
    </template>
    <div class="flex min-h-40 items-center justify-center">
      <Popover
        v-model:open="open"
        :show-arrow="showArrow"
        :arrow-width="arrowWidth"
        :arrow-height="arrowHeight"
        :arrow-rounded="arrowRounded"
      >
        <Button variant="outline">Abrir popover</Button>

        <template #content>
          <p class="text-sm">La flecha se adapta a las dimensiones seleccionadas.</p>
        </template>
      </Popover>
    </div>
  </ComponentExample>
</template>

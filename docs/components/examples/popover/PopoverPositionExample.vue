<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSide = 'bottom' as const
const initialAlign = 'center' as const
const initialSideOffset = 4
const open = ref(true)
const side = ref<'top' | 'right' | 'bottom' | 'left'>(initialSide)
const align = ref<'start' | 'center' | 'end'>(initialAlign)
const sideOffset = ref(initialSideOffset)
const sides = ['top', 'right', 'bottom', 'left'] as const
const aligns = ['start', 'center', 'end'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@nono-cn/nono-ui/components/ui/Button'
import { Popover } from '@nono-cn/nono-ui/components/ui/Popover'

const open = ref(true)
const side = ref<'top' | 'right' | 'bottom' | 'left'>('${side.value}')
const align = ref<'start' | 'center' | 'end'>('${align.value}')
const sideOffset = ref(${sideOffset.value})
${scriptEnd}

<template>
  <Popover
    v-model:open="open"
    :side="side"
    :align="align"
    :side-offset="sideOffset"
  >
    <Button variant="outline">Abrir popover</Button>

    <template #content>
      <p class="text-sm">El contenido se posiciona según las props seleccionadas.</p>
    </template>
  </Popover>
</template>`,
)

function reset() {
  side.value = initialSide
  align.value = initialAlign
  sideOffset.value = initialSideOffset
  open.value = true
}
</script>

<template>
  <ComponentExample
    title="Position"
    description="Prueba las opciones de posicionamiento del contenido flotante."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-3">
        <label class="grid gap-1.5 text-xs font-medium" for="popover-side">
          side
          <select
            id="popover-side"
            v-model="side"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option v-for="popoverSide in sides" :key="popoverSide" :value="popoverSide">
              {{ popoverSide }}
            </option>
          </select>
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="popover-align">
          align
          <select
            id="popover-align"
            v-model="align"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option v-for="popoverAlign in aligns" :key="popoverAlign" :value="popoverAlign">
              {{ popoverAlign }}
            </option>
          </select>
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="popover-side-offset">
          sideOffset
          <input
            id="popover-side-offset"
            v-model.number="sideOffset"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
            min="0"
            type="number"
          />
        </label>
      </div>
    </template>
    <div class="flex min-h-48 items-center justify-center">
      <Popover v-model:open="open" :side="side" :align="align" :side-offset="sideOffset">
        <Button variant="outline">Abrir popover</Button>

        <template #content>
          <p class="text-sm">El contenido se posiciona según las props seleccionadas.</p>
        </template>
      </Popover>
    </div>
  </ComponentExample>
</template>

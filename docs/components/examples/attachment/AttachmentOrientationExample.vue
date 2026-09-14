<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialOrientation = 'horizontal' as const
const orientation = ref<'horizontal' | 'vertical'>(initialOrientation)
const orientations = ['horizontal', 'vertical'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const orientation = ref<'horizontal' | 'vertical'>('${orientation.value}')
${scriptEnd}

<template>
  <Attachment
    label="presentacion.pdf"
    description="8.2 MB · PDF"
    :icon="{ name: 'file', 'aria-hidden': true }"
    :orientation="orientation"
  />
</template>`,
)

function reset() {
  orientation.value = initialOrientation
}
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Cambia la dirección de la composición para adaptarla al espacio disponible."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="attachment-orientation">
        orientation
        <select
          id="attachment-orientation"
          v-model="orientation"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in orientations" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <div class="flex min-h-40 w-full items-center justify-center">
      <Attachment
        label="presentacion.pdf"
        description="8.2 MB · PDF"
        :icon="{ name: 'file', 'aria-hidden': true }"
        :orientation="orientation"
      />
    </div>
  </ComponentExample>
</template>

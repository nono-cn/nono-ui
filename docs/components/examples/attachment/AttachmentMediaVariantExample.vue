<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialMediaVariant = 'icon' as const
const mediaVariant = ref<'icon' | 'image'>(initialMediaVariant)
const mediaVariants = ['icon', 'image'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const mediaVariant = ref<'icon' | 'image'>('${mediaVariant.value}')
${scriptEnd}

<template>
  <Attachment
    label="preview.png"
    description="640 KB · PNG"
    :media-variant="mediaVariant"
  >
    <template #media>
      <div
        role="img"
        aria-label="Vista previa del archivo"
        class="grid size-full place-items-center bg-primary/10 text-sm font-semibold text-primary"
      >
        PNG
      </div>
    </template>
  </Attachment>
</template>`,
)

function reset() {
  mediaVariant.value = initialMediaVariant
}
</script>

<template>
  <ComponentExample
    title="Media variant"
    description="Usa el icono predeterminado o el slot media para representar una vista previa."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="attachment-media-variant">
        mediaVariant
        <select
          id="attachment-media-variant"
          v-model="mediaVariant"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in mediaVariants" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Attachment
      label="preview.png"
      description="640 KB · PNG"
      :media-variant="mediaVariant"
      class="w-full max-w-md"
    >
      <template #media>
        <div
          role="img"
          aria-label="Vista previa del archivo"
          class="grid size-full place-items-center bg-primary/10 text-sm font-semibold text-primary"
        >
          PNG
        </div>
      </template>
    </Attachment>
  </ComponentExample>
</template>

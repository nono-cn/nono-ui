<script setup lang="ts">
import { computed, ref } from 'vue'
import { Attachment } from '@/components/ui/Attachment'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialSize = 'md' as const
const size = ref<'md' | 'sm' | 'xs'>(initialSize)
const sizes = ['md', 'sm', 'xs'] as const

const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Attachment } from '@nono-cn/nono-ui/components/ui/Attachment'

const size = ref<'md' | 'sm' | 'xs'>('${size.value}')
${scriptEnd}

<template>
  <Attachment
    label="informe-final.pdf"
    description="12.8 MB · PDF"
    :icon="{ name: 'file', 'aria-hidden': true }"
    :size="size"
    class="w-full max-w-md"
  />
</template>`,
)

function reset() {
  size.value = initialSize
}
</script>

<template>
  <ComponentExample
    title="Size"
    description="Compara los tamaños disponibles para diferentes densidades de información."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <label class="grid max-w-xs gap-1.5 text-xs font-medium" for="attachment-size">
        size
        <select
          id="attachment-size"
          v-model="size"
          class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
        >
          <option v-for="item in sizes" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </template>
    <Attachment
      label="informe-final.pdf"
      description="12.8 MB · PDF"
      :icon="{ name: 'file', 'aria-hidden': true }"
      :size="size"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>

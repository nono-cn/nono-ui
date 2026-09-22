<script setup lang="ts">
import { Check, Clipboard, RotateCcw } from '@lucide/vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    code: string
    showReset?: boolean
  }>(),
  {
    description: undefined,
    showReset: true,
  },
)

const emit = defineEmits<{
  reset: []
}>()

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  if (!navigator.clipboard) return

  await navigator.clipboard.writeText(props.code)
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <article class="overflow-hidden rounded-xl border bg-card text-card-foreground">
    <header class="flex flex-wrap items-start justify-between gap-3 border-b p-4 sm:p-5">
      <div class="grid gap-1">
        <h3 class="font-semibold">{{ title }}</h3>
        <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
      <button
        v-if="showReset"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        @click="emit('reset')"
      >
        <RotateCcw class="size-3.5" aria-hidden="true" />
        Restablecer
      </button>
    </header>

    <div v-if="$slots.controls" class="border-b bg-muted/20 px-4 py-4 sm:px-5">
      <slot name="controls" />
    </div>

    <div class="grid min-h-36 place-items-center p-8 sm:min-h-44">
      <slot />
    </div>

    <div class="relative border-t bg-muted/40">
      <button
        type="button"
        class="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        :aria-label="copied ? 'Código copiado' : 'Copiar código'"
        :title="copied ? 'Copiado' : 'Copiar código'"
        @click="copyCode"
      >
        <Check v-if="copied" class="size-4" aria-hidden="true" />
        <Clipboard v-else class="size-4" aria-hidden="true" />
      </button>
      <pre
        class="overflow-x-auto p-4 pr-14 text-sm leading-6 break-words whitespace-pre-wrap"
      ><code>{{ code }}</code></pre>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Clipboard, Play, RotateCcw } from '@lucide/vue'

const props = withDefaults(
  defineProps<{ title: string; description?: string; initialCode: string }>(),
  { description: undefined },
)
const code = defineModel<string>('code', { default: '' })
const emit = defineEmits<{ run: [code: string]; reset: [] }>()
const copied = ref(false)

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const highlightedCode = computed(() => {
  let result = escapeHtml(code.value)
  result = result.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="token-tag">$2</span>')
  result = result.replace(
    /([\w:-]+)(=)([&quot;'].*?[&quot;'])/g,
    '<span class="token-attr">$1</span>$2<span class="token-string">$3</span>',
  )
  result = result.replace(
    /(import|from|const|let|ref|true|false|script|setup|template)/g,
    '<span class="token-keyword">$1</span>',
  )
  result = result.replace(/(&quot;.*?&quot;|'[^']*')/g, '<span class="token-string">$1</span>')
  return result
})

function handleTab(event: KeyboardEvent) {
  if (event.key !== 'Tab') return
  event.preventDefault()
  const target = event.target as HTMLTextAreaElement
  const start = target.selectionStart
  const end = target.selectionEnd
  code.value = `${code.value.slice(0, start)}  ${code.value.slice(end)}`
  requestAnimationFrame(() => {
    target.selectionStart = target.selectionEnd = start + 2
  })
}

async function copyCode() {
  if (!navigator.clipboard) return
  await navigator.clipboard.writeText(code.value)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1400)
}

function reset() {
  code.value = props.initialCode
  emit('reset')
  emit('run', code.value)
}
</script>

<template>
  <article class="playground-example">
    <header class="playground-example-header">
      <div>
        <h3>{{ title }}</h3>
        <p v-if="description">{{ description }}</p>
      </div>
    </header>
    <div v-if="$slots.controls" class="playground-example-controls"><slot name="controls" /></div>
    <div class="playground-example-preview"><slot /></div>
    <div class="playground-example-editor">
      <div class="playground-editor-toolbar">
        <div>
          <button
            type="button"
            aria-label="Restablecer código"
            title="Restablecer código"
            @click="reset"
          >
            <RotateCcw :size="14" aria-hidden="true" />
          </button>
          <button
            type="button"
            :aria-label="copied ? 'Código copiado' : 'Copiar código'"
            :title="copied ? 'Copiado' : 'Copiar código'"
            @click="copyCode"
          >
            <Check v-if="copied" :size="14" aria-hidden="true" />
            <Clipboard v-else :size="14" aria-hidden="true" />
          </button>
          <button
            class="playground-run"
            type="button"
            aria-label="Ejecutar código"
            title="Ejecutar código"
            @click="emit('run', code)"
          >
            <Play :size="14" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div class="playground-code-wrap">
        <pre class="playground-highlight" aria-hidden="true" v-html="highlightedCode + '\n'" />
        <textarea
          v-model="code"
          class="playground-code playground-code-input"
          aria-label="Editable Vue example"
          wrap="soft"
          spellcheck="false"
          @keydown="handleTab"
          @keydown.ctrl.enter.prevent="emit('run', code)"
          @keydown.meta.enter.prevent="emit('run', code)"
        />
      </div>
      <p class="playground-hint">
        Usa <kbd>Tab</kbd> para indentar y <kbd>Ctrl</kbd> + <kbd>Enter</kbd> para ejecutar.
      </p>
    </div>
  </article>
</template>

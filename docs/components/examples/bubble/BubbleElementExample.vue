<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bubble } from '@/components/ui/Bubble'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

type ElementMode = 'as' | 'asChild'
type SurfaceElement = 'div' | 'article' | 'section'

const modes: ElementMode[] = ['as', 'asChild']
const elements: SurfaceElement[] = ['div', 'article', 'section']
const mode = ref<ElementMode>('as')
const element = ref<SurfaceElement>('article')
const code = computed(() => {
  if (mode.value === 'asChild') {
    return `<script setup lang="ts">
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'
${scriptEnd}

<template>
  <Bubble as-child>
    <article>A message rendered on its child element.</article>
  </Bubble>
</template>`
  }

  return `<script setup lang="ts">
import { ref } from 'vue'
import { Bubble } from '__DOCS_PACKAGE__/components/ui/Bubble'

type SurfaceElement = 'div' | 'article' | 'section'
const element = ref<SurfaceElement>('${element.value}')
${scriptEnd}

<template>
  <Bubble :as="element">A message rendered as a custom element.</Bubble>
</template>`
})

function reset() {
  mode.value = 'as'
  element.value = 'article'
}
</script>

<template>
  <ComponentExample
    title="Element"
    description="Render the surface as a chosen element or merge it onto the child element."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleSelectControl v-model="mode" label="Rendering" :options="modes" />
        <ExampleSelectControl
          v-if="mode === 'as'"
          v-model="element"
          label="Element"
          :options="elements"
        />
      </div>
    </template>
    <div class="w-full">
      <Bubble v-if="mode === 'asChild'" as-child>
        <article>A message rendered on its child element.</article>
      </Bubble>
      <Bubble v-else :as="element">A message rendered as a custom element.</Bubble>
    </div>
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Link } from '@/components/ui/Link'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const replace = ref(false)
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const replace = ref(${replace.value})
${scriptEnd}

<template>
  <Link to="/components/button" :replace="replace" label="Explore Button" />
</template>`,
)
</script>

<template>
  <ComponentExample
    title="Replace history"
    description="The replace prop changes internal navigation from a history push to a replacement."
    :code="code"
    @reset="replace = false"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="replace" label="Replace current history entry" />
    </template>
    <Link to="/components/button" :replace="replace" label="Explore Button" />
  </ComponentExample>
</template>

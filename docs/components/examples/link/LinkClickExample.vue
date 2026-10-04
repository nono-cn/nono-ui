<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '@/components/ui/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const clicks = ref(0)
const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const clicks = ref(0)
${scriptEnd}

<template>
  <div class="grid justify-items-center gap-2">
    <Link to="#link-clicks" label="Count click" @click="clicks++" />
    <p id="link-clicks" role="status">Clicks: {{ clicks }}</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Click event"
    description="Handle the click event emitted by Link while following its destination."
    :code="code"
    @reset="clicks = 0"
  >
    <div class="grid justify-items-center gap-2">
      <Link to="#link-clicks" label="Count click" @click="clicks++" />
      <p id="link-clicks" role="status">Clicks: {{ clicks }}</p>
    </div>
  </ComponentExample>
</template>

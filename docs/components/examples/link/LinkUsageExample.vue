<script setup lang="ts">
import { Link } from '@/components/Link'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Link } from '__DOCS_PACKAGE__/components/Link'
${scriptEnd}

<template>
  <Link to="/components/button" label="Explore Button" />
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Link to another route in the application."
    :code="code"
    :show-reset="false"
  >
    <Link to="/components/button" label="Explore Button" />
  </ComponentExample>
</template>

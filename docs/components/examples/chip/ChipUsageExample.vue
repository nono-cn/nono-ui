<script setup lang="ts">
import { Avatar } from '@/components/Avatar'
import { Chip } from '@/components/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/Chip'
${scriptEnd}

<template>
  <Chip>
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Display an indicator over an associated element."
    :code="code"
    :show-reset="false"
  >
    <Chip>
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>

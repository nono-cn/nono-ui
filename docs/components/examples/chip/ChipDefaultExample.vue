<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip } from '__DOCS_PACKAGE__/components/ui/Chip'
${scriptEnd}

<template>
  <Chip position="bottom-right">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`
</script>

<template>
  <ComponentExample
    title="Default"
    description="Use the default slot to position the chip over an element."
    :code="code"
    :show-reset="false"
  >
    <Chip position="bottom-right">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>

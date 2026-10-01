<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Chip, chipDefaults } from '@/components/ui/Chip'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Avatar } from '__DOCS_PACKAGE__/components/ui/Avatar'
import { Chip, chipDefaults } from '__DOCS_PACKAGE__/components/ui/Chip'
${scriptEnd}

<template>
  <Chip :position="chipDefaults.position">
    <Avatar label="NC" size="lg" />
  </Chip>
</template>`
</script>

<template>
  <ComponentExample
    title="Default"
    description="The default position places the chip at the top-right of its content."
    :code="code"
    :show-reset="false"
  >
    <Chip :position="chipDefaults.position">
      <Avatar label="NC" size="lg" />
    </Chip>
  </ComponentExample>
</template>

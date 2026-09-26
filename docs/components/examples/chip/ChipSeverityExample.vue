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
  <div class="flex flex-wrap items-center gap-6">
    <Chip severity="primary"><Avatar label="P" size="lg" /></Chip>
    <Chip severity="neutral"><Avatar label="N" size="lg" /></Chip>
    <Chip severity="secondary"><Avatar label="S" size="lg" /></Chip>
    <Chip severity="warning"><Avatar label="W" size="lg" /></Chip>
    <Chip severity="success"><Avatar label="OK" size="lg" /></Chip>
    <Chip severity="error"><Avatar label="E" size="lg" /></Chip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Severity"
    description="Choose a semantic color for the chip indicator."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-6">
      <Chip severity="primary"><Avatar label="P" size="lg" /></Chip>
      <Chip severity="neutral"><Avatar label="N" size="lg" /></Chip>
      <Chip severity="secondary"><Avatar label="S" size="lg" /></Chip>
      <Chip severity="warning"><Avatar label="W" size="lg" /></Chip>
      <Chip severity="success"><Avatar label="OK" size="lg" /></Chip>
      <Chip severity="error"><Avatar label="E" size="lg" /></Chip>
    </div>
  </ComponentExample>
</template>

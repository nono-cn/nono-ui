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
  <div class="flex flex-wrap items-center gap-5">
    <Chip size="3xs"><Avatar label="3" size="lg" /></Chip>
    <Chip size="2xs"><Avatar label="2" size="lg" /></Chip>
    <Chip size="xs"><Avatar label="X" size="lg" /></Chip>
    <Chip size="sm"><Avatar label="S" size="lg" /></Chip>
    <Chip size="md"><Avatar label="M" size="lg" /></Chip>
    <Chip size="lg"><Avatar label="L" size="lg" /></Chip>
    <Chip size="xl"><Avatar label="X" size="lg" /></Chip>
    <Chip size="2xl"><Avatar label="2" size="lg" /></Chip>
    <Chip size="3xl"><Avatar label="3" size="lg" /></Chip>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Ajusta el tamaño del indicador."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-5">
      <Chip size="3xs"><Avatar label="3" size="lg" /></Chip>
      <Chip size="2xs"><Avatar label="2" size="lg" /></Chip>
      <Chip size="xs"><Avatar label="X" size="lg" /></Chip>
      <Chip size="sm"><Avatar label="S" size="lg" /></Chip>
      <Chip size="md"><Avatar label="M" size="lg" /></Chip>
      <Chip size="lg"><Avatar label="L" size="lg" /></Chip>
      <Chip size="xl"><Avatar label="X" size="lg" /></Chip>
      <Chip size="2xl"><Avatar label="2" size="lg" /></Chip>
      <Chip size="3xl"><Avatar label="3" size="lg" /></Chip>
    </div>
  </ComponentExample>
</template>

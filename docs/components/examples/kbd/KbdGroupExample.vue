<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Kbd, KbdGroup } from '__DOCS_PACKAGE__/components/ui/Kbd'
${scriptEnd}

<template>
  <KbdGroup aria-label="Control plus K">
    <Kbd label="Ctrl" />
    <span aria-hidden="true">+</span>
    <Kbd label="K" />
  </KbdGroup>
</template>`
</script>

<template>
  <ComponentExample
    title="Keyboard shortcuts"
    description="Combine keys with KbdGroup. Give the complete shortcut an accessible name."
    :code="code"
    :show-reset="false"
  >
    <KbdGroup aria-label="Control plus K">
      <Kbd label="Ctrl" />
      <span aria-hidden="true">+</span>
      <Kbd label="K" />
    </KbdGroup>
  </ComponentExample>
</template>

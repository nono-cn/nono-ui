<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Empty } from '@/components/ui/Empty'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Empty } from '__DOCS_PACKAGE__/components/ui/Empty'
${scriptEnd}

<template>
  <Empty
    class="w-full"
    label="No projects yet"
    description="Create your first project to get started."
  >
    <Button label="Create project" />
  </Empty>
</template>`
</script>

<template>
  <ComponentExample
    title="Basic usage"
    description="Show an empty state with an action to continue."
    :code="code"
    :show-reset="false"
  >
    <Empty
      class="w-full"
      label="No projects yet"
      description="Create your first project to get started."
    >
      <Button label="Create project" />
    </Empty>
  </ComponentExample>
</template>

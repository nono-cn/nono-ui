<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { ButtonGroup } from '__DOCS_PACKAGE__/components/ui/ButtonGroup'
${scriptEnd}

<template>
  <div class="grid gap-4">
    <ButtonGroup v-for="size in ['xs', 'sm', 'md', 'lg']" :key="size" :size="size" :aria-label="\`Actions, size \${size}\`">
      <Button label="Cancel" variant="outline" />
      <Button label="Apply" />
    </ButtonGroup>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Size"
    description="Applies the selected size to every button in the group."
    :code="code"
    :show-reset="false"
  >
    <div class="grid gap-4">
      <ButtonGroup
        v-for="size in ['xs', 'sm', 'md', 'lg']"
        :key="size"
        :size="size"
        :aria-label="`Actions, size ${size}`"
      >
        <Button label="Cancel" variant="outline" />
        <Button label="Apply" />
      </ButtonGroup>
    </div>
  </ComponentExample>
</template>

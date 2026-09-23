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
  <div class="flex flex-wrap items-center gap-8">
    <div class="grid justify-items-center gap-2">
      <Chip :inset="false"><Avatar label="OUT" size="lg" /></Chip>
      <span class="text-xs text-muted-foreground">inset=false</span>
    </div>
    <div class="grid justify-items-center gap-2">
      <Chip :inset="true"><Avatar label="IN" size="lg" /></Chip>
      <span class="text-xs text-muted-foreground">inset=true</span>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Inset"
    description="Prevent the chip from being offset from its position."
    :code="code"
    :show-reset="false"
  >
    <div class="flex flex-wrap items-center gap-8">
      <div class="grid justify-items-center gap-2">
        <Chip :inset="false"><Avatar label="OUT" size="lg" /></Chip>
        <span class="text-xs text-muted-foreground">inset=false</span>
      </div>
      <div class="grid justify-items-center gap-2">
        <Chip :inset="true"><Avatar label="IN" size="lg" /></Chip>
        <span class="text-xs text-muted-foreground">inset=true</span>
      </div>
    </div>
  </ComponentExample>
</template>

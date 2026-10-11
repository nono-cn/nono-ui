<script setup lang="ts">
import { Separator } from '@/components/ui/Separator'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Separator } from '__DOCS_PACKAGE__/components/ui/Separator'
${scriptEnd}

<template>
  <div class="grid w-full max-w-sm gap-4 text-center">
    <p>Sign in</p>
    <Separator class="flex items-center justify-center">
      <span class="bg-card px-2 text-xs text-muted-foreground">OR</span>
    </Separator>
    <p>Continue as guest</p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Default slot"
    description="Place custom content inside the separator."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-sm gap-4 text-center">
      <p>Sign in</p>
      <Separator class="flex items-center justify-center">
        <span class="bg-card px-2 text-xs text-muted-foreground">OR</span>
      </Separator>
      <p>Continue as guest</p>
    </div>
  </ComponentExample>
</template>

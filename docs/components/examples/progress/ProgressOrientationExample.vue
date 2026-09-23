<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg justify-items-center gap-3">
    <div class="grid justify-items-center gap-3">
      <span class="text-sm">Vertical</span>
      <div class="h-40">
        <Progress :value="68" orientation="vertical" aria-label="Vertical progress" />
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Orientation"
    description="Set orientation to vertical and give the container a height to size the bar."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg justify-items-center gap-3">
      <div class="grid justify-items-center gap-3">
        <span class="text-sm">Vertical</span>
        <div class="h-40">
          <Progress :value="68" orientation="vertical" aria-label="Vertical progress" />
        </div>
      </div>
    </div>
  </ComponentExample>
</template>

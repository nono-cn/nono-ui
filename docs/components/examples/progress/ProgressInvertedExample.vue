<script setup lang="ts">
import { Progress } from '@/components/ui/Progress'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const code = `<script setup lang="ts">
import { Progress } from '__DOCS_PACKAGE__/components/ui/Progress'
${scriptEnd}

<template>
  <div class="grid w-full max-w-lg gap-6">
    <div class="grid gap-3">
      <span class="font-medium">Horizontal</span>
      <div class="grid gap-5">
        <div class="grid gap-2">
          <span class="text-sm">Inverted</span>
          <Progress :value="32" inverted aria-label="Horizontal inverted progress" />
        </div>
      </div>
    </div>
    <div class="grid gap-3">
      <span class="font-medium">Vertical</span>
      <div class="flex items-end gap-8">
        <div class="grid justify-items-center gap-2">
          <span class="text-sm">Inverted</span>
          <div class="h-32">
            <Progress
              :value="32"
              orientation="vertical"
              inverted
              aria-label="Vertical inverted progress"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Inverted"
    description="Compare inverted progress in horizontal and vertical orientations."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-lg gap-6">
      <div class="grid gap-3">
        <span class="font-medium">Horizontal</span>
        <div class="grid gap-5">
          <div class="grid gap-2">
            <span class="text-sm">Inverted</span>
            <Progress :value="32" inverted aria-label="Horizontal inverted progress" />
          </div>
        </div>
      </div>
      <div class="grid gap-3">
        <span class="font-medium">Vertical</span>
        <div class="flex items-end gap-8">
          <div class="grid justify-items-center gap-2">
            <span class="text-sm">Inverted</span>
            <div class="h-32">
              <Progress
                :value="32"
                orientation="vertical"
                inverted
                aria-label="Vertical inverted progress"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ComponentExample>
</template>

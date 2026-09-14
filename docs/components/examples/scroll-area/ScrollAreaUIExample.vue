<script setup lang="ts">
import { ScrollArea } from '@/components/ui/ScrollArea'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const ui = {
  viewport: () => ({ class: 'bg-primary/5' }),
  verticalScrollbar: () => ({ class: 'w-3 rounded-full bg-primary/20' }),
  horizontalScrollbar: () => ({ class: 'h-3 rounded-full bg-primary/20' }),
  thumbVertical: () => ({ class: 'rounded-full bg-primary' }),
  thumbHorizontal: () => ({ class: 'rounded-full bg-primary' }),
  corner: () => ({ class: 'bg-primary/30' }),
}

const code = `<script setup lang="ts">
import { ScrollArea } from '@nono-cn/nono-ui/components/ui/ScrollArea'

const ui = {
  viewport: () => ({ class: 'bg-primary/5' }),
  verticalScrollbar: () => ({ class: 'w-3 rounded-full bg-primary/20' }),
  horizontalScrollbar: () => ({ class: 'h-3 rounded-full bg-primary/20' }),
  thumbVertical: () => ({ class: 'rounded-full bg-primary' }),
  thumbHorizontal: () => ({ class: 'rounded-full bg-primary' }),
  corner: () => ({ class: 'bg-primary/30' }),
}
${scriptEnd}

<template>
  <div class="grid w-full max-w-xl gap-2">
    <div class="flex items-center justify-between text-xs text-muted-foreground">
      <span>16 paneles · overflow en ambos ejes</span>
      <code class="rounded bg-muted px-1.5 py-0.5">ui</code>
    </div>
    <ScrollArea
      type="always"
      orientation="both"
      force-mount
      :ui="ui"
      class="h-56 w-full min-w-0 rounded-md border"
    >
      <div class="grid h-[40rem] w-[72rem] grid-cols-4 gap-3 p-4">
        <div
          v-for="index in 16"
          :key="index"
          class="flex items-center rounded-md border bg-card p-3 text-sm"
        >
          Panel {{ index }}
        </div>
      </div>
    </ScrollArea>
    <p class="text-xs text-muted-foreground">
      La barra y el thumb azules proceden de los resolvers definidos en ui.
    </p>
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="UI"
    description="Personaliza cada parte interna y comprueba el resultado en un área con dos ejes de scroll."
    :code="code"
    :show-reset="false"
  >
    <div class="grid w-full max-w-xl gap-2">
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>16 paneles · overflow en ambos ejes</span>
        <code class="rounded bg-muted px-1.5 py-0.5">ui</code>
      </div>
      <ScrollArea
        type="always"
        orientation="both"
        force-mount
        :ui="ui"
        class="h-56 w-full min-w-0 rounded-md border"
      >
        <div class="grid h-[40rem] w-[72rem] grid-cols-4 gap-3 p-4">
          <div
            v-for="index in 16"
            :key="index"
            class="flex items-center rounded-md border bg-card p-3 text-sm"
          >
            Panel {{ index }}
          </div>
        </div>
      </ScrollArea>
      <p class="text-xs text-muted-foreground">
        La barra y el thumb azules proceden de los resolvers definidos en ui.
      </p>
    </div>
  </ComponentExample>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const open = ref(false)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'
import { Dialog } from '__DOCS_PACKAGE__/components/ui/Dialog'

const open = ref(false)
${scriptEnd}

<template>
  <div class="flex items-center gap-3">
    <Dialog v-model:open="open" label="Controlled dialog" description="The parent owns this state.">
      <Button label="Open dialog" variant="outline" />
      <template #content><p>Close this dialog from its footer or the button outside.</p></template>
      <template #footer="{ close }"><Button label="Close" @click="close" /></template>
    </Dialog>
    <Button v-if="open" label="Close externally" variant="ghost" @click="open = false" />
  </div>
</template>`
</script>

<template>
  <ComponentExample
    title="Controlled state"
    description="Bind open state to a ref and update it from outside the dialog."
    :code="code"
    :show-reset="false"
  >
    <div class="flex items-center gap-3">
      <Dialog
        v-model:open="open"
        label="Controlled dialog"
        description="The parent owns this state."
      >
        <Button label="Open dialog" variant="outline" />
        <template #content
          ><p>Close this dialog from its footer or the button outside.</p></template
        >
        <template #footer="{ close }"><Button label="Close" @click="close" /></template>
      </Dialog>
      <Button v-if="open" label="Close externally" variant="ghost" @click="open = false" />
    </div>
  </ComponentExample>
</template>

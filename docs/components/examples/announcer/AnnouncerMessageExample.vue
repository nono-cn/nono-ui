<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@/components/ui/Announcer'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const message = ref('Your changes have been saved.')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'

const message = ref(${JSON.stringify(message.value)})
${scriptEnd}

<template>
  <Announcer :message="message" />
</template>`,
)

function reset() {
  message.value = 'Your changes have been saved.'
}
</script>

<template>
  <ComponentExample
    title="Message"
    description="Edit the message announced to screen readers."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-lg">
        <ExampleTextInputControl
          v-model="message"
          label="Message"
          placeholder="Announcement message"
        />
      </div>
    </template>
    <div class="grid gap-2 text-sm">
      <Announcer :message="message" />
      <p><span class="font-medium">Announcement:</span> {{ message }}</p>
      <p class="text-xs text-muted-foreground">The live region is visually hidden.</p>
    </div>
  </ComponentExample>
</template>

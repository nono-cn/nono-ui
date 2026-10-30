<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, type MessageUI } from '@/components/ui/Message'
import ExampleCheckboxControl from '../../controls/ExampleCheckboxControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const italic = ref(true)
const ui = computed<MessageUI>(() => ({
  footer: () => ({ class: italic.value ? 'italic' : '' }),
}))
const code = computed(
  () => `<script setup lang="ts">
import { Message, type MessageUI } from '__DOCS_PACKAGE__/components/ui/Message'

const ui: MessageUI = {
  footer: () => ({ class: '${italic.value ? 'italic' : ''}' }),
}
${scriptEnd}

<template>
  <div class="flex flex-col gap-4">
    <Message message="Received message.">
      <template #footer>10:24</template>
    </Message>
    <Message :ui="ui" align="end" message="Sent message.">
      <template #footer>Read · 10:25</template>
    </Message>
  </div>
</template>`,
)

function reset() {
  italic.value = true
}
</script>

<template>
  <ComponentExample
    title="UI resolver"
    description="Add attributes and classes to the content, header and footer."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleCheckboxControl v-model="italic" label="Italic footer on sent messages" />
    </template>
    <div class="flex w-full max-w-xl flex-col gap-4">
      <Message message="Received message.">
        <template #footer>10:24</template>
      </Message>
      <Message :ui="ui" align="end" message="Sent message.">
        <template #footer>Read · 10:25</template>
      </Message>
    </div>
  </ComponentExample>
</template>

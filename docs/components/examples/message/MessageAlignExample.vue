<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, messageAligns, messageDefaults, type MessageAlign } from '@/components/ui/Message'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const align = ref<MessageAlign>(messageDefaults.align)
const avatar = { label: 'AL' }
const code = computed(
  () => `<script setup lang="ts">
import { Message } from '__DOCS_PACKAGE__/components/ui/Message'

const avatar = ${JSON.stringify(avatar)}
${scriptEnd}

<template>
  <Message align="${align.value}" :avatar="avatar" message="The avatar and the bubble follow the alignment." />
</template>`,
)

function reset() {
  align.value = messageDefaults.align
}
</script>

<template>
  <ComponentExample
    title="Align"
    description="Place the message at the start or end; end puts the avatar on the other side."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <ExampleSelectControl v-model="align" label="Align" :options="messageAligns" />
    </template>
    <div class="w-full max-w-xl">
      <Message
        :align="align"
        :avatar="avatar"
        message="The avatar and the bubble follow the alignment."
      />
    </div>
  </ComponentExample>
</template>

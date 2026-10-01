<script setup lang="ts">
import { computed, ref } from 'vue'
import { Announcer } from '@/components/ui/Announcer'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const message = ref('Sync complete.')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { Announcer } from '__DOCS_PACKAGE__/components/ui/Announcer'

const message = ref(${JSON.stringify(message.value)})
${scriptEnd}

<template>
  <Announcer>
    <strong>{{ message }}</strong>
  </Announcer>
</template>`,
)

function reset() {
  message.value = 'Sync complete.'
}
</script>

<template>
  <ComponentExample
    title="Custom content"
    description="Use the default slot to announce formatted content."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex w-full max-w-lg">
        <ExampleTextInputControl
          v-model="message"
          label="Message"
          placeholder="Announcement content"
        />
      </div>
    </template>
    <div class="grid gap-2 text-sm">
      <Announcer>
        <strong>{{ message }}</strong>
      </Announcer>
      <p class="text-xs text-muted-foreground">
        Slot content is visible in the page and replaces the <code>message</code> prop.
      </p>
    </div>
  </ComponentExample>
</template>

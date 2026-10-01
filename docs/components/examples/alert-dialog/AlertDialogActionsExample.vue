<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { themeColors } from '@/components/ui/constants'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const actionLabel = ref('Publish')
const cancelLabel = ref('Review')
const actionColor = ref<(typeof themeColors)[number]>('success')
const code = computed(
  () => `<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '__DOCS_PACKAGE__/components/ui/AlertDialog'
import { Button } from '__DOCS_PACKAGE__/components/ui/Button'

const actionLabel = ref(${JSON.stringify(actionLabel.value)})
const cancelLabel = ref(${JSON.stringify(cancelLabel.value)})
const actionColor = ref('${actionColor.value}' as const)
${scriptEnd}

<template>
  <AlertDialog
    label="Publish changes"
    description="These changes will be available to everyone."
    :action-button="{ label: actionLabel, color: actionColor }"
    :cancel-button="{ label: cancelLabel, variant: 'outline' }"
  >
    <Button label="Publish" />
  </AlertDialog>
</template>`,
)

function reset() {
  actionLabel.value = 'Publish'
  cancelLabel.value = 'Review'
  actionColor.value = 'success'
}
</script>

<template>
  <ComponentExample
    title="Custom Actions"
    description="Customize the labels and appearance of the action and cancel buttons."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap gap-4">
        <ExampleTextInputControl v-model="actionLabel" label="Action label" />
        <ExampleTextInputControl v-model="cancelLabel" label="Cancel label" />
        <ExampleSelectControl v-model="actionColor" label="Action color" :options="themeColors" />
      </div>
    </template>
    <AlertDialog
      label="Publish changes"
      description="These changes will be available to everyone."
      :action-button="{ label: actionLabel, color: actionColor }"
      :cancel-button="{ label: cancelLabel, variant: 'outline' }"
    >
      <Button label="Publish" />
    </AlertDialog>
  </ComponentExample>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BubbleSeverity, BubbleVariant } from '@/components/ui/Bubble'
import { Message, type BubbleConfig } from '@/components/ui/Message'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const initialVariant: BubbleVariant = 'soft'
const initialSeverity: BubbleSeverity = 'primary'
const variant = ref<BubbleVariant>(initialVariant)
const severity = ref<BubbleSeverity>(initialSeverity)
const bubble = computed<BubbleConfig>(() => ({ variant: variant.value, severity: severity.value }))
const variants: BubbleVariant[] = ['solid', 'outline', 'plain', 'subtle', 'soft', 'muted']
const severities: BubbleSeverity[] = ['primary', 'secondary', 'warning', 'success', 'error']

const code = computed(
  () => `<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, type BubbleConfig } from '@nono-cn/nono-ui/components/ui/Message'
import type { BubbleSeverity, BubbleVariant } from '@nono-cn/nono-ui/components/ui/Bubble'

const variant = ref<BubbleVariant>('${variant.value}')
const severity = ref<BubbleSeverity>('${severity.value}')
const bubble = computed<BubbleConfig>(() => ({
  variant: variant.value,
  severity: severity.value,
}))
${scriptEnd}

<template>
  <Message
    message="La configuración de Bubble se aplica al mensaje."
    :bubble="bubble"
    class="w-full max-w-md"
  />
</template>`,
)

function reset() {
  variant.value = initialVariant
  severity.value = initialSeverity
}
</script>

<template>
  <ComponentExample
    title="Bubble"
    description="Configura la variante y la severidad de la burbuja anidada."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="grid gap-1.5 text-xs font-medium" for="message-bubble-variant">
          variant
          <select
            id="message-bubble-variant"
            v-model="variant"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option v-for="item in variants" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label class="grid gap-1.5 text-xs font-medium" for="message-bubble-severity">
          severity
          <select
            id="message-bubble-severity"
            v-model="severity"
            class="h-9 rounded-md border bg-background px-3 text-sm font-normal"
          >
            <option v-for="item in severities" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
      </div>
    </template>
    <Message
      message="La configuración de Bubble se aplica al mensaje."
      :bubble="bubble"
      class="w-full max-w-md"
    />
  </ComponentExample>
</template>

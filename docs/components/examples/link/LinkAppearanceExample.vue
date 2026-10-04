<script setup lang="ts">
import { computed, ref } from 'vue'
import { Link, linkDefaults, type LinkSize, type LinkVariant } from '@/components/ui/Link'
import { buttonSizes, buttonVariantNames } from '@/components/ui/Button'
import ExampleSelectControl from '../../controls/ExampleSelectControl.vue'
import ExampleTextInputControl from '../../controls/ExampleTextInputControl.vue'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const variant = ref<LinkVariant>(linkDefaults.variant)
const size = ref<LinkSize>(linkDefaults.size)
const color = ref(linkDefaults.color)
const radius = ref<string>(linkDefaults.radius)
const code = computed(
  () => `<script setup lang="ts">
import { Link } from '__DOCS_PACKAGE__/components/ui/Link'

const radius = ${JSON.stringify(radius.value)}
${scriptEnd}

<template>
  <Link
    to="/components/button"
    label="Explore Button"
    variant="${variant.value}"
    size="${size.value}"
    color="${color.value}"
    :radius="radius"
  />
</template>`,
)

function reset() {
  variant.value = linkDefaults.variant
  size.value = linkDefaults.size
  color.value = linkDefaults.color
  radius.value = linkDefaults.radius
}
</script>

<template>
  <ComponentExample
    title="Appearance"
    description="Set the Button props inherited by Link. Its default variant is link."
    :code="code"
    @reset="reset"
  >
    <template #controls>
      <div class="flex flex-wrap items-end gap-4">
        <ExampleSelectControl v-model="variant" label="Variant" :options="buttonVariantNames" />
        <ExampleSelectControl v-model="size" label="Size" :options="buttonSizes" />
        <ExampleSelectControl
          v-model="color"
          label="Color"
          :options="['primary', 'secondary', 'neutral']"
        />
        <ExampleTextInputControl v-model="radius" label="Radius" placeholder="md, full, 12px…" />
      </div>
    </template>
    <Link
      to="/components/button"
      label="Explore Button"
      :variant="variant"
      :size="size"
      :color="color"
      :radius="radius"
    />
  </ComponentExample>
</template>

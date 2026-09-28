<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '@/components/ui/Rating'
import { Icon } from '@/components/ui/Icon'
import ComponentExample from '../ComponentExample.vue'
import { scriptEnd } from '../example-code'

const rating = ref(3)

const code = `<script setup lang="ts">
import { ref } from 'vue'
import { Rating } from '__DOCS_PACKAGE__/components/ui/Rating'
import { Icon } from '__DOCS_PACKAGE__/components/ui/Icon'

const rating = ref(3)
${scriptEnd}

<template>
  <Rating v-model="rating" aria-label="Rating">
    <template #item="{ item, percentage, iconClass }">
      <Icon :name="item === 5 ? 'heart' : 'star'" :class="iconClass" :data-percentage="percentage" />
    </template>
  </Rating>
</template>`
</script>

<template>
  <ComponentExample
    title="Item slot"
    description="Customize the icon for each rating item."
    :code="code"
    :show-reset="false"
  >
    <Rating v-model="rating" aria-label="Rating">
      <template #item="{ item, percentage, iconClass }">
        <Icon
          :name="item === 5 ? 'heart' : 'star'"
          :class="iconClass"
          :data-percentage="percentage"
        />
      </template>
    </Rating>
  </ComponentExample>
</template>

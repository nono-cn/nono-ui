<script setup lang="ts">
import RatingItem from './anatomy/RatingItem.vue'
import RatingItemIndicator from './anatomy/RatingItemIndicator.vue'
import RatingRoot from './anatomy/RatingRoot.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <RatingRoot v-bind="$attrs" v-slot="{ items }">
    <RatingItem v-for="item in items" :key="item" :item="item" v-slot="{ steps }">
      <RatingItemIndicator v-for="step in steps" :key="step" :step="step" />
    </RatingItem>
  </RatingRoot>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  min?: number
  max?: number
}>()

const model = defineModel<number>({ required: true })
</script>

<template>
  <label class="grid w-44 gap-1.5 text-sm font-medium">
    <span>{{ label }}</span>
    <input
      v-model.number="model"
      type="number"
      :min="min"
      :max="max"
      class="h-9 w-full rounded-md border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
  </label>
</template>

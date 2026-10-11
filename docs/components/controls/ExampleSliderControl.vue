<script setup lang="ts">
defineProps<{
  label: string
  min: number
  max: number
}>()

const model = defineModel<number>({ required: true })
</script>

<template>
  <label class="grid w-44 gap-1.5 text-sm font-medium">
    <span>{{ label }}: {{ model }}%</span>
    <input
      v-model.number="model"
      type="range"
      :min="min"
      :max="max"
      class="h-9 w-full accent-primary"
    />
  </label>
</template>

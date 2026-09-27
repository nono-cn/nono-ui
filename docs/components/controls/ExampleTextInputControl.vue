<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="grid min-w-44 flex-1 gap-1.5 text-sm font-medium">
    <span>{{ label }}</span>
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="h-9 min-w-0 rounded-md border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
  </label>
</template>

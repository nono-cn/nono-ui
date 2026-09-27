<script setup lang="ts">
defineProps<{
  label: string
  options: readonly string[]
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="grid gap-1.5 text-sm font-medium">
    <span>{{ label }}</span>
    <select
      v-model="model"
      class="h-9 min-w-36 rounded-md border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

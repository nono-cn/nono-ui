<script setup lang="ts">
defineProps<{ label: string }>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="grid gap-1.5 text-sm font-medium">
    <span>{{ label }}</span>
    <input
      v-model="model"
      type="color"
      class="h-9 w-16 cursor-pointer rounded-md border bg-background p-1"
    />
  </label>
</template>

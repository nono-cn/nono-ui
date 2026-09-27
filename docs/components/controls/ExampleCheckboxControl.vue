<script setup lang="ts">
defineProps<{ label: string }>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="flex min-h-9 items-center gap-2 text-sm font-medium">
    <input
      v-model="model"
      type="checkbox"
      class="size-4 rounded border-input accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
const model = defineModel<string>({ required: true })
</script>
<template>
  <label class="playground-control"
    ><span>{{ label }}</span
    ><input v-model="model" type="color"
  /></label>
</template>

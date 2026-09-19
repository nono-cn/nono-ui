<script setup lang="ts">
defineProps<{ label: string }>()
const model = defineModel<boolean>({ required: true })
</script>
<template>
  <label class="playground-control playground-control-checkbox"
    ><input v-model="model" type="checkbox" /><span>{{ label }}</span></label
  >
</template>

<script setup lang="ts">
import { computed, mergeProps, useAttrs, useSlots } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/Button'
import type { LinkEmits, LinkProps, LinkSlots } from '.'
import { linkDefaults } from './constants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), linkDefaults)
const emit = defineEmits<LinkEmits>()
defineSlots<LinkSlots>()

const attrs = useAttrs()
const slots = useSlots()
const slotNames = Object.keys(slots) as (keyof LinkSlots)[]

const isExternal = computed(
  () => typeof props.to === 'string' && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(props.to),
)
const isRouterLink = computed(() => props.to !== undefined && !isExternal.value)
const externalHref = computed(() => (typeof props.to === 'string' ? props.to : undefined))
const buttonProps = computed(() => {
  const { to, replace, ...propsForButton } = props
  void to
  void replace

  return propsForButton
})
const rootProps = computed(() => {
  return mergeProps(attrs, {
    ...buttonProps.value,
    as: props.to === undefined ? 'div' : ('a' as const),
    asChild: false,
    loading: false,
    'data-test-link-root': '',
  })
})

type Navigate = (event?: MouseEvent) => void | Promise<void>

function handleClick(event: PointerEvent, navigate?: Navigate) {
  emit('click', event)
  void navigate?.(event)
}
</script>

<template>
  <Button
    v-if="!isRouterLink"
    v-bind="rootProps"
    :href="externalHref"
    @click="emit('click', $event)"
  >
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </Button>

  <RouterLink v-else v-slot="{ href, navigate }" :to="props.to!" :replace="props.replace" custom>
    <Button v-bind="rootProps" :href="href" @click="handleClick($event, navigate)">
      <template v-for="slotName in slotNames" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Button>
  </RouterLink>
</template>

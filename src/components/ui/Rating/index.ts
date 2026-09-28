import type { RatingRootProps } from 'reka-ui'

export { default as Rating } from './Rating.vue'

export type RatingProps = Pick<
  RatingRootProps,
  'modelValue' | 'length' | 'clearable' | 'hoverable' | 'loop' | 'disabled'
>

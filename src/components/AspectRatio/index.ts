export { default as AspectRatio } from './AspectRatio.vue'
export { aspectRatioDefaults } from './constants'

export type AspectRatioRatio = number

export interface AspectRatioProps {
  ratio?: AspectRatioRatio
}

export interface AspectRatioSlots {
  default?(): unknown
}

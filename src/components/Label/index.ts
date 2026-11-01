import { cva } from 'class-variance-authority'
import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'
export { labelDefaults } from './constants'

export const labelVariants = cva(
  'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
)

export type LabelRootProps = Pick<LabelPropsReka, 'for'>

export type LabelProps = LabelRootProps

export interface LabelSlots {
  default?(): unknown
}

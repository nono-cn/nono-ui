import { cva } from 'class-variance-authority'
import { announcerDefaults, announcerPolitenessOptions } from './constants'

export type AnnouncerPoliteness = (typeof announcerPolitenessOptions)[number]

export { default as Announcer } from './Announcer.vue'
export { announcerDefaults, announcerPolitenessOptions } from './constants'

export const announcerVariants = cva('', {
  variants: {
    visible: {
      true: '',
      false: 'sr-only',
    },
  },
  defaultVariants: {
    visible: announcerDefaults.visible,
  },
})

// Props
export interface AnnouncerProps {
  atomic?: boolean
  message?: string
  politeness?: AnnouncerPoliteness
  visible?: boolean
}

// Slots
export interface AnnouncerSlots {
  default?(): unknown
}

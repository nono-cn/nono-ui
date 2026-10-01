import { announcerPolitenessOptions } from './constants'

export type AnnouncerPoliteness = (typeof announcerPolitenessOptions)[number]

export { default as Announcer } from './Announcer.vue'
export { announcerDefaults, announcerPolitenessOptions } from './constants'

// Props
export interface AnnouncerProps {
  atomic?: boolean
  message?: string
  politeness?: AnnouncerPoliteness
}

// Slots
export interface AnnouncerSlots {
  default?(): unknown
}

import type { NeutralColor } from '../../../types/theme'

export { default as App } from './App.vue'
export { appDefaults } from './constants'
export { neutralColors, type NeutralColor } from '../../../types/theme'

// Props
export interface AppProps {
  neutral?: NeutralColor
}

// Slots
export interface AppSlots {
  default?(): unknown
}

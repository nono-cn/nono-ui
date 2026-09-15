import announcer from './components/announcer'
import accordion from './components/accordion'
import alert from './components/alert'
import alertDialog from './components/alert-dialog'
import attachment from './components/attachment'
import aspectRatio from './components/aspect-ratio'
import avatar from './components/avatar'
import badge from './components/badge'
import button from './components/button'
import buttonGroup from './components/button-group'
import bubble from './components/bubble'
import chip from './components/chip'
import empty from './components/empty'
import label from './components/label'
import card from './components/card'
import icon from './components/icon'
import kbd from './components/kbd'
import marker from './components/marker'
import message from './components/message'
import popover from './components/popover'
import progress from './components/progress'
import ribbon from './components/ribbon'
import scrollArea from './components/scroll-area'
import separator from './components/separator'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [
  accordion,
  announcer,
  alert,
  alertDialog,
  attachment,
  aspectRatio,
  avatar,
  badge,
  button,
  buttonGroup,
  bubble,
  chip,
  empty,
  label,
  card,
  icon,
  kbd,
  marker,
  message,
  popover,
  progress,
  ribbon,
  scrollArea,
  separator,
] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

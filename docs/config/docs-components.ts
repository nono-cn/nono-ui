import accordion from './components/accordion'
import alert from './components/alert'
import alertDialog from './components/alert-dialog'
import announcer from './components/announcer'
import attachment from './components/attachment'
import aspectRatio from './components/aspect-ratio'
import avatar from './components/avatar'
import badge from './components/badge'
import bubble from './components/bubble'
import button from './components/button'
import buttonGroup from './components/button-group'
import card from './components/card'
import checkboxConfig from './components/checkbox'
import chip from './components/chip'
import empty from './components/empty'
import fieldSet from './components/field-set'
import icon from './components/icon'
import kbd from './components/kbd'
import label from './components/label'
import loading from './components/loading'
import marker from './components/marker'
import masonry from './components/masonry'
import message from './components/message'
import popover from './components/popover'
import progress from './components/progress'
import ribbon from './components/ribbon'
import scrollArea from './components/scroll-area'
import search from './components/search'
import slider from './components/slider'
import separator from './components/separator'
import splitter from './components/splitter'
import switchConfig from './components/switch'
import textarea from './components/textarea'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [
  accordion,
  alert,
  alertDialog,
  announcer,
  attachment,
  aspectRatio,
  avatar,
  badge,
  bubble,
  button,
  buttonGroup,
  card,
  checkboxConfig,
  chip,
  empty,
  fieldSet,
  icon,
  kbd,
  label,
  loading,
  marker,
  masonry,
  message,
  popover,
  progress,
  ribbon,
  scrollArea,
  search,
  slider,
  separator,
  splitter,
  switchConfig,
  textarea,
] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

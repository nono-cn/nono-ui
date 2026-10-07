import accordion from './components/accordion'
import alert from './components/alert'
import alertDialog from './components/alert-dialog'
import announcer from './components/announcer'
import attachment from './components/attachment'
import aspectRatio from './components/aspect-ratio'
import avatar from './components/avatar'
import badge from './components/badge'
import breadcrumb from './components/breadcrumb'
import bubble from './components/bubble'
import button from './components/button'
import buttonGroup from './components/button-group'
import card from './components/card'
import checkboxConfig from './components/checkbox'
import chip from './components/chip'
import collapsible from './components/collapsible'
import colorArea from './components/color-area'
import dialog from './components/dialog'
import empty from './components/empty'
import field from './components/field'
import fieldSet from './components/field-set'
import hoverCard from './components/hover-card'
import icon from './components/icon'
import iconTile from './components/icon-tile'
import input from './components/input'
import kbd from './components/kbd'
import kbdGroup from './components/kbd-group'
import label from './components/label'
import link from './components/link'
import linearChart from './components/linear-chart'
import loading from './components/loading'
import marker from './components/marker'
import masonry from './components/masonry'
import switchConfig from './components/switch'
import textarea from './components/textarea'
import toggleConfig from './components/toggle'
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
  breadcrumb,
  bubble,
  button,
  buttonGroup,
  card,
  checkboxConfig,
  chip,
  collapsible,
  colorArea,
  dialog,
  empty,
  field,
  fieldSet,
  hoverCard,
  icon,
  iconTile,
  input,
  kbd,
  kbdGroup,
  label,
  link,
  linearChart,
  loading,
  marker,
  masonry,
  switchConfig,
  textarea,
  toggleConfig,
] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

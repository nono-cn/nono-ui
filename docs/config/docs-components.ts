import announcer from './components/announcer'
import alert from './components/alert'
import attachment from './components/attachment'
import aspectRatio from './components/aspect-ratio'
import badge from './components/badge'
import button from './components/button'
import icon from './components/icon'
import kbd from './components/kbd'
import popover from './components/popover'
import ribbon from './components/ribbon'
import scrollArea from './components/scroll-area'
import separator from './components/separator'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [
  announcer,
  alert,
  attachment,
  aspectRatio,
  badge,
  button,
  icon,
  kbd,
  popover,
  ribbon,
  scrollArea,
  separator,
] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

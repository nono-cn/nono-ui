import alert from './components/alert'
import badge from './components/badge'
import button from './components/button'
import icon from './components/icon'
import kbd from './components/kbd'
import separator from './components/separator'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [
  alert,
  badge,
  button,
  icon,
  kbd,
  separator,
] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

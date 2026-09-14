import badge from './components/badge'
import icon from './components/icon'
import separator from './components/separator'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [badge, icon, separator] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

import icon from './components/icon'
import type { ComponentDocConfig } from './component-docs'

export type DocsComponent = Pick<ComponentDocConfig, 'slug' | 'title' | 'description'>

export const docsComponents = [icon] satisfies ComponentDocConfig[]

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
) as Record<string, ComponentDocConfig>

import type { Component } from 'vue'

export interface ApiTypePart {
  text: string
  link?: string
}

export interface ApiTableRow {
  name: string
  type: string
  typeLink?: string
  typeParts?: ApiTypePart[]
  typePre?: boolean
  default?: string
  description: string
  required?: boolean
}

export interface ApiTableConfig {
  id: string
  title: string
  rows: ApiTableRow[]
  description?: string
  typeLabel?: string
  showDefault?: boolean
}

export interface ComponentApiConfig {
  props: ApiTableRow[]
  configs?: ApiTableConfig[]
  emits: ApiTableRow[]
  slots: ApiTableRow[]
  expose: ApiTableRow[]
}

export interface ComponentExampleConfig {
  title: string
  description: string
  component: Component
}

export interface ComponentAccessibilityLink {
  label: string
  href: string
}

export interface ComponentAccessibilityConfig {
  title: string
  description: string
  links?: ComponentAccessibilityLink[]
}

export interface ComponentDocConfig {
  slug: string
  title: string
  description: string
  importPath: string
  accessibility: ComponentAccessibilityConfig[]
  usage: ComponentExampleConfig[]
  examples: ComponentExampleConfig[]
  playground?: Component
  api: ComponentApiConfig
}

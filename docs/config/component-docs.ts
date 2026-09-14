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
  default?: string
  description: string
  required?: boolean
}

export interface ComponentApiConfig {
  props: ApiTableRow[]
  emits: ApiTableRow[]
  slots: ApiTableRow[]
  expose: ApiTableRow[]
}

export interface ComponentExampleConfig {
  title: string
  description: string
  component: Component
}

export interface ComponentDocConfig {
  slug: string
  title: string
  description: string
  importPath: string
  accessibility: ComponentExampleConfig[]
  usage: ComponentExampleConfig[]
  examples: ComponentExampleConfig[]
  api: ComponentApiConfig
}

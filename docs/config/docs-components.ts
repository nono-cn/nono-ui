export interface DocsComponent {
  slug: string
  title: string
  description: string
}

export const docsComponents: DocsComponent[] = [
  { slug: 'alert', title: 'Alert', description: 'Mensaje contextual para comunicar información.' },
  { slug: 'button', title: 'Button', description: 'Acción interactiva para la interfaz.' },
  { slug: 'icon', title: 'Icon', description: 'Icono consistente para la interfaz.' },
]

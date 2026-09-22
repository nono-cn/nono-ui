import type { ComponentDocConfig } from '../component-docs'
import SeparatorHorizontalExample from '../../components/examples/separator/SeparatorHorizontalExample.vue'
import SeparatorVerticalExample from '../../components/examples/separator/SeparatorVerticalExample.vue'

const separatorConfig: ComponentDocConfig = {
  slug: 'separator',
  title: 'Separator',
  description:
    'Divide visualmente el contenido y comunica separaciones semánticas cuando es necesario.',
  importPath: '@nono-ui/components/ui/Separator',
  usage: [
    {
      title: 'Uso básico',
      description: 'Separa secciones usando la orientación horizontal predeterminada.',
      component: SeparatorHorizontalExample,
    },
  ],
  examples: [
    {
      title: 'Separación vertical',
      description: 'Divide elementos colocados en una fila y ocupa la altura del contenedor.',
      component: SeparatorVerticalExample,
    },
  ],
  accessibility: [
    {
      title: 'Separadores decorativos y semánticos',
      description:
        'Los atributos HTML, class, style, data-* y ARIA se reenvían al elemento raíz. Usa decorative=false para exponer un separador semántico y aria-label solo cuando necesite contexto adicional. No dependas únicamente del color o del grosor para comunicar información.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Separator en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/separator#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Define si la línea divide el contenido horizontal o verticalmente.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'true',
        description:
          'Cuando es true, el separador se trata como contenido puramente visual y se excluye del árbol de accesibilidad.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido opcional renderizado dentro del elemento raíz del separador.',
      },
    ],
    expose: [],
  },
}

export default separatorConfig

import type { ComponentDocConfig } from '../component-docs'
import ButtonGroupPlaygroundExample from '../../components/examples/button-group/ButtonGroupPlaygroundExample.vue'

const buttonGroupConfig: ComponentDocConfig = {
  slug: 'button-group',
  title: 'ButtonGroup',
  description: 'Agrupa botones relacionados y adapta su unión, orientación y tamaño.',
  importPath: '@nono-cn/nono-ui/components/ui/ButtonGroup',
  playground: ButtonGroupPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Grupo de acciones',
      description:
        'ButtonGroup añade role="group" a su raíz. Usa etiquetas claras en cada botón y conserva el orden lógico de las acciones.',
    },
  ],
  api: {
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Dirección en la que se colocan los botones.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño aplicado a los botones descendientes.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Botones y contenido que se renderizan dentro del grupo.',
      },
    ],
    expose: [],
  },
}

export default buttonGroupConfig

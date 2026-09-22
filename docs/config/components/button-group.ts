import type { ComponentDocConfig } from '../component-docs'
import ButtonGroupBasicExample from '../../components/examples/button-group/ButtonGroupBasicExample.vue'
import ButtonGroupVerticalExample from '../../components/examples/button-group/ButtonGroupVerticalExample.vue'
import ButtonGroupSizesExample from '../../components/examples/button-group/ButtonGroupSizesExample.vue'

const buttonGroupConfig: ComponentDocConfig = {
  slug: 'button-group',
  title: 'ButtonGroup',
  description: 'Agrupa botones relacionados y adapta su unión, orientación y tamaño.',
  importPath: '@nono-cn/nono-ui/components/ui/ButtonGroup',
  usage: [
    {
      title: 'Grupo básico',
      description: 'Agrupa acciones relacionadas en una única unidad visual.',
      component: ButtonGroupBasicExample,
    },
  ],
  examples: [
    {
      title: 'Orientación vertical',
      description: 'Cambia la orientación cuando las acciones necesitan apilarse.',
      component: ButtonGroupVerticalExample,
    },
    {
      title: 'Tamaños',
      description: 'Aplica un tamaño común a todos los botones del grupo.',
      component: ButtonGroupSizesExample,
    },
  ],
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

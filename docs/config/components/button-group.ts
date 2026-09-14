import type { ComponentDocConfig } from '../component-docs'
import ButtonGroupUsageExample from '../../components/examples/button-group/ButtonGroupUsageExample.vue'
import ButtonGroupOrientationExample from '../../components/examples/button-group/ButtonGroupOrientationExample.vue'
import ButtonGroupSizeExample from '../../components/examples/button-group/ButtonGroupSizeExample.vue'

const buttonGroupConfig: ComponentDocConfig = {
  slug: 'button-group',
  title: 'ButtonGroup',
  description: 'Agrupa botones relacionados y adapta su unión, orientación y tamaño.',
  importPath: '@nono-cn/nono-ui/components/ui/ButtonGroup',
  usage: [
    {
      title: 'Uso básico',
      description: 'Agrupa acciones relacionadas en una misma unidad visual.',
      component: ButtonGroupUsageExample,
    },
  ],
  examples: [
    {
      title: 'Orientation',
      description: 'Muestra el grupo en horizontal o vertical.',
      component: ButtonGroupOrientationExample,
    },
    {
      title: 'Size',
      description: 'Aplica un tamaño común a todos los botones del grupo.',
      component: ButtonGroupSizeExample,
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

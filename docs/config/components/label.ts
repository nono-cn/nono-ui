import type { ComponentDocConfig } from '../component-docs'
import LabelForExample from '../../components/examples/label/LabelForExample.vue'
import LabelUsageExample from '../../components/examples/label/LabelUsageExample.vue'

const labelConfig: ComponentDocConfig = {
  slug: 'label',
  title: 'Label',
  description: 'Etiqueta accesible para identificar controles de formulario.',
  importPath: '@nono-cn/nono-ui/components/ui/Label',
  usage: [
    {
      title: 'Uso básico',
      description: 'Asocia una etiqueta visible con un control de formulario.',
      component: LabelUsageExample,
    },
  ],
  examples: [
    {
      title: 'For',
      description: 'Asocia la etiqueta con el id de un control.',
      component: LabelForExample,
    },
  ],
  accessibility: [
    {
      title: 'Asociación con controles',
      description:
        'Usa for con el mismo id del control para que las tecnologías de asistencia relacionen la etiqueta y el campo. Mantén un texto visible y descriptivo.',
    },
  ],
  api: {
    props: [
      {
        name: 'for',
        type: 'string',
        default: 'undefined',
        description: 'Id del control de formulario asociado.',
      },
    ],
    emits: [],
    slots: [{ name: 'default', type: '-', description: 'Texto o contenido de la etiqueta.' }],
    expose: [],
  },
}

export default labelConfig

import type { ComponentDocConfig } from '../component-docs'
import CardBasicExample from '../../components/examples/card/CardBasicExample.vue'
import CardActionExample from '../../components/examples/card/CardActionExample.vue'
import CardHeaderExample from '../../components/examples/card/CardHeaderExample.vue'

const cardConfig: ComponentDocConfig = {
  slug: 'card',
  title: 'Card',
  description:
    'Superficie con encabezado, contenido y pie opcionales para agrupar información relacionada.',
  importPath: '@nono-ui/components/ui/Card',
  usage: [
    {
      title: 'Card básica',
      description: 'Usa label y description para crear el encabezado automáticamente.',
      component: CardBasicExample,
    },
  ],
  examples: [
    {
      title: 'Acción y pie',
      description: 'Añade acciones en el encabezado y contenido complementario en el pie.',
      component: CardActionExample,
    },
    {
      title: 'Encabezado personalizado',
      description: 'Sustituye el encabezado generado con el slot header.',
      component: CardHeaderExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido y encabezados',
      description:
        'Usa label para generar un encabezado h3 o proporciona un encabezado semántico mediante el slot header. Mantén un orden lógico de lectura entre el encabezado, el contenido y el pie.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Texto del encabezado de la card.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Texto descriptivo mostrado bajo el encabezado.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  action?: () => HTMLAttributes
  content?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers para personalizar los atributos de las regiones de la card.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Contenido principal de la card.' },
      { name: 'header', type: '-', description: 'Sustituye el contenido completo del encabezado.' },
      { name: 'label', type: '-', description: 'Contenido del encabezado.' },
      { name: 'description', type: '-', description: 'Contenido descriptivo del encabezado.' },
      { name: 'action', type: '-', description: 'Acción situada en el encabezado.' },
      { name: 'footer', type: '-', description: 'Contenido del pie de la card.' },
    ],
    expose: [],
  },
}

export default cardConfig

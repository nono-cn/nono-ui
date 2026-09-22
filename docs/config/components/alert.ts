import type { ComponentDocConfig } from '../component-docs'
import AlertPlaygroundExample from '../../components/examples/alert/AlertPlaygroundExample.vue'

const alertConfig: ComponentDocConfig = {
  slug: 'alert',
  title: 'Alert',
  description: 'Comunica información, estados y acciones importantes dentro de una interfaz.',
  importPath: '@nono-ui/components/ui/Alert',
  playground: AlertPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Alertas informativas y decorativas',
      description:
        'Alert usa role=alert por defecto. Usa decorative=true solo para contenido visual que no deba anunciarse, proporciona nombres accesibles a los iconos informativos y conserva un nombre claro en los cierres personalizados. No dependas únicamente del color para comunicar la severidad.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Título breve mostrado en la primera línea del alert.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Texto complementario mostrado debajo del label.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuración del icono mostrado al inicio cuando no se usa el slot icon.',
      },
      {
        name: 'closeButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuración del botón de cierre predeterminado. Solo se muestra cuando closable es true.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
        default: "'soft'",
        description: 'Tratamiento visual del alert.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severidad usada para elegir los colores del alert.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado aplicado al tratamiento visual del alert.',
      },
      {
        name: 'closable',
        type: 'boolean',
        default: 'false',
        description: 'Muestra el botón de cierre predeterminado o el slot close.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'false',
        description: 'Usa role=none en lugar de role=alert para contenido puramente visual.',
      },
      {
        name: 'ui',
        type: `{
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  closeButtonContainer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Objeto de resolvers para personalizar los atributos y clases de label, description y closeButtonContainer.',
      },
    ],
    emits: [
      {
        name: 'close',
        type: '[]',
        description: 'Se emite cuando el alert se cierra desde el botón o el slot close.',
      },
    ],
    slots: [
      {
        name: 'icon',
        type: '-',
        description: 'Contenido mostrado al inicio; sustituye el fallback de icon.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Contenido del título; sustituye el fallback de label.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Contenido descriptivo; sustituye el fallback de description.',
      },
      {
        name: 'close',
        type: '{ close: () => void }',
        description:
          'Contenido del cierre. Recibe la función close para ocultar el alert y emitir close.',
      },
    ],
    expose: [],
  },
}

export default alertConfig

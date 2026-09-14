import type { ComponentDocConfig } from '../component-docs'
import AlertDialogButtonsExample from '../../components/examples/alert-dialog/AlertDialogButtonsExample.vue'
import AlertDialogFooterExample from '../../components/examples/alert-dialog/AlertDialogFooterExample.vue'
import AlertDialogIconExample from '../../components/examples/alert-dialog/AlertDialogIconExample.vue'
import AlertDialogOpenExample from '../../components/examples/alert-dialog/AlertDialogOpenExample.vue'
import AlertDialogOptionsExample from '../../components/examples/alert-dialog/AlertDialogOptionsExample.vue'
import AlertDialogSlotsExample from '../../components/examples/alert-dialog/AlertDialogSlotsExample.vue'
import AlertDialogUIExample from '../../components/examples/alert-dialog/AlertDialogUIExample.vue'
import AlertDialogUsageExample from '../../components/examples/alert-dialog/AlertDialogUsageExample.vue'

const alertDialogConfig: ComponentDocConfig = {
  slug: 'alert-dialog',
  title: 'AlertDialog',
  description: 'Solicita una confirmación explícita antes de ejecutar una acción importante.',
  importPath: '@nono-cn/nono-ui/components/ui/AlertDialog',
  usage: [
    {
      title: 'Uso básico',
      description:
        'Combina un disparador, un label, una descripción y las acciones de confirmación.',
      component: AlertDialogUsageExample,
    },
  ],
  examples: [
    {
      title: 'Open',
      description: 'Controla la visibilidad desde el componente padre con v-model:open.',
      component: AlertDialogOpenExample,
    },
    {
      title: 'Action y cancel',
      description: 'Personaliza las acciones predeterminadas con configuraciones de Button.',
      component: AlertDialogButtonsExample,
    },
    {
      title: 'Icon',
      description: 'Añade un icono al label usando IconConfig.',
      component: AlertDialogIconExample,
    },
    {
      title: 'Slots',
      description: 'Sustituye textos, contenido y acciones con los slots disponibles.',
      component: AlertDialogSlotsExample,
    },
    {
      title: 'Footer',
      description: 'Reemplaza por completo el pie y ciérralo con la función close del slot.',
      component: AlertDialogFooterExample,
    },
    {
      title: 'UI',
      description: 'Personaliza las partes internas con resolvers de atributos y clases.',
      component: AlertDialogUIExample,
    },
    {
      title: 'Mount y pointer events',
      description: 'Configura el montaje del contenido y la interacción exterior.',
      component: AlertDialogOptionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Confirmación y foco',
      description:
        'Usa AlertDialog para acciones que requieren una decisión explícita. El componente es modal, bloquea por defecto la interacción exterior, gestiona el foco y permite cerrar con Escape. Proporciona siempre un label descriptivo y una acción de cancelación clara.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Alert Dialog en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/alert-dialog#accessibility',
        },
      ],
    },
    {
      title: 'Nombres y acciones',
      description:
        'Cuando uses header, label o description personalizados, conserva AlertDialogTitle y AlertDialogDescription para mantener la relación semántica del diálogo. Los iconos decorativos deben llevar aria-hidden="true" y las acciones personalizadas deben conservar nombres visibles o accesibles claros. Los atributos arbitrarios, class, style y ARIA pasados al componente llegan a su raíz local.',
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Controla si el alert dialog está abierto. Se usa con v-model:open.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description:
          'Título del diálogo y nombre accesible principal cuando no se usa el slot label.',
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
        description: 'Icono mostrado al inicio del label cuando su configuración incluye name.',
      },
      {
        name: 'actionButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuración del Button de acción predeterminado. Su label viene de i18n (Continuar en español); los valores proporcionados sobrescriben ese fallback.',
      },
      {
        name: 'cancelButton',
        type: 'ButtonConfig',
        typeLink: '/components/button#button-config',
        default: 'undefined',
        description:
          'Configuración del Button de cancelación predeterminado. Usa variant outline, severity secondary y el label de i18n (Cancelar en español) por defecto.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: 'true',
        description:
          'Desmonta el contenido cuando el diálogo está cerrado; si es false, lo mantiene montado y oculto.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: 'undefined',
        description:
          'Fuerza el montaje del contenido para tener más control sobre su presencia y animaciones.',
      },
      {
        name: 'disableOutsidePointerEvents',
        type: 'boolean',
        default: 'true',
        description:
          'Bloquea los eventos de puntero fuera del contenido mientras el diálogo está abierto.',
      },
      {
        name: 'ui',
        type: `{
  trigger?: () => HTMLAttributes
  overlay?: () => HTMLAttributes
  content?: () => HTMLAttributes
  header?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  body?: () => HTMLAttributes
  footer?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description: 'Resolvers para personalizar los atributos y clases de las partes internas.',
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Se emite cuando cambia el estado abierto.',
      },
      {
        name: 'action',
        type: '[event: PointerEvent]',
        description: 'Se emite al activar la acción predeterminada o el slot action.',
      },
      {
        name: 'cancel',
        type: '[event: PointerEvent]',
        description: 'Se emite al activar la cancelación predeterminada o el slot cancel.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Elemento disparador que abre y cierra el alert dialog.',
      },
      {
        name: 'content',
        type: '-',
        description: 'Contenido adicional renderizado en el cuerpo desplazable del diálogo.',
      },
      {
        name: 'header',
        type: '-',
        description: 'Reemplaza el encabezado completo, incluidos label y description.',
      },
      {
        name: 'label',
        type: '-',
        description: 'Contenido del título; sustituye el fallback de label.',
      },
      {
        name: 'description',
        type: '-',
        description: 'Contenido de la descripción; sustituye el fallback de description.',
      },
      {
        name: 'footer',
        type: '{ close: () => void }',
        description: 'Reemplaza el pie completo. Recibe close para cerrar el diálogo.',
      },
      {
        name: 'action',
        type: '{ close: () => void }',
        description: 'Sustituye el botón de acción. Recibe close para cerrar el diálogo.',
      },
      {
        name: 'cancel',
        type: '{ close: () => void }',
        description: 'Sustituye el botón de cancelación. Recibe close para cerrar el diálogo.',
      },
    ],
    expose: [
      {
        name: 'close',
        type: '() => void',
        description: 'Cierra el alert dialog mediante la API expuesta del componente.',
      },
    ],
  },
}

export default alertDialogConfig

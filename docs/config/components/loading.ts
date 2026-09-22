import type { ComponentDocConfig } from '../component-docs'
import LoadingBasicExample from '../../components/examples/loading/LoadingBasicExample.vue'
import LoadingCustomExample from '../../components/examples/loading/LoadingCustomExample.vue'
import LoadingContentExample from '../../components/examples/loading/LoadingContentExample.vue'

const loadingConfig: ComponentDocConfig = {
  slug: 'loading',
  title: 'Loading',
  description:
    'Alterna entre un indicador de carga y el contenido cuando una operación cambia de estado.',
  importPath: '@nono-ui/components/ui/Loading',
  usage: [
    {
      title: 'Carga básica',
      description: 'Muestra el indicador predeterminado mientras una operación está en curso.',
      component: LoadingBasicExample,
    },
  ],
  examples: [
    {
      title: 'Loading personalizado',
      description: 'Sustituye el icono por defecto mediante el slot loading.',
      component: LoadingCustomExample,
    },
    {
      title: 'Contenido cargado',
      description: 'Muestra el contenido cuando la operación termina.',
      component: LoadingContentExample,
    },
  ],
  accessibility: [
    {
      title: 'Estado de carga accesible',
      description:
        'Loading renderiza role="status" y aria-busy en el elemento raíz. Mientras loading es true, usa aria-label para proporcionar un nombre específico; si no se indica, se utiliza la traducción de carga configurada. Cuando la carga termina, aria-label se elimina para que el contenido se exponga con su propio nombre accesible.',
    },
    {
      title: 'Contenido y spinner',
      description:
        'No dependas únicamente de la animación o del icono para comunicar el estado. Proporciona texto comprensible en el contenido o en el slot loading cuando sea necesario, y marca los iconos decorativos como ocultos para tecnologías de asistencia mediante su configuración correspondiente.',
    },
  ],
  api: {
    props: [
      {
        name: 'loading',
        type: 'boolean',
        default: 'true',
        description: 'Determina si se muestra el estado de carga o el contenido del slot default.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: "{ name: 'spinner' }",
        description:
          'Configuración del icono mostrado durante la carga cuando no se usa el slot loading.',
      },
      {
        name: 'ui',
        type: `{
  loading?: (context: LoadingContext) => HTMLAttributes
  content?: (context: LoadingContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  loading?: (context: ' },
          { text: 'LoadingContext', link: '#loading-context' },
          { text: ') => HTMLAttributes\n  content?: (context: ' },
          { text: 'LoadingContext', link: '#loading-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para personalizar los atributos y clases de los contenedores de carga y contenido.',
      },
    ],
    configs: [
      {
        id: 'loading-context',
        title: 'LoadingContext',
        description: 'Contexto disponible en los resolvers de ui y en los slots default y loading.',
        showDefault: false,
        rows: [
          {
            name: 'loading',
            type: 'boolean',
            description: 'Indica si el componente está mostrando el estado de carga.',
          },
        ],
      },
    ],
    emits: [],
    slots: [
      {
        name: 'loading',
        type: 'LoadingContext',
        typeLink: '#loading-context',
        description:
          'Contenido mostrado durante la carga. Recibe el contexto actual y sustituye el icono por defecto.',
      },
      {
        name: 'default',
        type: 'LoadingContext',
        typeLink: '#loading-context',
        description: 'Contenido mostrado cuando loading es false. Recibe el contexto actual.',
      },
    ],
    expose: [],
  },
}

export default loadingConfig

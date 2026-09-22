import type { ComponentDocConfig } from '../component-docs'
import SliderPlaygroundExample from '../../components/examples/slider/SliderPlaygroundExample.vue'

const sliderConfig: ComponentDocConfig = {
  slug: 'slider',
  title: 'Slider',
  description: 'Control deslizante accesible para seleccionar uno o varios valores numéricos.',
  importPath: '@nono-ui/components/ui/Slider',
  playground: SliderPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Etiquetas de los thumbs',
      description:
        'El slider etiqueta automáticamente los thumbs de un rango como mínimo y máximo. Para una configuración personalizada, proporciona aria-label mediante ui.thumb. Usa name y required cuando el valor forme parte de un formulario.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'number[] | null',
        default: '[0]',
        description: 'Valor controlado del slider. También puede enlazarse con v-model:value.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Deshabilita la interacción con todos los thumbs.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Define la orientación del slider.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Define el tamaño del track y de los thumbs.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado para el track, range y thumbs.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        description: 'Color semántico del slider.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description: 'Invierte la dirección del valor dentro del slider.',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'Valor mínimo permitido.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Valor máximo permitido.',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'Incremento entre valores permitidos.',
      },
      {
        name: 'minStepsBetweenThumbs',
        type: 'number',
        default: '0',
        description: 'Distancia mínima entre thumbs expresada en pasos.',
      },
      {
        name: 'thumbAlignment',
        type: "'contain' | 'overflow'",
        default: "'contain'",
        description: 'Determina cómo se alinea el thumb respecto a los extremos del track.',
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        description: 'Nombre usado al enviar el valor dentro de un formulario.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'undefined',
        description: 'Marca el control como requerido en un formulario.',
      },
      {
        name: 'ui',
        type: `{
  track?: (context: SliderContext) => HTMLAttributes
  range?: (context: SliderContext) => HTMLAttributes
  thumb?: (context: SliderThumbContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  track?: (context: ' },
          { text: 'SliderContext', link: '#slider-context' },
          { text: ') => HTMLAttributes\n  range?: (context: ' },
          { text: 'SliderContext', link: '#slider-context' },
          { text: ') => HTMLAttributes\n  thumb?: (context: ' },
          { text: 'SliderThumbContext', link: '#slider-thumb-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para personalizar los atributos y clases del track, range y thumbs.',
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: number[] | null]',
        description: 'Se emite cuando cambia el valor durante la interacción.',
      },
      {
        name: 'valueCommit',
        type: '[value: number[]]',
        description: 'Se emite cuando el usuario confirma el valor del slider.',
      },
    ],
    slots: [], /* removed custom slots */
    /*
      {
        name: 'thumb',
        type: 'SliderThumbContext',
        typeLink: '#slider-thumb-context',
        description: 'Añade contenido dentro de cada thumb y recibe su contexto.',
      },
    ], */
    expose: [],
    configs: [
      {
        id: 'slider-context',
        title: 'SliderContext',
        description: 'Contexto disponible en los resolvers de ui.',
        rows: [
          {
            name: 'values',
            type: 'number[]',
            description: 'Valores actuales de todos los thumbs.',
          },
        ],
      },
      {
        id: 'slider-thumb-context',
        title: 'SliderThumbContext',
        description: 'Contexto disponible en el resolver ui.thumb.',
        rows: [
          {
            name: 'values',
            type: 'number[]',
            description: 'Valores actuales de todos los thumbs.',
          },
          { name: 'index', type: 'number', description: 'Índice del thumb dentro del slider.' },
          { name: 'value', type: 'number', description: 'Valor del thumb actual.' },
          { name: 'first', type: 'boolean', description: 'Indica si es el primer thumb.' },
          { name: 'last', type: 'boolean', description: 'Indica si es el último thumb.' },
        ],
      },
    ],
  },
}

export default sliderConfig

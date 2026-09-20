import type { ComponentDocConfig } from '../component-docs'
import SplitterPlaygroundExample from '../../components/examples/splitter/SplitterPlaygroundExample.vue'

const splitterConfig: ComponentDocConfig = {
  slug: 'splitter',
  title: 'Splitter',
  description: 'Divide un espacio en paneles redimensionables mediante manejadores accesibles.',
  importPath: '@nono-cn/nono-ui/components/ui/Splitter',
  playground: SplitterPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Redimensionado por teclado',
      description:
        'Los manejadores reciben el foco y permiten ajustar el tamaño de los paneles con el teclado. Conserva el foco visible y no dependas únicamente del color para indicar el separador.',
    },
  ],
  api: {
    props: [
      { name: 'id', type: 'string', default: 'undefined', description: 'Identificador del grupo.' },
      {
        name: 'autoSaveId',
        type: 'string | null',
        default: 'null',
        description: 'Identificador usado para guardar y restaurar el layout en storage.',
      },
      {
        name: 'direction',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Orientación de los paneles.',
      },
      {
        name: 'keyboardResizeBy',
        type: 'number',
        default: '10',
        description: 'Porcentaje que cambia un panel en cada paso de teclado.',
      },
      {
        name: 'storage',
        type: 'Storage',
        default: 'undefined',
        description: 'Almacenamiento personalizado para el layout persistido.',
      },
      {
        name: 'hitAreaMargins',
        type: '{ mouse: number; touch: number }',
        default: 'undefined',
        description: 'Amplía el área interactiva de los manejadores.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: 'undefined',
        description: 'Tabindex de los manejadores.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'undefined',
        description: 'Deshabilita los manejadores.',
      },
      {
        name: 'nonce',
        type: 'string',
        default: 'undefined',
        description: 'Nonce aplicado a los manejadores.',
      },
      {
        name: 'items',
        type: 'SplitterItem[]',
        typeLink: '#splitter-item',
        default: '[]',
        description: 'Paneles que se renderizan y sus opciones de tamaño.',
      },
      {
        name: 'ui',
        type: `{
  panel?: (context: SplitterItemContext) => HTMLAttributes
  resizeHandle?: (context: SplitterItemContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  panel?: (context: ' },
          { text: 'SplitterItemContext', link: '#splitter-item-context' },
          { text: ') => HTMLAttributes\n  resizeHandle?: (context: ' },
          { text: 'SplitterItemContext', link: '#splitter-item-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description: 'Resolvers para añadir atributos y clases a paneles y manejadores.',
      },
    ],
    configs: [
      {
        id: 'splitter-item',
        title: 'SplitterItem',
        typeLabel: 'SplitterItem',
        rows: [
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Nombre para resolver slots dirigidos.',
          },
          {
            name: 'id',
            type: 'string',
            default: 'undefined',
            description: 'Identificador del panel.',
          },
          {
            name: 'collapsedSize',
            type: 'number',
            default: 'undefined',
            description: 'Tamaño del panel colapsado.',
          },
          {
            name: 'collapsible',
            type: 'boolean',
            default: 'undefined',
            description: 'Permite colapsar el panel.',
          },
          {
            name: 'defaultSize',
            type: 'number',
            default: 'undefined',
            description: 'Tamaño inicial del panel.',
          },
          {
            name: 'maxSize',
            type: 'number',
            default: 'undefined',
            description: 'Tamaño máximo del panel.',
          },
          {
            name: 'minSize',
            type: 'number',
            default: 'undefined',
            description: 'Tamaño mínimo del panel.',
          },
          { name: 'order', type: 'number', default: 'undefined', description: 'Orden del panel.' },
          {
            name: 'sizeUnit',
            type: "'%' | 'px'",
            default: 'undefined',
            description: 'Unidad de tamaño del panel.',
          },
          {
            name: 'class',
            type: 'string',
            default: 'undefined',
            description: 'Clase adicional del panel.',
          },
          {
            name: 'style',
            type: 'StyleValue',
            default: 'undefined',
            description: 'Estilos adicionales del panel.',
          },
        ],
      },
      {
        id: 'splitter-item-context',
        title: 'SplitterItemContext',
        description: 'Contexto disponible en los slots y resolvers de ui.',
        rows: [
          { name: 'layout', type: 'number[]', description: 'Tamaños actuales de los paneles.' },
          {
            name: 'item',
            type: 'SplitterItem',
            typeLink: '#splitter-item',
            description: 'Configuración del panel actual.',
          },
          { name: 'index', type: 'number', description: 'Índice del panel actual.' },
          { name: 'first', type: 'boolean', description: 'Indica si es el primer panel.' },
          { name: 'last', type: 'boolean', description: 'Indica si es el último panel.' },
          {
            name: 'nextItem',
            type: 'SplitterItem | undefined',
            typeLink: '#splitter-item',
            description: 'Configuración del panel siguiente, si existe.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'layout',
        type: '[layout: number[]]',
        description: 'Se emite cuando cambia el layout.',
      },
      { name: 'collapse', type: '[]', description: 'Se emite cuando un panel se colapsa.' },
      { name: 'expand', type: '[]', description: 'Se emite cuando un panel se expande.' },
      {
        name: 'resize',
        type: '[size: number, previousSize: number | undefined]',
        description: 'Se emite cuando cambia el tamaño de un panel.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Contenido de los paneles sin slot nombrado.',
      },
      {
        name: 'handle',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Contenido de los manejadores sin slot nombrado.',
      },
      {
        name: 'panel-{slot}',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Contenido del panel cuyo item.slot coincide.',
      },
      {
        name: 'handle-{slot}',
        type: 'SplitterItemContext',
        typeLink: '#splitter-item-context',
        description: 'Contenido del manejador cuyo item.slot coincide.',
      },
    ],
    expose: [],
  },
}

export default splitterConfig

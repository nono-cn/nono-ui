import type { ComponentDocConfig } from '../component-docs'
import AccordionBasicExample from '../../components/examples/accordion/AccordionBasicExample.vue'
import AccordionTypeExample from '../../components/examples/accordion/AccordionTypeExample.vue'
import AccordionValueExample from '../../components/examples/accordion/AccordionValueExample.vue'
import AccordionCollapsibleExample from '../../components/examples/accordion/AccordionCollapsibleExample.vue'
import AccordionDisabledExample from '../../components/examples/accordion/AccordionDisabledExample.vue'
import AccordionItemsExample from '../../components/examples/accordion/AccordionItemsExample.vue'
import AccordionIconDropDownExample from '../../components/examples/accordion/AccordionIconDropDownExample.vue'
import AccordionSlotsExample from '../../components/examples/accordion/AccordionSlotsExample.vue'

const accordionConfig: ComponentDocConfig = {
  slug: 'accordion',
  title: 'Accordion',
  description:
    'Muestra y oculta secciones de contenido relacionadas mediante activadores accesibles.',
  importPath: '@nono-ui/components/ui/Accordion',
  usage: [
    {
      title: 'Uso básico',
      description: 'Define cada sección con un valor, un título y una descripción.',
      component: AccordionBasicExample,
    },
  ],
  examples: [
    {
      title: 'Type',
      description: 'Permite abrir una sola sección o varias al mismo tiempo.',
      component: AccordionTypeExample,
    },
    {
      title: 'Value',
      description: 'Controla la sección abierta mediante v-model:value.',
      component: AccordionValueExample,
    },
    {
      title: 'Collapsible',
      description: 'Permite cerrar la sección abierta en modo single.',
      component: AccordionCollapsibleExample,
    },
    {
      title: 'Disabled',
      description: 'Deshabilita todo el acordeón o un elemento individual.',
      component: AccordionDisabledExample,
    },
    {
      title: 'Items',
      description: 'Configura el contenido, el icono y el estado de cada sección.',
      component: AccordionItemsExample,
    },
    {
      title: 'IconDropDown',
      description: 'Personaliza los iconos del activador en los estados abierto y cerrado.',
      component: AccordionIconDropDownExample,
    },
    {
      title: 'Slots Example',
      description: 'Personaliza el contenido de un elemento con slots dirigidos.',
      component: AccordionSlotsExample,
    },
  ],
  accessibility: [
    {
      title: 'Activadores y contenido',
      description:
        'El componente renderiza activadores y contenido con la semántica y los estados accesibles proporcionados por Reka UI. Usa labels descriptivos y conserva el teclado para abrir y cerrar cada sección.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Accordion en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/accordion#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Determina si puede estar abierta una sola sección o varias.',
      },
      {
        name: 'value',
        type: 'string | string[] | undefined',
        description:
          'Valor de la sección abierta en modo single o valores abiertos en modo multiple.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'En modo single, permite cerrar la sección abierta.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Deshabilita todos los elementos del acordeón.',
      },
      {
        name: 'unmountOnHide',
        type: 'boolean',
        default: 'true',
        description:
          'Desmonta el contenido cuando la sección está cerrada, salvo que el elemento defina otro valor.',
      },
      {
        name: 'items',
        type: 'AccordionItem[]',
        typeLink: '#accordion-item',
        default: '[]',
        description:
          'Elementos que se renderizan, con value, label, description, icon y opciones por elemento.',
      },
      {
        name: 'iconDropDownOpen',
        type: 'IconConfig',
        default: "{ name: 'chevronUp' }",
        description: 'Configuración del icono mostrado cuando el elemento está abierto.',
      },
      {
        name: 'iconDropDownClose',
        type: 'IconConfig',
        default: "{ name: 'chevronDown' }",
        description: 'Configuración del icono mostrado cuando el elemento está cerrado.',
      },
      {
        name: 'ui',
        type: `{
  item?: (context: AccordionItemContext) => HTMLAttributes
  trigger?: (context: AccordionItemContext) => HTMLAttributes
  content?: (context: AccordionItemContext) => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Objeto de resolvers para añadir atributos y clases a item, trigger y content según el contexto del elemento.',
      },
    ],
    configs: [
      {
        id: 'accordion-item',
        title: 'AccordionItem',
        typeLabel: 'AccordionItem',
        rows: [
          {
            name: 'value',
            type: 'string',
            description: 'Identificador único y valor del elemento.',
            required: true,
          },
          {
            name: 'label',
            type: 'string',
            default: 'undefined',
            description: 'Texto mostrado en el activador por defecto.',
          },
          {
            name: 'description',
            type: 'string',
            default: 'undefined',
            description: 'Texto mostrado en el contenido por defecto.',
          },
          {
            name: 'icon',
            type: 'IconConfig',
            typeLink: '/components/icon#icon-config',
            default: 'undefined',
            description: 'Icono mostrado antes del label.',
          },
          {
            name: 'slot',
            type: 'string',
            default: 'undefined',
            description: 'Nombre usado para resolver slots dirigidos a este elemento.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Deshabilita este elemento.',
          },
          {
            name: 'unmountOnHide',
            type: 'boolean',
            default: 'undefined',
            description:
              'Controla si su contenido se desmonta al cerrarse; hereda el valor del acordeón cuando no se define.',
          },
        ],
      },
      {
        id: 'accordion-item-context',
        title: 'AccordionItemContext',
        typeLabel: 'slotProps',
        showDefault: false,
        description: 'Contexto que reciben los slots y resolvers de UI para cada elemento.',
        rows: [
          {
            name: 'item',
            type: 'AccordionItem',
            typeLink: '#accordion-item',
            description: 'Datos y opciones del elemento actual.',
          },
          {
            name: 'index',
            type: 'number',
            description: 'Índice del elemento, empezando en cero.',
          },
          {
            name: 'open',
            type: 'boolean',
            description: 'Indica si el elemento está abierto.',
          },
          {
            name: 'first',
            type: 'boolean',
            description: 'Indica si es el primer elemento del acordeón.',
          },
          {
            name: 'last',
            type: 'boolean',
            description: 'Indica si es el último elemento del acordeón.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: 'string | string[] | undefined',
        description: 'Se emite cuando cambia el valor abierto.',
      },
    ],
    slots: [
      {
        name: 'trigger',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el activador completo.',
      },
      {
        name: 'leading',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Contenido situado antes del label.',
      },
      {
        name: 'label',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el label del activador.',
      },
      {
        name: 'content',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye la descripción del contenido.',
      },
      {
        name: 'iconDropdown',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el icono de estado del activador.',
      },
      {
        name: 'trigger-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el activador del elemento cuyo item.slot coincide con {slot}.',
      },
      {
        name: 'leading-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Contenido antes del label del elemento cuyo item.slot coincide con {slot}.',
      },
      {
        name: 'label-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el label del elemento cuyo item.slot coincide con {slot}.',
      },
      {
        name: 'content-{slot}',
        type: 'AccordionItemContext',
        typeLink: '#accordion-item-context',
        description: 'Sustituye el contenido del elemento cuyo item.slot coincide con {slot}.',
      },
    ],
    expose: [],
  },
}

export default accordionConfig

import type { ComponentDocConfig } from '../component-docs'
import AccordionPlaygroundExample from '../../components/examples/accordion/AccordionPlaygroundExample.vue'

const accordionConfig: ComponentDocConfig = {
  slug: 'accordion',
  title: 'Accordion',
  description:
    'Muestra y oculta secciones de contenido relacionadas mediante activadores accesibles.',
  importPath: '@nono-cn/nono-ui/components/ui/Accordion',
  playground: AccordionPlaygroundExample,
  usage: [],
  examples: [],
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
    ],
    emits: [
      {
        name: 'update:value',
        type: 'string | string[] | undefined',
        description: 'Se emite cuando cambia el valor abierto.',
      },
    ],
    slots: [
      { name: 'trigger', type: 'slotProps', description: 'Sustituye el activador completo.' },
      { name: 'leading', type: 'slotProps', description: 'Contenido situado antes del label.' },
      { name: 'label', type: 'slotProps', description: 'Sustituye el label del activador.' },
      {
        name: 'content',
        type: 'slotProps',
        description: 'Sustituye la descripción del contenido.',
      },
      {
        name: 'iconDropdown',
        type: 'slotProps',
        description: 'Sustituye el icono de estado del activador.',
      },
      {
        name: 'trigger-{slot}, leading-{slot}, label-{slot}, content-{slot}',
        type: 'slotProps',
        description:
          'Versiones dirigidas a un elemento cuyo item.slot coincide con el nombre indicado.',
      },
    ],
    expose: [],
  },
}

export default accordionConfig

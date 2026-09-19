import type { ComponentDocConfig } from '../component-docs'
import ButtonPlaygroundExample from '../../components/examples/button/ButtonPlaygroundExample.vue'

const buttonConfig: ComponentDocConfig = {
  slug: 'button',
  title: 'Button',
  description: 'Acción interactiva con variantes, estados, iconos y elementos raíz configurables.',
  importPath: '@nono-cn/nono-ui/components/ui/Button',
  playground: ButtonPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Acciones accesibles',
      description:
        'Usa un nombre accesible para botones solo con icono y conserva aria-busy y aria-disabled durante la carga. Los atributos HTML, class, style y ARIA se reenvían al elemento raíz. No dependas únicamente del color o del icono para comunicar la acción.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Texto mostrado cuando no se proporciona contenido en el slot default.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'",
        default: "'solid'",
        description: 'Tratamiento visual del botón.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'primary'",
        description: 'Severidad usada para elegir los colores del botón.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño visual del botón.',
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        description: 'Aplica una forma completamente redondeada.',
      },
      {
        name: 'square',
        type: 'boolean',
        default: 'false',
        description:
          'Iguala el ancho y el alto para crear un botón cuadrado, normalmente con un icono.',
      },
      {
        name: 'raised',
        type: 'boolean',
        default: 'false',
        description: 'Añade una sombra ligera para elevar visualmente el botón.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description:
          'Muestra el icono de carga predeterminado o el slot loading y añade aria-busy y aria-disabled.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado aplicado al tratamiento visual del botón.',
      },
      {
        name: 'icon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuración del icono inicial cuando no se proporciona el slot leading.',
      },
      {
        name: 'trailingIcon',
        type: 'IconConfig',
        typeLink: '/components/icon#icon-config',
        default: 'undefined',
        description: 'Configuración del icono final cuando no se proporciona el slot trailing.',
      },
      {
        name: 'as',
        type: 'AsTag | Component',
        default: "'button'",
        description: 'Elemento o componente que se renderiza como raíz, por ejemplo button o a.',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description:
          'Aplica las props y el comportamiento al elemento proporcionado en el slot default.',
      },
    ],
    configs: [
      {
        id: 'button-config',
        title: 'ButtonConfig',
        description:
          'Tipo reutilizable para configuraciones de Button en otros componentes. Combina ButtonProps, el listener onClick derivado de ButtonEmits y HTMLAttributes.',
        showDefault: false,
        rows: [
          {
            name: 'ButtonProps',
            type: 'ButtonProps',
            typeLink: '#props',
            description: 'Incluye las props públicas de Button.',
          },
          {
            name: 'EmitsAsProps<ButtonEmits>',
            type: 'EmitsAsProps<ButtonEmits>',
            typeLink: '#emits',
            description:
              'Expone el evento click como la propiedad onClick en configuraciones anidadas.',
          },
          {
            name: 'HTMLAttributes',
            type: 'HTMLAttributes',
            description: 'Incluye atributos HTML y ARIA, class, style y listeners nativos.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'click',
        type: '[event: PointerEvent]',
        description: 'Se emite al hacer click si el botón no está loading ni aria-disabled.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido principal del botón; sustituye el fallback de label.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Contenido mostrado antes del label; sustituye el fallback de icon.',
      },
      {
        name: 'loading',
        type: '-',
        description:
          'Contenido mostrado mientras loading es true; sustituye el spinner predeterminado.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Contenido mostrado después del label; sustituye el fallback de trailingIcon.',
      },
    ],
    expose: [],
  },
}

export default buttonConfig

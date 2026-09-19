import type { ComponentDocConfig } from '../component-docs'
import PopoverPlaygroundExample from '../../components/examples/popover/PopoverPlaygroundExample.vue'

const popoverConfig: ComponentDocConfig = {
  slug: 'popover',
  title: 'Popover',
  description: 'Muestra contenido contextual relacionado con un elemento disparador.',
  importPath: '@nono-cn/nono-ui/components/ui/Popover',
  playground: PopoverPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Disparadores y teclado',
      description:
        'Usa un elemento interactivo con nombre accesible como disparador. El contenido gestiona el foco, puede cerrarse con Escape y se relaciona con su disparador; modal=true limita la interacción exterior y la exposición a lectores de pantalla mientras permanece abierto.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Popover en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/popover#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Controla si el popover está abierto. Se usa con v-model:open.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'false',
        description:
          'Cuando es true, desactiva la interacción con el contenido exterior mientras está abierto.',
      },
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        default: "'bottom'",
        description: 'Lado preferido del disparador donde se renderiza el contenido.',
      },
      {
        name: 'sideOffset',
        type: 'number',
        default: '4',
        description: 'Distancia en píxeles entre el contenido y el disparador.',
      },
      {
        name: 'sideFlip',
        type: 'boolean',
        default: 'true',
        description: 'Invierte el lado cuando el contenido colisiona con los límites disponibles.',
      },
      {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        default: "'center'",
        description: 'Alineación preferida del contenido respecto al disparador.',
      },
      {
        name: 'alignOffset',
        type: 'number',
        default: '0',
        description: 'Desplazamiento en píxeles desde la alineación start o end.',
      },
      {
        name: 'alignFlip',
        type: 'boolean',
        default: 'true',
        description: 'Invierte la alineación cuando colisiona con los límites disponibles.',
      },
      {
        name: 'avoidCollisions',
        type: 'boolean',
        default: 'true',
        description: 'Ajusta side y align para mantener el contenido dentro del viewport.',
      },
      {
        name: 'collisionPadding',
        type: "number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>",
        default: '0',
        description: 'Distancia en píxeles respecto a los límites usada para detectar colisiones.',
      },
      {
        name: 'arrowPadding',
        type: 'number',
        default: '0',
        description: 'Espacio entre la flecha y los bordes redondeados del contenido.',
      },
      {
        name: 'hideShiftedArrow',
        type: 'boolean',
        default: 'false',
        description: 'Oculta la flecha cuando no puede centrarse sobre el elemento de referencia.',
      },
      {
        name: 'sticky',
        type: "'partial' | 'always'",
        default: "'partial'",
        description: 'Define cómo se mantiene el contenido dentro del eje de alineación.',
      },
      {
        name: 'hideWhenDetached',
        type: 'boolean',
        default: 'false',
        description: 'Oculta el contenido cuando el disparador queda completamente fuera de vista.',
      },
      {
        name: 'positionStrategy',
        type: "'absolute' | 'fixed'",
        default: "'absolute'",
        description: 'Tipo de posicionamiento CSS usado por el contenido flotante.',
      },
      {
        name: 'updatePositionStrategy',
        type: "'optimized' | 'always'",
        default: "'optimized'",
        description:
          'Estrategia para actualizar la posición durante la animación o el desplazamiento.',
      },
      {
        name: 'disableUpdateOnLayoutShift',
        type: 'boolean',
        default: 'false',
        description: 'Evita actualizar la posición cuando cambia el layout.',
      },
      {
        name: 'prioritizePosition',
        type: 'boolean',
        default: 'false',
        description:
          'Fuerza el contenido dentro del viewport aunque pueda solaparse con el disparador.',
      },
      {
        name: 'disableOutsidePointerEvents',
        type: 'boolean',
        default: 'false',
        description: 'Impide temporalmente interactuar con elementos exteriores al contenido.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: 'false',
        description: 'Mantiene montado el contenido aunque el popover esté cerrado.',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'false',
        description: 'Muestra una flecha entre el contenido y el disparador.',
      },
      {
        name: 'arrowWidth',
        type: 'number',
        default: '10',
        description: 'Ancho de la flecha en píxeles.',
      },
      {
        name: 'arrowHeight',
        type: 'number',
        default: '5',
        description: 'Alto de la flecha en píxeles.',
      },
      {
        name: 'arrowRounded',
        type: 'boolean',
        default: 'false',
        description: 'Renderiza la versión redondeada de la flecha.',
      },
      {
        name: 'ui',
        type: `{
  content?: (context: PopoverContext) => HTMLAttributes
  arrow?: (context: PopoverContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  content?: (context: ' },
          { text: 'PopoverContext', link: '/components/popover#popover-context' },
          { text: ') => HTMLAttributes\n  arrow?: (context: ' },
          { text: 'PopoverContext', link: '/components/popover#popover-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers públicos para personalizar atributos y clases de content y arrow. Reciben el contexto actual del popover.',
      },
    ],
    configs: [
      {
        id: 'popover-context',
        title: 'PopoverContext',
        description: 'Contexto compartido que reciben los slots default y content.',
        showDefault: false,
        rows: [
          {
            name: 'open',
            type: 'boolean',
            description: 'Indica si el popover está abierto.',
          },
          {
            name: 'close',
            type: '() => void',
            description: 'Cierra el popover de forma programática.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '[value: boolean]',
        description: 'Se emite cuando cambia el estado abierto.',
      },
      {
        name: 'show',
        type: '[]',
        description: 'Se emite cuando el popover pasa a estar abierto.',
      },
      {
        name: 'close',
        type: '[]',
        description: 'Se emite cuando el popover pasa a estar cerrado.',
      },
      {
        name: 'openAutoFocus',
        type: '[event: Event]',
        description: 'Se emite antes de enfocar automáticamente el contenido al abrirse.',
      },
      {
        name: 'closeAutoFocus',
        type: '[event: Event]',
        description: 'Se emite antes de devolver el foco al disparador al cerrarse.',
      },
      {
        name: 'escapeKeyDown',
        type: '[event: KeyboardEvent]',
        description: 'Se emite cuando se pulsa Escape dentro del contenido.',
      },
      {
        name: 'pointerDownOutside',
        type: '[event: PointerDownOutsideEvent]',
        description: 'Se emite cuando se pulsa fuera del contenido.',
      },
      {
        name: 'focusOutside',
        type: '[event: FocusOutsideEvent]',
        description: 'Se emite cuando el foco se mueve fuera del contenido.',
      },
      {
        name: 'interactOutside',
        type: '[event: PointerDownOutsideEvent | FocusOutsideEvent]',
        description: 'Se emite cuando ocurre una interacción exterior por puntero o foco.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Elemento disparador. Recibe el estado open y la función close.',
      },
      {
        name: 'content',
        type: 'PopoverContext',
        typeLink: '#popover-context',
        description: 'Contenido contextual. Recibe el estado open y la función close.',
      },
    ],
    expose: [],
  },
}

export default popoverConfig

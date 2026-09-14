import type { ComponentDocConfig } from '../component-docs'
import ScrollAreaOrientationExample from '../../components/examples/scroll-area/ScrollAreaOrientationExample.vue'
import ScrollAreaScrollHideDelayExample from '../../components/examples/scroll-area/ScrollAreaScrollHideDelayExample.vue'
import ScrollAreaTypeExample from '../../components/examples/scroll-area/ScrollAreaTypeExample.vue'
import ScrollAreaUsageExample from '../../components/examples/scroll-area/ScrollAreaUsageExample.vue'

const scrollAreaConfig: ComponentDocConfig = {
  slug: 'scroll-area',
  title: 'ScrollArea',
  description: 'Añade scroll nativo con barras personalizables y comportamiento consistente.',
  importPath: '@nono-cn/nono-ui/components/ui/ScrollArea',
  usage: [
    {
      title: 'Uso básico',
      description:
        'Define un tamaño para el área y coloca el contenido desplazable en su slot default.',
      component: ScrollAreaUsageExample,
    },
  ],
  examples: [
    {
      title: 'Type',
      description: 'Elige cuándo deben aparecer las barras de desplazamiento.',
      component: ScrollAreaTypeExample,
    },
    {
      title: 'Orientation',
      description: 'Activa el desplazamiento vertical, horizontal o en ambas direcciones.',
      component: ScrollAreaOrientationExample,
    },
    {
      title: 'Scroll hide delay',
      description: 'Ajusta cuánto tardan en ocultarse las barras con type scroll o hover.',
      component: ScrollAreaScrollHideDelayExample,
    },
  ],
  accessibility: [
    {
      title: 'Scroll nativo y teclado',
      description:
        'ScrollArea conserva el comportamiento de scroll nativo del navegador, incluido el desplazamiento mediante teclado. Proporciona un tamaño limitado cuando necesites que el contenido desborde, no ocultes la única indicación de desplazamiento y conserva los atributos HTML, class, style y ARIA que se reenvían a la raíz.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de ScrollArea en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/scroll-area#accessibility',
        },
      ],
    },
  ],
  api: {
    props: [
      {
        name: 'type',
        type: "'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'",
        default: "'hover'",
        description:
          'Define cuándo se muestran las barras: con overflow, siempre, durante el scroll, al pasar el ratón o con una aparición breve.',
      },
      {
        name: 'scrollHideDelay',
        type: 'number',
        default: '600',
        description:
          'Tiempo en milisegundos antes de ocultar las barras cuando type es scroll o hover.',
      },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal' | 'both'",
        default: "'vertical'",
        description: 'Direcciones en las que se renderizan las barras de desplazamiento.',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        default: 'false',
        description:
          'Fuerza el montaje de las barras para poder controlarlas con animaciones u otras APIs.',
      },
      {
        name: 'ui',
        type: `{
  viewport?: () => HTMLAttributes
  verticalScrollbar?: () => HTMLAttributes
  horizontalScrollbar?: () => HTMLAttributes
  thumbVertical?: () => HTMLAttributes
  thumbHorizontal?: () => HTMLAttributes
  corner?: () => HTMLAttributes
}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers públicos para aplicar atributos y clases a las partes internas del área de scroll.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido que se renderiza dentro del viewport desplazable.',
      },
    ],
    expose: [],
  },
}

export default scrollAreaConfig

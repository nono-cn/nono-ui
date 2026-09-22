import type { ComponentDocConfig } from '../component-docs'
import KbdColorExample from '../../components/examples/kbd/KbdColorExample.vue'
import KbdSeverityExample from '../../components/examples/kbd/KbdSeverityExample.vue'
import KbdSizeExample from '../../components/examples/kbd/KbdSizeExample.vue'
import KbdUsageExample from '../../components/examples/kbd/KbdUsageExample.vue'
import KbdVariantExample from '../../components/examples/kbd/KbdVariantExample.vue'

const kbdConfig: ComponentDocConfig = {
  slug: 'kbd',
  title: 'Kbd',
  description: 'Muestra una tecla o atajo de teclado con una apariencia semántica y consistente.',
  importPath: '@nono-ui/components/ui/Kbd',
  usage: [
    {
      title: 'Uso básico',
      description: 'Empieza mostrando una tecla con su etiqueta visible.',
      component: KbdUsageExample,
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Compara los tratamientos visuales de la tecla.',
      component: KbdVariantExample,
    },
    {
      title: 'Severity',
      description: 'Compara las severidades de la tecla.',
      component: KbdSeverityExample,
    },
    {
      title: 'Size',
      description: 'Ajusta el tamaño visual de la tecla.',
      component: KbdSizeExample,
    },
    {
      title: 'Color',
      description: 'Aplica un color CSS personalizado.',
      component: KbdColorExample,
    },
  ],
  accessibility: [
    {
      title: 'Contenido accesible',
      description:
        'Kbd renderiza un elemento kbd semántico y reenvía los atributos HTML, class, style y ARIA al elemento raíz. Mantén visible el atajo y añade contexto textual cuando su pronunciación no sea evidente. No uses solo el color o el estilo visual para comunicar una acción.',
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
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño visual de la tecla.',
      },
      {
        name: 'variant',
        type: "'solid' | 'outline' | 'soft' | 'subtle'",
        default: "'soft'",
        description: 'Tratamiento visual de la tecla.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        default: "'secondary'",
        description: 'Severidad usada para elegir los colores del tratamiento visual.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Color CSS personalizado aplicado al fondo, borde y texto de la tecla.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Contenido personalizado que sustituye el valor de label.',
      },
    ],
    expose: [],
  },
}

export default kbdConfig

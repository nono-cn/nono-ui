import type { ComponentDocConfig } from '../component-docs'
import ProgressColorExample from '../../components/examples/progress/ProgressColorExample.vue'
import ProgressIndeterminateExample from '../../components/examples/progress/ProgressIndeterminateExample.vue'
import ProgressInvertedExample from '../../components/examples/progress/ProgressInvertedExample.vue'
import ProgressOrientationExample from '../../components/examples/progress/ProgressOrientationExample.vue'
import ProgressLabelExample from '../../components/examples/progress/ProgressLabelExample.vue'
import ProgressMaxExample from '../../components/examples/progress/ProgressMaxExample.vue'
import ProgressSlotExample from '../../components/examples/progress/ProgressSlotExample.vue'
import ProgressSizeExample from '../../components/examples/progress/ProgressSizeExample.vue'
import ProgressSeverityExample from '../../components/examples/progress/ProgressSeverityExample.vue'
import ProgressUsageExample from '../../components/examples/progress/ProgressUsageExample.vue'
import ProgressValueExample from '../../components/examples/progress/ProgressValueExample.vue'

const progressConfig: ComponentDocConfig = {
  slug: 'progress',
  title: 'Progress',
  description:
    'Muestra el avance de una tarea con una barra de progreso accesible y personalizable.',
  importPath: '@nono-cn/nono-ui/components/ui/Progress',
  usage: [
    {
      title: 'Uso básico',
      description: 'Pasa el valor actual para mostrar una barra de progreso determinada.',
      component: ProgressUsageExample,
    },
  ],
  examples: [
    {
      title: 'Value',
      description: 'Controla el valor actual y representa un progreso indeterminado con null.',
      component: ProgressValueExample,
    },
    {
      title: 'Indeterminate',
      description: 'Usa value null para mostrar progreso indeterminado y configurar su animación.',
      component: ProgressIndeterminateExample,
    },
    {
      title: 'Orientation',
      description: 'Cambia la orientación de la barra de progreso.',
      component: ProgressOrientationExample,
    },
    {
      title: 'Inverted',
      description: 'Invierte la dirección de llenado del indicador.',
      component: ProgressInvertedExample,
    },
    {
      title: 'Max',
      description: 'Calcula el progreso sobre una escala personalizada con max.',
      component: ProgressMaxExample,
    },
    {
      title: 'Label',
      description: 'Muestra una etiqueta visible dentro de la barra.',
      component: ProgressLabelExample,
    },
    {
      title: 'Slot label',
      description: 'Personaliza la etiqueta usando value, max y percentage del contexto del slot.',
      component: ProgressSlotExample,
    },
    {
      title: 'Color',
      description: 'Personaliza por separado el color del indicador y el color del track.',
      component: ProgressColorExample,
    },
    {
      title: 'Size',
      description: 'Ajusta el grosor de la barra con tamaños predefinidos.',
      component: ProgressSizeExample,
    },
    {
      title: 'Severity',
      description: 'Comunica el estado del progreso mediante colores semánticos.',
      component: ProgressSeverityExample,
    },
  ],
  accessibility: [
    {
      title: 'Nombre y valores accesibles',
      description:
        'Progress renderiza role="progressbar" y comunica aria-valuemin, aria-valuemax y aria-valuenow cuando existe un valor determinado. Usa getValueLabel para proporcionar un nombre accesible comprensible y getValueText para describir el valor actual; si value es null, el progreso se trata como indeterminado y no se comunica aria-valuenow. La etiqueta visual se oculta de las tecnologías de asistencia, por lo que no sustituye a un nombre accesible.',
      links: [
        {
          label: 'Consulta la guía de accesibilidad de Progress en Reka UI',
          href: 'https://www.reka-ui.com/docs/components/progress#accessibility',
        },
      ],
    },
    {
      title: 'Color y estado',
      description:
        'No uses únicamente color, longitud o animación para comunicar el estado. Combina la barra con texto visible o con una descripción accesible y mantén un contraste suficiente entre el indicador y el track.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'number | null',
        default: '0',
        description:
          'Valor actual del progreso. Usa null para representar un progreso indeterminado; los valores válidos se encuentran entre 0 y max.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Valor máximo usado para calcular el porcentaje y los atributos accesibles.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'porcentaje calculado',
        description:
          'Resolver para obtener el nombre accesible del progreso. Si no se proporciona, se usa el porcentaje del valor actual respecto a max.',
      },
      {
        name: 'getValueText',
        type: '(value: number | null | undefined, max: number) => string | undefined',
        default: 'undefined',
        description:
          'Resolver para obtener el texto accesible que representa el valor actual del progreso.',
      },
      {
        name: 'label',
        type: 'string',
        default: 'undefined',
        description: 'Texto visible que se muestra dentro de la barra.',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        description: 'Valor CSS personalizado para el color del indicador.',
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        description: 'Valor CSS personalizado para el color del track.',
      },
      {
        name: 'size',
        type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        description: 'Tamaño que determina el grosor de la barra de progreso.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        description: 'Color semántico del track y del indicador de progreso.',
      },
      {
        name: 'animation',
        type: "'carousel' | 'carousel-inverse' | 'swing' | 'elastic'",
        default: "'carousel'",
        description: 'Animación usada cuando value es null.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Orientación de la barra de progreso.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description: 'Invierte la dirección de llenado del indicador.',
      },
      {
        name: 'ui',
        type: `{
  indicator?: (context: ProgressContext) => HTMLAttributes
  label?: (context: ProgressContext) => HTMLAttributes
}`,
        typeParts: [
          { text: '{\n  indicator?: (context: ' },
          { text: 'ProgressContext', link: '#progress-context' },
          { text: ') => HTMLAttributes\n  label?: (context: ' },
          { text: 'ProgressContext', link: '#progress-context' },
          { text: ') => HTMLAttributes\n}' },
        ],
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para personalizar los atributos y clases del indicador y de la etiqueta interna.',
      },
    ],
    configs: [
      {
        id: 'progress-context',
        title: 'ProgressContext',
        description: 'Contexto disponible en los resolvers de ui y en el slot label.',
        showDefault: false,
        rows: [
          {
            name: 'value',
            type: 'number | null',
            description: 'Valor actual recibido por el componente.',
          },
          {
            name: 'max',
            type: 'number',
            description: 'Valor máximo configurado.',
          },
          {
            name: 'percentage',
            type: 'number',
            description: 'Porcentaje calculado y limitado al intervalo de 0 a 100.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:value',
        type: '[value: number | null]',
        description: 'Se emite cuando el valor cambia mediante el enlace v-model.',
      },
    ],
    slots: [
      {
        name: 'label',
        type: 'ProgressContext',
        typeLink: '#progress-context',
        description:
          'Contenido visible de la etiqueta. Recibe el contexto actual y sustituye el fallback de label.',
      },
    ],
    expose: [],
  },
}

export default progressConfig

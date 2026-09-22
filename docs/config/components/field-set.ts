import type { ComponentDocConfig } from '../component-docs'
import FieldSetDescriptionExample from '../../components/examples/field-set/FieldSetDescriptionExample.vue'
import FieldSetLegendExample from '../../components/examples/field-set/FieldSetLegendExample.vue'
import FieldSetLegendVariantExample from '../../components/examples/field-set/FieldSetLegendVariantExample.vue'
import FieldSetUsageExample from '../../components/examples/field-set/FieldSetUsageExample.vue'

const fieldSetConfig: ComponentDocConfig = {
  slug: 'field-set',
  title: 'FieldSet',
  description: 'Agrupa controles de formulario relacionados con una leyenda y una descripción.',
  importPath: '@nono-cn/nono-ui/components/ui/FieldSet',
  usage: [
    {
      title: 'Uso básico',
      description: 'Agrupa controles relacionados con una leyenda y una descripción.',
      component: FieldSetUsageExample,
    },
  ],
  examples: [
    {
      title: 'Legend',
      description: 'Define el nombre accesible del grupo.',
      component: FieldSetLegendExample,
    },
    {
      title: 'Description',
      description: 'Añade contexto adicional al grupo.',
      component: FieldSetDescriptionExample,
    },
    {
      title: 'LegendVariant',
      description: 'Ajusta el tamaño visual de la leyenda.',
      component: FieldSetLegendVariantExample,
    },
  ],
  accessibility: [
    {
      title: 'Agrupa controles relacionados',
      description:
        'Usa legend para proporcionar el nombre accesible del grupo y description para aportar contexto adicional. Mantén una etiqueta visible asociada a cada control incluido en el grupo.',
    },
  ],
  api: {
    props: [
      {
        name: 'legend',
        type: 'string',
        default: 'undefined',
        description:
          'Texto de la leyenda del grupo. Se oculta si está vacío y no se usa el slot legend.',
      },
      {
        name: 'description',
        type: 'string',
        default: 'undefined',
        description: 'Texto descriptivo mostrado debajo de la leyenda.',
      },
      {
        name: 'legendVariant',
        type: "'legend' | 'label'",
        default: "'legend'",
        description:
          'Define el tamaño visual de la leyenda: base para legend o pequeño para label.',
      },
      {
        name: 'ui',
        type: `{\n  legend?: () => HTMLAttributes\n  description?: () => HTMLAttributes\n  group?: () => HTMLAttributes\n}`,
        typePre: true,
        default: 'undefined',
        description:
          'Resolvers para personalizar los atributos y clases de la leyenda, la descripción y el contenedor de controles.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'Controles y contenido del grupo.' },
      { name: 'legend', type: '-', description: 'Contenido personalizado de la leyenda.' },
      { name: 'description', type: '-', description: 'Contenido personalizado de la descripción.' },
    ],
    expose: [],
  },
}

export default fieldSetConfig

import type { ComponentDocConfig } from '../component-docs'
import IconPlaygroundExample from '../../components/examples/icon/IconPlaygroundExample.vue'

const iconConfig: ComponentDocConfig = {
  slug: 'icon',
  title: 'Icon',
  description: 'Renderiza un icono Lucide con una API compacta y consistente.',
  importPath: '@nono-cn/nono-ui/components/ui/Icon',
  playground: IconPlaygroundExample,
  usage: [],
  examples: [],
  accessibility: [
    {
      title: 'Iconos decorativos y semánticos',
      description:
        'Oculta los iconos decorativos con aria-hidden="true" y proporciona un nombre accesible a los iconos informativos mediante texto visible o aria-label en el elemento que los contiene. No dependas únicamente del icono o del color para comunicar información.',
    },
  ],
  api: {
    props: [
      {
        name: 'name',
        type: 'IconName',
        required: true,
        description: 'Nombre del icono que se va a renderizar.',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Tamaño visual del icono.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'currentColor'",
        description: 'Color CSS aplicado al icono.',
      },
    ],
    configs: [
      {
        id: 'icon-config',
        title: 'IconConfig',
        description:
          'IconConfig combina IconProps con HTMLAttributes. Los atributos, atributos ARIA y listeners nativos como onClick u onFocus se aplican al SVG raíz.',
        showDefault: false,
        rows: [
          {
            name: 'IconProps',
            type: 'IconProps',
            typeLink: '#props',
            description: 'Incluye las props name, size y color del componente Icon.',
          },
          {
            name: 'HTMLAttributes',
            type: 'HTMLAttributes',
            description:
              'Incluye atributos HTML y ARIA, class, style y listeners de eventos DOM como onClick y onFocus.',
          },
        ],
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default iconConfig

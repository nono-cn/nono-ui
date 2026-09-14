import type { ComponentDocConfig } from '../component-docs'
import IconColorExample from '../../components/examples/icon/IconColorExample.vue'
import IconAccessibilityExample from '../../components/examples/icon/IconAccessibilityExample.vue'
import IconNameExample from '../../components/examples/icon/IconNameExample.vue'
import IconSizeExample from '../../components/examples/icon/IconSizeExample.vue'
import IconUsageExample from '../../components/examples/icon/IconUsageExample.vue'

const iconConfig: ComponentDocConfig = {
  slug: 'icon',
  title: 'Icon',
  description: 'Renderiza un icono Lucide con una API compacta y consistente.',
  importPath: '@nono-cn/nono-ui/components/ui/Icon',
  accessibility: [
    {
      title: 'Iconos decorativos y semánticos',
      description: 'Oculta los iconos decorativos y proporciona un nombre a los informativos.',
      component: IconAccessibilityExample,
    },
  ],
  usage: [
    {
      title: 'Uso básico',
      description: 'Importa Icon y pasa el nombre del icono que quieres renderizar.',
      component: IconUsageExample,
    },
  ],
  examples: [
    {
      title: 'Name',
      description: 'Usa cualquier nombre incluido en el mapa público de iconos.',
      component: IconNameExample,
    },
    {
      title: 'Size',
      description: 'Ajusta el tamaño visual con uno de los cuatro tamaños disponibles.',
      component: IconSizeExample,
    },
    {
      title: 'Color',
      description: 'Aplica cualquier valor CSS válido al color del icono.',
      component: IconColorExample,
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
    emits: [],
    slots: [],
    expose: [],
  },
}

export default iconConfig

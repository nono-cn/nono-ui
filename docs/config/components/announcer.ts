import type { ComponentDocConfig } from '../component-docs'
import AnnouncerBasicExample from '../../components/examples/announcer/AnnouncerBasicExample.vue'
import AnnouncerPolitenessExample from '../../components/examples/announcer/AnnouncerPolitenessExample.vue'
import AnnouncerSlotExample from '../../components/examples/announcer/AnnouncerSlotExample.vue'

const announcerConfig: ComponentDocConfig = {
  slug: 'announcer',
  title: 'Announcer',
  description: 'Anuncia cambios dinámicos a lectores de pantalla sin añadir contenido visual.',
  importPath: '@nono-ui/components/ui/Announcer',
  usage: [
    {
      title: 'Mensaje básico',
      description: 'Anuncia un cambio dinámico con la configuración predeterminada.',
      component: AnnouncerBasicExample,
    },
  ],
  examples: [
    {
      title: 'Politeness',
      description: 'Elige el nivel de prioridad del anuncio.',
      component: AnnouncerPolitenessExample,
    },
    {
      title: 'Contenido personalizado',
      description: 'Usa el slot default cuando necesites controlar el contenido anunciado.',
      component: AnnouncerSlotExample,
    },
  ],
  accessibility: [
    {
      title: 'Regiones live',
      description:
        'Announcer renderiza un span con aria-live y aria-atomic, reenvía los atributos HTML, class, style y ARIA al elemento raíz y permanece oculto visualmente cuando no se usa el slot default. Usa politeness assertive solo para cambios urgentes y evita anunciar el mismo estado varias veces.',
    },
  ],
  api: {
    props: [
      {
        name: 'atomic',
        type: 'boolean',
        default: 'true',
        description:
          'Indica si debe anunciarse toda la región cuando cambia una parte de su contenido.',
      },
      {
        name: 'message',
        type: 'string',
        default: "''",
        description: 'Mensaje anunciado cuando no se proporciona contenido en el slot default.',
      },
      {
        name: 'politeness',
        type: "'assertive' | 'polite' | 'off'",
        default: "'polite'",
        description:
          'Valor de aria-live. También determina el role: alert para assertive, status para polite y ninguno para off.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description:
          'Contenido personalizado anunciado por la región. Cuando se usa, el contenido deja de estar oculto visualmente.',
      },
    ],
    expose: [],
  },
}

export default announcerConfig

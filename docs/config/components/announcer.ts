import type { ComponentDocConfig } from '../component-docs'
import AnnouncerAtomicExample from '../../components/examples/announcer/AnnouncerAtomicExample.vue'
import AnnouncerMessageExample from '../../components/examples/announcer/AnnouncerMessageExample.vue'
import AnnouncerPolitenessExample from '../../components/examples/announcer/AnnouncerPolitenessExample.vue'
import AnnouncerSlotExample from '../../components/examples/announcer/AnnouncerSlotExample.vue'
import AnnouncerUsageExample from '../../components/examples/announcer/AnnouncerUsageExample.vue'

const announcerConfig: ComponentDocConfig = {
  slug: 'announcer',
  title: 'Announcer',
  description: 'Anuncia cambios dinámicos a lectores de pantalla sin añadir contenido visual.',
  importPath: '@nono-cn/nono-ui/components/ui/Announcer',
  usage: [
    {
      title: 'Uso básico',
      description: 'Proporciona un mensaje para anunciar una actualización de estado.',
      component: AnnouncerUsageExample,
    },
  ],
  examples: [
    {
      title: 'Politeness',
      description: 'Controla la prioridad con la que se anuncia el mensaje.',
      component: AnnouncerPolitenessExample,
    },
    {
      title: 'Atomic',
      description: 'Decide si se anuncia toda la región o solo la parte que ha cambiado.',
      component: AnnouncerAtomicExample,
    },
    {
      title: 'Message',
      description: 'Actualiza el mensaje anunciado desde el estado de tu aplicación.',
      component: AnnouncerMessageExample,
    },
    {
      title: 'Slot',
      description: 'Usa el slot default para proporcionar contenido personalizado.',
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

<script setup lang="ts">
import { dropdownMenuDefaults } from '@/components/ui/DropdownMenu/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla el estado del menú mediante v-model:open.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: String(dropdownMenuDefaults.modal),
    description: 'Controla si la interacción fuera del menú queda bloqueada.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(dropdownMenuDefaults.disabled),
    description: 'Deshabilita el menú y su trigger.',
  },
  {
    name: 'heightArrow',
    type: 'number',
    default: String(dropdownMenuDefaults.heightArrow),
    description: 'Altura de la flecha en píxeles.',
  },
  {
    name: 'widthArrow',
    type: 'number',
    default: String(dropdownMenuDefaults.widthArrow),
    description: 'Anchura de la flecha en píxeles.',
  },
  {
    name: 'roundedArrow',
    type: 'boolean',
    default: String(dropdownMenuDefaults.roundedArrow),
    description: 'Renderiza la versión redondeada de la flecha.',
  },
  {
    name: 'items',
    type: 'DropdownMenuItem[]',
    typeLink: '#dropdown-menu-item',
    default: '[]',
    description: 'Opciones del menú con label, icon, disabled y onSelect.',
  },
  ...[
    [
      'align',
      '"start" | "center" | "end"',
      dropdownMenuDefaults.align,
      'Alineación respecto al trigger.',
    ],
    [
      'alignFlip',
      'boolean',
      dropdownMenuDefaults.alignFlip,
      'Invierte la alineación en colisiones.',
    ],
    ['alignOffset', 'number', dropdownMenuDefaults.alignOffset, 'Desplazamiento de alineación.'],
    [
      'arrowPadding',
      'number',
      dropdownMenuDefaults.arrowPadding,
      'Separación respecto a los bordes.',
    ],
    [
      'avoidCollisions',
      'boolean',
      dropdownMenuDefaults.avoidCollisions,
      'Evita salir del viewport.',
    ],
    ['collisionBoundary', 'Element | null | Array<Element | null>', '[]', 'Límite de colisión.'],
    [
      'collisionPadding',
      'number | Partial<Record<Side, number>>',
      dropdownMenuDefaults.collisionPadding,
      'Margen de colisión.',
    ],
    [
      'disableUpdateOnLayoutShift',
      'boolean',
      dropdownMenuDefaults.disableUpdateOnLayoutShift,
      'Desactiva actualizaciones por cambios de layout.',
    ],
    ['forceMount', 'boolean', '-', 'Fuerza el montaje del contenido.'],
    [
      'hideShiftedArrow',
      'boolean',
      dropdownMenuDefaults.hideShiftedArrow,
      'Oculta la flecha descentrada.',
    ],
    [
      'hideWhenDetached',
      'boolean',
      dropdownMenuDefaults.hideWhenDetached,
      'Oculta el contenido si el trigger no es visible.',
    ],
    ['loop', 'boolean', dropdownMenuDefaults.loop, 'Navegación circular con teclado.'],
    [
      'positionStrategy',
      '"absolute" | "fixed"',
      dropdownMenuDefaults.positionStrategy,
      'Estrategia de posicionamiento.',
    ],
    [
      'prioritizePosition',
      'boolean',
      dropdownMenuDefaults.prioritizePosition,
      'Prioriza mantenerlo dentro del viewport.',
    ],
    [
      'side',
      '"top" | "right" | "bottom" | "left"',
      dropdownMenuDefaults.side,
      'Lado preferido del trigger.',
    ],
    ['sideFlip', 'boolean', dropdownMenuDefaults.sideFlip, 'Invierte el lado en colisiones.'],
    ['sideOffset', 'number', dropdownMenuDefaults.sideOffset, 'Distancia al trigger.'],
    ['sticky', '"partial" | "always"', dropdownMenuDefaults.sticky, 'Comportamiento sticky.'],
    [
      'updatePositionStrategy',
      '"optimized" | "always"',
      dropdownMenuDefaults.updatePositionStrategy,
      'Estrategia de actualización.',
    ],
  ].map(([name, type, defaultValue, description]) => ({
    name,
    type,
    default: String(defaultValue),
    description,
  })),
]
const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
  ...[
    ['closeAutoFocus', 'event: Event', 'Gestiona el foco al cerrar.'],
    ['escapeKeyDown', 'event: KeyboardEvent', 'Se emite al pulsar Escape.'],
    ['focusOutside', 'event: FocusOutsideEvent', 'Se emite al recibir foco fuera.'],
    ['interactOutside', 'event: PointerDownOutsideEvent', 'Se emite al interactuar fuera.'],
    ['pointerDownOutside', 'event: PointerDownOutsideEvent', 'Se emite al pulsar fuera.'],
  ].map(([name, type, description]) => ({ name, type, default: '-', description })),
]
const itemRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: '-',
    required: true,
    description: 'Texto visible del item.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '-',
    description: 'Icono opcional mostrado al inicio del item.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita el item e impide su selección.',
  },
  {
    name: 'onSelect',
    type: '(event: Event) => void',
    default: '-',
    description: 'Función que se ejecuta al seleccionar el item.',
  },
]
const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'never',
    default: 'Icon menu',
    description: 'Contenido opcional del trigger.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">DropdownMenu</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Trigger accesible basado en Reka UI para un menú desplegable.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" /><ApiTable
        title="Emits"
        :rows="emitRows"
      /><ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" /><ApiTable
        id="dropdown-menu-item"
        title="DropdownMenuItem[]"
        :rows="itemRows"
      />
    </div>
  </section>
</template>

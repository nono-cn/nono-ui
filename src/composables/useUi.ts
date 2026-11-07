import { normalizeHTMLAttributes } from '@/composables/useNormalize'

type UiResolver<T, C> = (context: C) => T

/**
 * Resuelve una función de `ui` y deja solo atributos nativos (HTML, SVG, MathML, `aria-*`,
 * `data-*`). Los eventos (`onClick`…) se descartan a propósito: van por emits y slots.
 */
export function useUi<T extends object, C>(resolver: UiResolver<T, C> | undefined, context: C): T {
  return normalizeHTMLAttributes(resolver?.(context))
}

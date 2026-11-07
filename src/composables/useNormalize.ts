import { isKnownHtmlAttr, isKnownMathMLAttr, isKnownSvgAttr } from '@vue/shared'

// HTML attributes missing from Vue's isKnownHtmlAttr (`is` is left out on purpose: Vue reserves it)
const extraHtmlAttrs = new Set([
  'role',
  'inputmode',
  'popover',
  'popovertarget',
  'popovertargetaction',
  'part',
  'exportparts',
  'nonce',
  'autocorrect',
  'anchor',
  'itemscope',
  'itemtype',
  'itemid',
  'itemref',
  'virtualkeyboardpolicy',
  'writingsuggestions',
  'elementtiming',
  'fetchpriority',
  'blocking',
  'shadowrootmode',
  'command',
  'commandfor',
  'closedby',
])

function isNativeAttribute(key: string): boolean {
  const normalized = key.toLowerCase()

  return (
    isKnownHtmlAttr(normalized) ||
    extraHtmlAttrs.has(normalized) ||
    isKnownSvgAttr(key) ||
    isKnownSvgAttr(normalized) ||
    isKnownMathMLAttr(normalized) ||
    normalized.startsWith('aria-') ||
    normalized.startsWith('data-')
  )
}

/** Removes non-native HTML, SVG and MathML attributes, event listeners included. SSR safe. */
export function normalizeHTMLAttributes<T extends object>(value: T | undefined): T {
  if (!value) return {} as T

  return Object.fromEntries(Object.entries(value).filter(([key]) => isNativeAttribute(key))) as T
}

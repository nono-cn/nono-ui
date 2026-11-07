import { describe, expect, it } from 'vitest'
import { normalizeHTMLAttributes } from '../useNormalize'

describe('normalizeHTMLAttributes', () => {
  it('keeps native HTML attributes', () => {
    const attrs = { id: 'x', title: 'Title', class: 'flex', style: { opacity: '0.5' } }

    expect(normalizeHTMLAttributes(attrs)).toEqual(attrs)
  })

  it('keeps aria-* and data-* attributes', () => {
    const attrs = { 'aria-label': 'Close', 'data-state': 'open' }

    expect(normalizeHTMLAttributes(attrs)).toEqual(attrs)
  })

  it('keeps the HTML attributes Vue does not know', () => {
    const attrs = { role: 'status', popover: 'auto', inputmode: 'numeric' }

    expect(normalizeHTMLAttributes(attrs)).toEqual(attrs)
  })

  it('keeps SVG attributes as SVG spells them', () => {
    const attrs = { viewBox: '0 0 24 24', 'stroke-width': '2' }

    expect(normalizeHTMLAttributes(attrs)).toEqual(attrs)
  })

  it('removes unknown keys', () => {
    expect(normalizeHTMLAttributes({ id: 'x', foo: 'bar', variant: 'solid' })).toEqual({
      id: 'x',
    })
  })

  it('removes event listeners', () => {
    expect(normalizeHTMLAttributes({ id: 'x', onClick: () => {} })).toEqual({ id: 'x' })
  })

  it('returns an empty object for undefined', () => {
    expect(normalizeHTMLAttributes(undefined)).toEqual({})
  })
})

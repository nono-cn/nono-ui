import type { VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

interface TestAttrsOptions {
  text?: string
  id: string
  // class propia del nodo y otra de attrs que choca con ella (tailwind-merge se queda con la de attrs)
  // sin ellas (nodo sin class propia) no se prueba el choque
  ownClass?: string
  conflictingClass?: string
  // atributos propios del nodo que los attrs no pueden sustituir
  notOverridable?: string[]
  // valor con el que sustituir un atributo cuando 'sustituido' no es válido (p. ej. type de un button)
  values?: Record<string, string>
  // el nodo recibe los attrs normalizados (ui con useUi): descarta los que no son nativos
  normalized?: boolean
  mount: (attrs: Record<string, string>) => VueWrapper | Promise<VueWrapper>
}

function styleDeclarations(style: string | undefined) {
  return (style ?? '')
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
}

export function testAttrs({
  text = 'fusiona los attrs con los del nodo',
  id,
  ownClass,
  conflictingClass,
  notOverridable = [],
  values = {},
  normalized = false,
  mount,
}: TestAttrsOptions) {
  describe(text, () => {
    it('añade los attrs que el nodo no tiene', async () => {
      const node = (await mount({ title: 'Mi título', 'aria-label': 'Mi etiqueta' })).get(id)

      expect(node.attributes('title')).toBe('Mi título')
      expect(node.attributes('aria-label')).toBe('Mi etiqueta')
    })

    const exceptions = notOverridable.length ? ` excepto ${notOverridable.join(', ')}` : ''

    it(`los attrs sustituyen a los atributos propios del nodo${exceptions}`, async () => {
      const own = (await mount({})).get(id).attributes()
      const names = Object.keys(own).filter(
        (name) =>
          name !== 'class' &&
          name !== 'style' &&
          !name.startsWith('data-test-') &&
          !notOverridable.includes(name),
      )

      const notReplaced: Record<string, string | undefined> = {}
      for (const name of names) {
        const value = values[name] ?? 'sustituido'
        const node = (await mount({ [name]: value })).get(id)

        if (node.attributes(name) !== value) notReplaced[name] = node.attributes(name)
      }

      expect(notReplaced).toEqual({})
    })

    if (notOverridable.length) {
      it(`con ${notOverridable.join(', ')} en attrs mantiene los suyos`, async () => {
        const own = (await mount({})).get(id).attributes()

        const replaced: Record<string, string | undefined> = {}
        for (const name of notOverridable) {
          const node = (await mount({ [name]: 'sustituido' })).get(id)

          if (node.attributes(name) !== own[name]) replaced[name] = node.attributes(name)
        }

        expect(replaced).toEqual({})
      })
    }

    if (normalized) {
      it('descarta los attrs que no son nativos', async () => {
        const node = (await mount({ foo: 'y' })).get(id)

        expect(node.attributes('foo')).toBeUndefined()
      })
    }

    it('añade la class de attrs sin quitar las suyas', async () => {
      const own = (await mount({})).get(id).classes()
      const node = (await mount({ class: 'mi-clase' })).get(id)

      expect(node.classes()).toEqual(expect.arrayContaining([...own, 'mi-clase']))
    })

    if (ownClass && conflictingClass) {
      it(`con ${conflictingClass} en attrs sustituye a ${ownClass}`, async () => {
        const node = (await mount({ class: conflictingClass })).get(id)

        expect(node.classes()).toContain(conflictingClass)
        expect(node.classes()).not.toContain(ownClass)
      })
    }

    it('añade el style de attrs sin quitar el suyo', async () => {
      const own = styleDeclarations((await mount({})).get(id).attributes('style'))
      const node = (await mount({ style: 'opacity: 0.5' })).get(id)

      expect(styleDeclarations(node.attributes('style'))).toEqual(
        expect.arrayContaining([...own, 'opacity: 0.5']),
      )
    })
  })
}

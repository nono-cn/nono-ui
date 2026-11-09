import { h, type Component, type VNodeChild } from 'vue'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

interface InvalidValueTestsOptions {
  component: Component
  props?: Record<string, unknown>
  slots?: Record<string, () => VNodeChild>
  root: string
  prop: string
  values: unknown[]
  fallback: unknown
}

type Snapshot = Map<string, Map<string, string>>

function snapshot(root: Element): Snapshot {
  const nodes: Snapshot = new Map()

  function visit(element: Element, path: string) {
    const style = getComputedStyle(element)
    const properties = new Map<string, string>()

    for (let index = 0; index < style.length; index++) {
      const property = style.item(index)
      if (property.startsWith('--')) continue
      properties.set(property, style.getPropertyValue(property))
    }

    nodes.set(path, properties)
    Array.from(element.children).forEach((child, index) =>
      visit(child, `${path} > ${child.tagName.toLowerCase()}:${index}`),
    )
  }

  visit(root, root.tagName.toLowerCase())

  return nodes
}

function differences(actual: Snapshot, expected: Snapshot) {
  const paths = new Set([...actual.keys(), ...expected.keys()])

  return [...paths].flatMap((path) => {
    const actualStyle = actual.get(path)
    const expectedStyle = expected.get(path)

    if (!actualStyle) return [`${path}: missing`]
    if (!expectedStyle) return [`${path}: unexpected`]

    return [...expectedStyle.keys()]
      .filter((property) => actualStyle.get(property) !== expectedStyle.get(property))
      .map(
        (property) =>
          `${path} ${property}: ${actualStyle.get(property)} instead of ${expectedStyle.get(property)}`,
      )
  })
}

function describeValue(value: unknown) {
  return typeof value === 'string' ? `'${value}'` : String(value)
}

export function invalidValueTests({
  component,
  props = {},
  slots,
  root,
  prop,
  values,
  fallback,
}: InvalidValueTestsOptions) {
  async function renderSnapshot(value: unknown) {
    const screen = await render(() => h(component, { ...props, [prop]: value }, slots))

    return snapshot(screen.container.querySelector(root)!)
  }

  for (const value of values) {
    it(`with ${describeValue(value)} renders the same as with ${describeValue(fallback)}`, async () => {
      const expected = await renderSnapshot(fallback)
      const actual = await renderSnapshot(value)

      expect(differences(actual, expected)).toEqual([])
    })
  }
}

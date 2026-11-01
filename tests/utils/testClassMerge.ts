import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestClassMergeOptions {
  id: string
  ownClass: string
  conflictingClass: string
  mount: (attrs: Record<string, string>) => VueWrapper | Promise<VueWrapper>
}

export function testClassMerge({ id, ownClass, conflictingClass, mount }: TestClassMergeOptions) {
  it(`añade la class de attrs sin quitar ${ownClass}`, async () => {
    const node = (await mount({ class: 'mi-clase' })).get(id)

    expect(node.classes()).toEqual(expect.arrayContaining(['mi-clase', ownClass]))
  })

  it(`con ${conflictingClass} en attrs sustituye a ${ownClass}`, async () => {
    const node = (await mount({ class: conflictingClass })).get(id)

    expect(node.classes()).toContain(conflictingClass)
    expect(node.classes()).not.toContain(ownClass)
  })
}

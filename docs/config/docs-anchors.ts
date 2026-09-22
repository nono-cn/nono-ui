export function docsAnchor(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function exampleAnchor(section: 'usage' | 'examples', title: string, index: number) {
  return `${section}-${docsAnchor(title) || `item-${index + 1}`}`
}

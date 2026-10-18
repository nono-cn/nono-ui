function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `'${value}'`
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`
  return String(value)
}

// Formatea un objeto de valores por defecto como un literal de TS, una clave por línea
export function formatDefaultObject(value: Record<string, unknown>) {
  const lines = Object.entries(value).map(([key, item]) => `  ${key}: ${formatValue(item)},`)
  return `{\n${lines.join('\n')}\n}`
}

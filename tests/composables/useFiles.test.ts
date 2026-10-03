import { describe, expect, it } from 'vitest'
import { formatFileSize, getFileIcon } from '@/composables/useFiles'

describe('formatFileSize', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [1024, '1.0 KB'],
    [1024 * 1024, '1.0 MB'],
  ])('formatea %i bytes como %s', (bytes, expected) => {
    expect(formatFileSize(bytes)).toBe(expected)
  })
})

describe('getFileIcon', () => {
  it('prioriza el estado del archivo', () => {
    const file = new File(['contenido'], 'foto.png', { type: 'image/png' })

    expect(getFileIcon(file, 'uploading')).toBe('spinner')
    expect(getFileIcon(file, 'error')).toBe('error')
    expect(getFileIcon(file, 'done')).toBe('success')
  })

  it.each([
    ['foto.png', 'image/png', 'image'],
    ['audio.mp3', 'audio/mpeg', 'audio'],
    ['video.mp4', 'video/mp4', 'video'],
    ['informe.pdf', '', 'fileText'],
    ['datos.xlsx', '', 'fileSpreadsheet'],
    ['archivo.zip', '', 'fileArchive'],
    ['desconocido.bin', 'application/octet-stream', 'file'],
  ] as const)('elige el icono de %s', (name, type, expected) => {
    const file = new File(['contenido'], name, { type })

    expect(getFileIcon(file)).toBe(expected)
  })
})

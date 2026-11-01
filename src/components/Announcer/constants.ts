export const announcerPolitenessOptions = ['polite', 'assertive', 'off'] as const

export const announcerDefaults = {
  atomic: true,
  message: '',
  politeness: 'polite' as const,
}

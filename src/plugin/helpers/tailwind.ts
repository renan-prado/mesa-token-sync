export function setVarPrefix(variable: string) {
  return `$${variable}`
}

export function getKeyName(value: string) {
  return `figma-${value.toLowerCase()}`
    .replaceAll('.', '-')
    .replaceAll('%', '-percent')
}


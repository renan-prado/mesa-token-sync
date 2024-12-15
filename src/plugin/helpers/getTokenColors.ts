export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex // Garante dois dígitos
  }

  const alphaHex = toHex(a) // Opacidade em hexadecimal
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`
}

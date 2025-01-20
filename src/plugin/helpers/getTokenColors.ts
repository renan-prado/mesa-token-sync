import { ColorRGB } from '@typings/common.types'

export function rgbaToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex // Garante dois dígitos
  }

  if (!a) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`
}

export function getHexaColor(style: PaintStyle) {
  const [hexa] = style.paints.map((paint) => {
    const { r, g, b } = (paint as ColorRGB).color
    const a = paint.opacity || 1
    return rgbaToHex(r, g, b, a)
  })

  return hexa
}

export function getHexColor(style: PaintStyle) {
  const [hex] = style.paints.map((paint) => {
    const { r, g, b } = (paint as ColorRGB).color
    return rgbaToHex(r, g, b)
  })

  return hex
}

export function getOpacity(style: PaintStyle) {
  const [opacity] = style.paints.map((paint) => {
    const a = paint.opacity || 1
    return a
  })

  return Math.round(opacity * 100) / 100
}

export function getRGB(style: PaintStyle) {
  const [rgb] = style.paints.map((paint) => {
    const { r, g, b } = (paint as ColorRGB).color
    return {
      r: normalizeToRGB(r),
      g: normalizeToRGB(g),
      b: normalizeToRGB(b),
    }
  })

  return rgb
}

export function getRGBA(style: PaintStyle) {
  const [rgba] = style.paints.map((paint) => {
    const { r, g, b } = (paint as ColorRGB).color
    const a = paint.opacity || 1

    return {
      r: normalizeToRGB(r),
      g: normalizeToRGB(g),
      b: normalizeToRGB(b),
      a: normalizeToRGB(a),
    }
  })

  return rgba
}

export function getSolidColors(styles: PaintStyle[]) {
  const solidStyles = styles.filter((style) => {
    const [type] = style.paints.map((paint) => paint.type)
    return type === 'SOLID'
  })

  const solidColors = solidStyles.map((style) => {
    return {
      name: style.name,
      opacity: getOpacity(style),
      type: 'SOLID',
      color: {
        hex: getHexColor(style),
        hexa: getHexaColor(style),
        rgb: getRGB(style),
        rgba: getRGBA(style),
      },
    }
  })

  return solidColors
}

export function getGradientColors(styles: PaintStyle[]) {
  const gradientStyles = styles.filter((style) => {
    const [type] = style.paints.map((paint) => paint.type)
    return (
      type === 'GRADIENT_ANGULAR' ||
      type === 'GRADIENT_DIAMOND' ||
      type === 'GRADIENT_LINEAR' ||
      type === 'GRADIENT_RADIAL'
    )
  })

  const gradientColors = gradientStyles.map((style) => {
    const [gradient] = style.paints.map((paint) => {
      const opacity = paint.opacity || 1

      return {
        opacity,
        type: paint.type,
        steps: (paint as any).gradientStops.map((stop) => {
          const { r, g, b } = stop.color
          return {
            color: {
              rgb: {
                r: normalizeToRGB(r),
                g: normalizeToRGB(g),
                b: normalizeToRGB(b),
              },
              rgba: {
                r: normalizeToRGB(r),
                g: normalizeToRGB(g),
                b: normalizeToRGB(b),
                a: normalizeToRGB(opacity),
              },
              hex: rgbaToHex(r, g, b),
              hexa: rgbaToHex(r, g, b, opacity),
            },
            position: stop.position,
          }
        }),
        transform: (paint as any).gradientTransform,
      }
    })

    return {
      name: style.name,
      opacity: gradient.opacity,
      type: gradient.type,
      steps: gradient.steps,
      transform: gradient.transform,
    }
  })

  return gradientColors
}

/**
 * Converte um valor na escala de 0.0-1.0 para 0-255 (RGB).
 * @param value - Valor entre 0.0 e 1.0
 * @returns Valor convertido entre 0 e 255
 */
export function normalizeToRGB(value: number): number {
  if (value < 0.0 || value > 1.0) {
    throw new Error('O valor deve estar entre 0.0 e 1.0.')
  }
  return Math.round(value * 255)
}

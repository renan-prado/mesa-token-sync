type Color = { color: { r: number; g: number; b: number } }

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex // Garante dois dígitos
  }

  const alphaHex = toHex(a) // Opacidade em hexadecimal
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`
}

export async function getColors() {
  try {
    const colorStyles = await (figma as any).getLocalPaintStylesAsync()
    return colorStyles.map((style) => {
      const [hex] = style.paints.map((paint) => {
        const { r, g, b } = (paint as Color).color
        const a = paint.opacity || 1
        return rgbaToHex(r, g, b, a)
      })
      return {
        name: style.name,
        colors: hex,
      }
    })
  } catch (error) {
    return {}
  }
}

type InputColor = {
  name: string
  colors: string
}

type Input = {
  colors: Record<number, InputColor>
}

type Output = {
  colors: Record<string, any>
}

export function transformColors(input: Input): Output {
  const result: Output = { colors: {} }

  for (const key in input.colors) {
    const { name, colors } = input.colors[key]
    const levels = name.split('-')

    let currentLevel = result.colors

    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]

      // Se estamos no último nível, lidamos com DEFAULT e subníveis
      if (i === levels.length - 1) {
        if (levels.length > 1) {
          // Caso tenha subníveis, agrupamos como DEFAULT
          if (!currentLevel[level]) {
            currentLevel[level] = { DEFAULT: colors }
          } else if (typeof currentLevel[level] === 'string') {
            currentLevel[level] = {
              DEFAULT: currentLevel[level],
              custom: colors,
            }
          } else {
            currentLevel[level]['custom'] = colors
          }
        } else {
          // Caso isolado, atribuimos diretamente
          currentLevel[level] = colors
        }
      } else {
        // Criamos subníveis intermediários se ainda não existirem
        if (!currentLevel[level]) {
          currentLevel[level] = {}
        }
        currentLevel = currentLevel[level]
      }
    }
  }

  return result
}

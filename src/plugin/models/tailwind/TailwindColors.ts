import { rgbaToHex } from '../../helpers/getTokenColors'
import { TailwindKey } from './types'

type Color = { color: { r: number; g: number; b: number } }
type ColorItem = { name: string; hex: string }

export class TailwindColors {
  private colors: Record<string, TailwindKey>

  constructor(initialColors: Record<string, TailwindKey> = {}) {
    this.colors = initialColors
  }

  add(path: string, value: string): void {
    const keys = path.split('.')
    let current: Record<string, any> = this.colors

    keys.forEach((key, index) => {
      if (!current[key]) {
        current[key] = index === keys.length - 1 ? { DEFAULT: value } : {}
      }

      if (index === keys.length - 1 && typeof current[key] === 'object') {
        current[key].DEFAULT = value
      } else {
        current = current[key] as Record<string, any>
      }
    })
  }

  remove(path: string): void {
    const keys = path.split('.')
    let current: Record<string, any> = this.colors

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        return
      }
      current = current[keys[i]] as Record<string, any>
    }

    delete current[keys[keys.length - 1]]
  }

  clear(): void {
    this.colors = {}
  }

  get(): Record<string, TailwindKey> {
    return this.colors
  }

  private async getColorTokenListByFigma(): Promise<ColorItem[]> {
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
          hex,
        }
      })
    } catch (error) {
      return []
    }
  }

  async sync() {
    const figmaTokenList = await this.getColorTokenListByFigma()
    figmaTokenList.forEach((token) => {
      const name = token.name.replaceAll('-', '.')
      this.add(name, token.hex)
    })
  }
}

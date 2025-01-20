import { TokenStyleColor } from '@figma-token/types'
import { FigmaTokenLocalStylesColors } from './colors/FigmaTokenLocalStylesColors'
import { FigmaTokenLocalStylesTexts } from './texts/FigmaTokenLocalStylesTexts'

export class FigmaTokenLocalStyles {
  public colors: TokenStyleColor
  public texts: TextStyle[]
  private paints: PaintStyle[]

  constructor() {}

  async build() {
    this.paints = await this.getPaints()
    this.texts = await this.getTexts()

    // get colors
    const styleColors = new FigmaTokenLocalStylesColors(this.paints)
    this.colors = styleColors.getColors()

    // get texts
    const styleTexts = new FigmaTokenLocalStylesTexts(this.texts)
    this.texts = styleTexts.getTexts()
  }

  private async getPaints() {
    const paints = await figma.getLocalPaintStylesAsync()
    return paints
  }

  private async getTexts() {
    const texts = await figma.getLocalTextStylesAsync()
    return texts
  }
}

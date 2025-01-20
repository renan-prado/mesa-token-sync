import {
  getGradientColors,
  getSolidColors,
} from '@plugin/helpers/getTokenColors'

export class GeneralColors {
  async get() {
    const response = await this.getColorTokenListByFigma()
  }

  private async getColorTokenListByFigma(): Promise<any> {
    try {
      const styles = await figma.getLocalPaintStylesAsync()

      const solidColors = getSolidColors(styles)
      const gradientColors = getGradientColors(styles)

      return Object.assign({}, solidColors, gradientColors)
    } catch (error) {
      return {}
    }
  }
}

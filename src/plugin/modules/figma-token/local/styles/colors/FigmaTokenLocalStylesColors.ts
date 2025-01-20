import { PaintHelper } from '@figma-token/helpers'

import {
  PaintStyleGradient,
  PaintStyleSolid,
  TokenStyleColor,
} from '@plugin/modules/figma-token/types'

export class FigmaTokenLocalStylesColors {
  private paints: PaintStyle[]

  constructor(paints: PaintStyle[]) {
    this.paints = paints
  }

  getColors(): TokenStyleColor {
    return {
      solids: this.getSolidList(),
      gradients: this.getGradientList(),
    }
  }

  private getSolidList(): PaintStyleSolid[] {
    const solids: any = this.paints.filter((style) => {
      const type = PaintHelper.getPaintType(style)
      return PaintHelper.isColorSolid(type)
    })

    return solids as PaintStyleSolid[]
  }

  private getGradientList(): PaintStyleGradient[] {
    const gradients: any = this.paints.filter((style) => {
      const type = PaintHelper.getPaintType(style)
      return PaintHelper.isColorGradient(type)
    })

    return gradients as PaintStyleGradient[]
  }
}

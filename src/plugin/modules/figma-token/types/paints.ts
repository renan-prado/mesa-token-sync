export type PaintType =
  | 'SOLID'
  | 'GRADIENT_LINEAR'
  | 'GRADIENT_RADIAL'
  | 'GRADIENT_ANGULAR'
  | 'GRADIENT_DIAMOND'
  | 'IMAGE'
  | 'VIDEO'

export type gradientTransformItem = [number, number, number]

export type PaintStyleGradient = PaintStyle & {
  paints: GradientPaint[]
}

export type PaintStyleSolid = PaintStyle & {
  paints: SolidPaint[]
}

export type TokenStyleColor = {
  solids: PaintStyleSolid[]
  gradients: PaintStyleGradient[]
}

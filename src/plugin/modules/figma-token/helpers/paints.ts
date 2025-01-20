import { PaintType } from '../types/paints'

export function isColorSolid(type: PaintType) {
  return type === 'SOLID'
}

export function isColorGradient(type: PaintType) {
  return (
    type === 'GRADIENT_ANGULAR' ||
    type === 'GRADIENT_DIAMOND' ||
    type === 'GRADIENT_LINEAR' ||
    type === 'GRADIENT_RADIAL'
  )
}

export function getPaintType(paint: PaintStyle): PaintType {
  const [type] = paint.paints.map((paint) => paint.type)
  return type
}

export const PaintHelper = {
  isColorSolid,
  isColorGradient,
  getPaintType,
}

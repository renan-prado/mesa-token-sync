import { PaintType } from '../types/paints'

/**
 * This function aims to check if the paint is a solid color.
 *
 * @param {PaintType} type - The type of the paint.
 * @returns {boolean} - Whether the paint is a solid color.
 */
export function isColorSolid(type: PaintType) {
  return type === 'SOLID'
}

/**
 * This function aims to check if the paint is a gradient.
 *
 * @param {PaintType} type - The type of the paint.
 * @returns {boolean} - Whether the paint is a gradient.
 */
export function isColorGradient(type: PaintType) {
  return (
    type === 'GRADIENT_ANGULAR' ||
    type === 'GRADIENT_DIAMOND' ||
    type === 'GRADIENT_LINEAR' ||
    type === 'GRADIENT_RADIAL'
  )
}

/**
 * This function aims to get the type of the paint.
 *
 * @param {PaintStyle} paint - The paint style.
 * @returns {PaintType} - The type of the paint.
 */
export function getPaintType(paint: PaintStyle): PaintType {
  const [type] = paint.paints.map((paint) => paint.type)
  return type
}

/**
 * This module aims to provide helper functions for paints.
 *
 * @module PaintHelper
 */
export const PaintHelper = {
  isColorSolid,
  isColorGradient,
  getPaintType,
}

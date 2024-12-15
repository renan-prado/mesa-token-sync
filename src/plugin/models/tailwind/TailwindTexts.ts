import { getKeyName, setVarPrefix } from "../../helpers/tailwind";
import { FigmaTextStyle, TailwindKey } from "./types";

export class TailwindTexts {
  private merge: Record<string, TailwindKey>;
  private fontFamily: Record<string, TailwindKey>;
  private fontSize: Record<string, TailwindKey>;
  private fontWeight: Record<string, TailwindKey>;
  private lineHeight: Record<string, TailwindKey>;
  private letterSpacing: Record<string, TailwindKey>;

  constructor() {
    this.merge = {};
    this.fontFamily = {}
    this.fontSize = {}
    this.fontWeight = {}
    this.lineHeight = {}
    this.letterSpacing = {}
  }


  private addIntoContext(context: Record<string, TailwindKey>, path: string, value: Record<string, TailwindKey> | string): void {
    const keys = path.split('.');
    let current: Record<string, any> = context;

    if (typeof value !== 'string') {
      current[path] = value
    } else {
      keys.forEach((key, index) => {
        if (!current[key]) {
          current[key] = index === keys.length - 1 ? value : {};
        }

        if (index === keys.length - 1 && typeof current[key] === 'object') {
          current[key] = value;
        } else {
          current = current[key] as Record<string, any>;
        }
      });
    }

  }

  async sync() {
    const tokens: FigmaTextStyle[] = await (figma as any).getLocalTextStylesAsync()

    tokens.forEach(token => {
      const name = token.name
      const fontFamily = token.fontName.family
      const fontWeight = token.fontName.style
      const fontSize = `${token.fontSize}px`

      // line-height
      const { unit: lineHeightUnit, value: lineHeightValue } = token.lineHeight;
      let lineHeight: string;
      if (lineHeightUnit === 'AUTO') {
        lineHeight = 'auto';
      } else if (lineHeightUnit === 'PERCENT') {
        const safeValue =  Math.round(Number(lineHeightValue) * 10) / 10
        lineHeight = `${safeValue}%`;
      } else {
        const safeValue =  Math.round(Number(lineHeightValue) * 10) / 10
        lineHeight = `${safeValue}px`;
      }

      // letterSpacing letter-spacing
      const { unit: letterSpacingUnit, value: letterSpacingValue } = token.lineHeight;
      let letterSpacing: string;
      if (letterSpacingUnit === 'AUTO') {
        letterSpacing = 'auto';
      } else if (letterSpacingUnit === 'PERCENT') {
        const safeValue =  Math.round(Number(letterSpacingValue) * 10) / 10
        letterSpacing = `${safeValue}%`;
      } else {
        const safeValue =  Math.round(Number(letterSpacingValue) * 10) / 10
        letterSpacing = `${safeValue}px`;
      }

      // fontFamily populate
      const familyKeyName = getKeyName(fontFamily)
      this.addIntoContext(this.fontFamily, familyKeyName, fontFamily)

      // fontWeight populate
      const weightKeyName = getKeyName(fontWeight)
      this.addIntoContext(this.fontWeight, weightKeyName, fontWeight)

      // fontSize populate
      const sizeKeyName = getKeyName(String(token.fontSize))
      this.addIntoContext(this.fontSize, sizeKeyName, fontSize)

      // lineHeight populate
      const lineKeyName = getKeyName(lineHeight)
      this.addIntoContext(this.lineHeight, lineKeyName, lineHeight)

      // letterSpacing populate
      const letterKeyName = getKeyName(letterSpacing)
      this.addIntoContext(this.letterSpacing, letterKeyName, letterSpacing)


      // merge populate
      const currentMerge = {
        fontFamily: setVarPrefix(familyKeyName),
        fontWeight: setVarPrefix(weightKeyName),
        fontSize: setVarPrefix(sizeKeyName),
        lineHeight: setVarPrefix(lineKeyName),
        letterSpacing: setVarPrefix(letterKeyName),
      }

      this.addIntoContext(this.merge, name, currentMerge)
    })

  }

  get() {
    return {
      merge: this.merge,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      lineHeight: this.lineHeight,
      letterSpacing: this.letterSpacing,
    }
  }

  clear() {
    this.merge = {}
    this.fontFamily = {}
    this.fontSize = {}
    this.fontWeight = {}
    this.lineHeight = {}
    this.letterSpacing = {}
  }
}

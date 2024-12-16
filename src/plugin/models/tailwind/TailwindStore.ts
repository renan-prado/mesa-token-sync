import { TailwindColors } from "./TailwindColors";
import { TailwindTexts } from "./TailwindTexts";

export class TailwindStore {
  private colors: TailwindColors
  private texts: TailwindTexts

  constructor() {
    this.colors = new TailwindColors()
    this.texts = new TailwindTexts()
  }

  async sync() {
    await this.colors.sync()
    await this.texts.sync()
  }

  async get() {
    await this.sync()
    const textTokens = this.texts.get()
    const colorTokens = {
      colors: this.colors.get()
    }

    return Object.assign({}, colorTokens, textTokens)
  }

}

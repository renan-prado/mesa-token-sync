import { GeneralColors } from './GeneralColors'

export class GeneralToken {
  colors: GeneralColors

  constructor() {
    this.colors = new GeneralColors()
  }

  async sync() {}

  async get() {
    const colorTokens = await this.colors.get()

    return Object.assign({}, colorTokens)
  }
}

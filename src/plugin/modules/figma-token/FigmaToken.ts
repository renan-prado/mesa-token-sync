import { FigmaTokenLocal } from './local/FigmaTokenLocal'
export class FigmaToken {
  public local: FigmaTokenLocal

  constructor() {}

  async build() {
    const figmaTokenLocal = new FigmaTokenLocal()
    await figmaTokenLocal.build()
    this.local = figmaTokenLocal
  }
}

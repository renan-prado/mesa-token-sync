import { FigmaTokenLocalStyles } from './styles/FigmaTokenLocalStyles'
import { FigmaTokenLocalVariables } from './variables/FigmaTokenLocalVariables'

export class FigmaTokenLocal {
  public styles: FigmaTokenLocalStyles
  public variables: FigmaTokenLocalVariables

  constructor() {}

  async build() {
    const figmaTokenLocalStyles = new FigmaTokenLocalStyles()
    const figmaTokenLocalVariables = new FigmaTokenLocalVariables()

    await figmaTokenLocalStyles.build()
    await figmaTokenLocalVariables.build()

    this.styles = figmaTokenLocalStyles
    this.variables = figmaTokenLocalVariables
  }
}

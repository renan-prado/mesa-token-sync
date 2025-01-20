export class FigmaTokenLocalVariables {
  public variables: VariableCollection[]

  constructor() {}

  async build() {
    const variables = await this.getlocalVariables()
    this.variables = variables
  }

  private async getlocalVariables() {
    const variables = await figma.variables.getLocalVariableCollectionsAsync()
    console.log('variables', variables)

    return variables
  }
}

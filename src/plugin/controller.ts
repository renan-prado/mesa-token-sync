import { trigger } from './helpers/trigger'
import {
  closePlugin,
  deleteGithubRepository,
  exportTokens,
  getAllGithubRepository,
  setGithubRepository,
} from './actions'

figma.showUI(__html__, { width: 800, height: 564 })

figma.ui.onmessage = async (ui) => {
  // tokens controls
  exportTokens(ui)

  // store controls
  deleteGithubRepository(ui)
  setGithubRepository(ui)
  getAllGithubRepository(ui)

  // triggers
  trigger(ui, 'toggle-form-page')

  // system controls
  closePlugin(ui)
}

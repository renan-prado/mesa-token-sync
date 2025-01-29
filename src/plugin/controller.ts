import {
  closePlugin,
  deleteGithubRepository,
  exportTokens,
  getAllGithubRepository,
  setGithubRepository,
} from './actions'
import { getAction } from './helpers/getAction'
import { sendMessage } from './helpers/sendMessage'

figma.showUI(__html__, { width: 800, height: 564 })

figma.ui.onmessage = async (ui) => {
  exportTokens(ui)

  // Store control
  deleteGithubRepository(ui)
  setGithubRepository(ui)
  getAllGithubRepository(ui)

  // form-sync-repo control
  getAction<{ open: boolean }>(ui, 'toggle-form-sync-repo', ({ open }) =>
    sendMessage('toggle-form-sync-repo', { open })
  )

  // close Plugin
  closePlugin(ui)
}

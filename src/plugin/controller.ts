import {
  closePlugin,
  deleteGithubRepo,
  exportTokens,
  getLocalRepos,
  saveGithubRepo,
} from './actions'
import { getAction } from './helpers/getAction'
import { sendMessage } from './helpers/sendMessage'

figma.showUI(__html__, { width: 600, height: 564 })

figma.ui.onmessage = async (ui) => {
  getLocalRepos(ui)
  saveGithubRepo(ui)
  deleteGithubRepo(ui)
  exportTokens(ui)

  // form-sync-repo control
  getAction<{ open: boolean }>(ui, 'toggle-form-sync-repo', ({ open }) =>
    sendMessage('toggle-form-sync-repo', { open })
  )

  // close Plugin
  closePlugin(ui)
}

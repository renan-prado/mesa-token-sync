import React, { useState } from 'react'
import { Button } from '../Button'
import { useFormSyncRepo } from '../../hooks/useFormSyncRepo'
import SaveSVG from '../../assets/save.svg'
import { useAction } from '../../hooks/useAction'
import type { GithubRepositoryData } from '../../../typings/common.types'
import { Fieldset } from './Fieldset'

export function FormSyncRepo() {
  const { close } = useFormSyncRepo()
  const { send } = useAction<GithubRepositoryData>('save-github-repo')

  const [accessKey, setAccessKey] = useState('')
  const [repository, setRepository] = useState('')
  const [branch, setBranch] = useState('')

  const onSaveRepository = () => {
    send({
      accessKey,
      branch,
      repository,
    })
  }

  return (
    <div data-component="form-sync-repo" className="flex flex-col gap-8 p-4">
      <form className="flex flex-col gap-6">
        <Fieldset
          value={repository}
          onChange={setRepository}
          label="Repositório"
          id="github-repo"
          placeholder="Ex: mesainc/my-project"
        />
        <Fieldset
          value={accessKey}
          onChange={setAccessKey}
          label="Access Key"
          id="github-access-key"
          placeholder="Ex: ghp_hw4cNdxydqiSYtsNiCPw8dTKixZVdT2fiO6c"
        />
        <Fieldset
          value={branch}
          onChange={setBranch}
          label="Branch"
          id="github-branch"
          placeholder="Ex: ui/design-token"
        />
      </form>

      <div
        data-component="buttons-action"
        className="flex w-full justify-between"
      >
        <Button onClick={close}>Voltar</Button>
        <Button onClick={onSaveRepository}>
          <img src={SaveSVG} className="w-4 h-4" />
          <span>Salvar Repositório</span>
        </Button>
      </div>
    </div>
  )
}

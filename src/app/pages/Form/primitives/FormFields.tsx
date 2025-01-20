import { useRepositoryStore } from '@app/stores'

type FildsetType = {
  label: string
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function Fieldset({
  label,
  id,
  placeholder,
  onChange,
  value,
}: FildsetType) {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="text-primary font-semibold text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent border border-zinc-200 h-10 text-sm focus-within:outline-none rounded-md px-3 text-zinc-700"
      />
    </fieldset>
  )
}

export function FormFields() {
  const {
    accessKey,
    branch,
    repository,
    setAccessKey,
    setBranch,
    setRepository,
  } = useRepositoryStore()

  return (
    <form className="flex flex-col gap-4">
      <Fieldset
        value={repository}
        onChange={setRepository}
        label="Repository"
        id="github-repo"
        placeholder="{owner}/{repo}"
      />
      <Fieldset
        value={accessKey}
        onChange={setAccessKey}
        label="Access Key"
        id="github-access-key"
        placeholder="Enter access key"
      />
      <Fieldset
        value={branch}
        onChange={setBranch}
        label="Branch"
        id="github-branch"
        placeholder="Enter branch name"
      />
    </form>
  )
}

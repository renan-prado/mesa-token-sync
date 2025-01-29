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
      <label className="text-zinc-400" htmlFor={id}>
        {label}:
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent border border-zinc-600 focus-within:outline-none rounded-md h-9 px-3 text-zinc-300"
      />
    </fieldset>
  )
}

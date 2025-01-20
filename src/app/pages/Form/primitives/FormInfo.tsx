export function FormInfo() {
  return (
    <p className="text-sm text-zinc-600 px-2">
      To use the GitHub API, generate a personal access token by visiting{' '}
      <a
        href="https://github.com/settings/tokens"
        className="font-bold underline"
        target="_blank"
      >
        GitHub Token Settings
      </a>
      . Ensure the token has permissions for <code>repo</code> access to commit,
      create branches, and upload files. Follow the{' '}
      <a
        href="https://docs.github.com/en/rest"
        className="font-bold underline"
        target="_blank"
      >
        GitHub REST API Documentation
      </a>{' '}
      for details.
    </p>
  )
}

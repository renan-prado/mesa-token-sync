import { Box } from '@app/components/Box'
import { FormLayout } from './primitives'

export function FormPage() {
  return (
    <FormLayout.Container>
      <FormLayout.Title />
      <FormLayout.Info />
      <Box className="gap-4 py-6">
        <FormLayout.Fields />
        <FormLayout.Actions />
      </Box>
    </FormLayout.Container>
  )
}

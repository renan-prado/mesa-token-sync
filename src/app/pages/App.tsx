import '@app/styles/ui.css'
import { HomePage, FormPage } from '@pages/index'
import { useRoute } from '../stores'

export default function App() {
  const route = useRoute((s) => s.route)

  return (
    <article className="w-full h-full bg-white text-primary">
      {route === 'home-page' && <HomePage />}
      {route === 'form-page' && <FormPage />}
    </article>
  )
}

import { AppHeader } from './cmp/AppHeader'
import { Home } from './pages/Home'

function App () {
  return (
    <div>
      <AppHeader />
      <main className='main-layout grid'>
        <Home />
      </main>
    </div>
  )
}

export default App

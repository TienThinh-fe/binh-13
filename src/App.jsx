import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Game } from './pages'

const router = createBrowserRouter([{ path: '/', element: <Game /> }])

function App() {
  return <RouterProvider router={router} />
}

export default App

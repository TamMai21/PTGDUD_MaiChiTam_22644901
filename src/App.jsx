import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import ContextData from './context/Context'
import Header from './component/Header'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContextData>
        <BrowserRouter>
          <Header/>
            <AppRoutes />
          <Footer/>
        </BrowserRouter>
      </ContextData>
    </>
  )
}

export default App

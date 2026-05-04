import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import FormPage from './pages/FormPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <div className="App dark min-h-screen bg-background text-foreground selection:bg-primary/30">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

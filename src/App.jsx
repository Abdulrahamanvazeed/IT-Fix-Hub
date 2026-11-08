import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import GuidesLibrary from './pages/GuidesLibrary'
import GuideView from './pages/GuideView'
import SymptomSearch from './pages/SymptomSearch'
import LearningPath from './pages/LearningPath'
import About from './pages/About'

function Layout() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<GuidesLibrary />} />
        <Route path="/guides/:osId" element={<GuidesLibrary />} />
        <Route path="/guides/:osId/:guideId" element={<GuideView />} />
        <Route path="/symptoms" element={<SymptomSearch />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App

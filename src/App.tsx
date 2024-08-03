import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import SingInPage from './pages/SignIn'
import SingUpPage from './pages/SignUp'
import CardPage from './pages/Card'
import TestPage from '@pages/Test'
import ScrollToTop from './components/shared/ScrollToTop'
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SingInPage} />
        <Route path="/signup" Component={SingUpPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

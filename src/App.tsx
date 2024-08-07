import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '@components/auth/PrivateRoute'
import ScrollToTop from '@components/shared/ScrollToTop'
import Navbar from '@components/shared/Navbar'

import HomePage from '@pages/Home'
import SingInPage from '@pages/SignIn'
import SingUpPage from '@pages/SignUp'
import CardPage from '@pages/Card'
import TestPage from '@pages/Test'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'

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
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

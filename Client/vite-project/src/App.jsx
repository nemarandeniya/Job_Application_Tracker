import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Views/Dashboard'
import Signup from './Views/Signup'
import Login from './Views/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
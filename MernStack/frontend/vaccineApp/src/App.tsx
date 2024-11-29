import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';


function App() {
  return(
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  )
}

export default App

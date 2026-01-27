
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultPage } from './default_page';
import { Test } from './test';
import { UserContextProvider} from './contexts/UserContext';
import { LandingPage } from './landing_page';
import { Register } from './pages/login&register/register';
import { Login } from './pages/login&register/login';

function App() {
  return (
    <>
    <UserContextProvider>
      <Router>
          <Routes>
            {/**add routes here */}
            <Route path="/test" element ={<DefaultPage/>}/>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

          </Routes>
      </Router>
    </UserContextProvider>
    </>
  )
}

export default App

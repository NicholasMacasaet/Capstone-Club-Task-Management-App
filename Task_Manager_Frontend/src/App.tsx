
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultPage } from './default_page';
import { Test } from './test';
import { UserContextProvider} from './contexts/UserContext';

function App() {
  return (
    <>
    <UserContextProvider>
      <Router>
          <Routes>
            {/**add routes here */}
            <Route path="/" element={<DefaultPage/>}/>
            <Route path="/test" element ={<Test/>}/>
          </Routes>
      </Router>
    </UserContextProvider>
    </>
  )
}

export default App

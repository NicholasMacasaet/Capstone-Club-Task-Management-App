
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultPage } from './default_page';
import { Test } from './test';
import { UserContextProvider} from './contexts/UserContext';
import { LandingPage } from './landing_page';
import { Register } from './pages/login&register/register';
import { Login } from './pages/login&register/login';
import { OrgLandingPage } from './pages/org_register/org_landing_page';
import { CreateOrg } from './pages/org_register/org_create';
import { OrgJoin } from './pages/org_register/org_join';
import { TaskDashboard } from './pages/tasks/task_dashboard';

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

            <Route path="/orgs">
              <Route path='/orgs/landing' index element={<OrgLandingPage/>}/>
              <Route path='/orgs/create' element={<CreateOrg/>}/>
              <Route path='/orgs/join' element={<OrgJoin/>}/>
            </Route>

            <Route path='/home' element = {<TaskDashboard/>}/>
          </Routes>
      </Router>
    </UserContextProvider>
    </>
  )
}

export default App

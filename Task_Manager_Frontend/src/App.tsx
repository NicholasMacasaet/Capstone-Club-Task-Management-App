
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
import { TaskCreation } from './pages/tasks/task_creation';
import { UserProfile } from './pages/users/user_profile';
import { Settings } from './pages/users/settings';
import { OrgAdminPage } from './pages/org_register/org_admin';
import { TaskEditing } from './pages/tasks/task_editing';
import { InitiativesDashboard } from './pages/initatives/initiatives_dashboard';
import { InitiativeCreation } from './pages/initatives/initiatives_creation';
import { InitiativesEditing } from './pages/initatives/initiatives_editing';

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

            <Route path="/club">
              {/* use id query param for switching between different clubs */}
              <Route path='/club/home/:id/' element = {<TaskDashboard/>}/>
              <Route path="/club/management/:id/" element = {<OrgAdminPage/>}/>
            </Route>

            <Route path="/tasks/">
              <Route path='/tasks/new_task/' element = {<TaskCreation/>}/>
              <Route path='/tasks/task_view/:id/' element = {<TaskEditing/>}/>
            </Route>

            <Route path="/initiatives/">
              <Route path='/initiatives/dashboard/:id/' element = {<InitiativesDashboard/>}/>

              <Route path="/initiatives/new_initiative/" element={<InitiativeCreation/>
              }/>
              <Route path="/initiatives/initiative/:id/" element={<InitiativesEditing/>}/>
            </Route>
            
            <Route path="/profile" element={<UserProfile/>}/>

            <Route path="/settings" element={<Settings/>}/>
          </Routes>
      </Router>
    </UserContextProvider>
    </>
  )
}

export default App

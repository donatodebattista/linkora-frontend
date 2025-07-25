import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginView />}></Route>
          <Route path='/auth/register' element={<RegisterView />}></Route>
        </Route>

        <Route path='/admin' element={<AppLayout />}>
          <Route index={true} element={<LinkTreeView />}></Route>
          <Route path='profile' element={<ProfileView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
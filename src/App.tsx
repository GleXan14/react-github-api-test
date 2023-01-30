
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login.page';
import LayoutHomePage from './pages/layout-home.page';
import HomePage from './pages/home.page';
import UserDetailsPage from './pages/user-details.page';
import PrivateWrapper from './components/private-route-wrapper.component';
import Utility from './utils/utility';

function App() {
  const authData = localStorage.getItem(Utility.LOCAL_STORAGE_AUTH_ITEM);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/auth/login' 
        element={
        <PrivateWrapper isAuth={!(authData)} redirectTo="/home">
          <LoginPage />
        </PrivateWrapper>} />
        
        <Route element={<PrivateWrapper isAuth={!!(authData)}><LayoutHomePage /></PrivateWrapper>}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/user/:username' element={<UserDetailsPage />} />
        </Route>
        
        <Route path='/' element={<Navigate to="/home" replace={true} />} />
        <Route path='*' element={<Navigate to="/home" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from './themes/globalStyles';
import UserContext from './contexts/userContext';
import Login from './pages/Login';
import Register from './pages/Register';
import InitialPage from './pages/InitialPage';

export default function App() {
  const [token, setToken ] = useState(localStorage.getItem('authToken'));

  const userContext:any = {
    token,
    setToken
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/sign-up"} element={<Register />} />
          <Route path={"/initialpage"} element={<InitialPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter> 
  );
}

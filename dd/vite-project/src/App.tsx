import { createContext, useContext, useState } from "react";
import './App.css'
import {Link, Route, useLocation, Navigate, Outlet, Routes} from 'react-router-dom';
import Users from "./components/Navbar/User";
import Contact from "./components/Navbar/Contact";
import About from "./components/Navbar/About";
import Pagination from "./components/Navbar/Pagination";
import Form from "./components/Navbar/Form";

type AuthContextType = {
  isAuthenticated: boolean; // флаг, показывающий, аутентифицирован ли пользователь
  setAuth: (auth: boolean) => void; // функция для изменения значения isAuthenticated
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => { },
});


function App() {
  const [isAuthenticated, setAuth] = useState<boolean>(false);

  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">('dark')

  const changeTheme = () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      setCurrentTheme(newTheme);
  }

  const changeAuth = () =>{
    setAuth(!isAuthenticated);
  }

  return (
    <> 
      <div className="nav">
      <Link to={'about'}>About  </Link>
  
      <Link to={'users'}>Users  </Link>
 
      <Link to={'contact'}>Contact  </Link>
     
      <Link to={'pagination'}>Pagination  </Link>

      <Link to={'form'}>Form  </Link>
      <button onClick={() => changeTheme()}>  Сменить тему  </button>
      <button type={'button'} onClick={() => changeAuth()}>{isAuthenticated === true ? 'Выйти':'Войти'}
      </button>
      <br></br>
     </div>
      <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      <Routes>
        <Route path="/about" Component={About} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" Component={Users} />
        </Route>  
        <Route path="/contact" Component={Contact} />
        <Route path="/form" Component={Form} />
        <Route path="/pagination" Component={Pagination} />
      </Routes>
      </AuthContext.Provider>  
       
    </>
  )
}

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); 

  return (
    
    isAuthenticated === true ?
      <Outlet />

      :
      <Navigate to="/about" state={{ from: location }} replace />
  );
}

export default App

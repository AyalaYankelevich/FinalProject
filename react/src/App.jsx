 
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Example from './components/Example';
import LogIn from './components/LogIn';



const App = () => {

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/example" activeClassName="active">   Example  </NavLink>
        <NavLink to="/logIn" activeClassName="active">   log in  </NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/example' element={<Example/>} />
        <Route path='/logIn' element={<LogIn></LogIn>} />
   
      </Routes>
    </BrowserRouter>
  );
};

export default App;

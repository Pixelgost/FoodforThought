import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Profile from './components/Profile';
import GiveOrReceive from './components/GiveOrReceiveGoods';
import Search from './components/Search';


/*function App() {
  return (
    <div className="App">
      <h2>Food For Thought</h2>
      <Login />
      <br />
      <Logout />
      <Home />
      <About />
    </div>
  );
}
*/
function App() { 

  return ( 
  
      <Router> 
  
  
      <Routes> 
  
          <Route path='/react-google-authentication' element={<Login/>} /> 
  
          <Route path='/Logout' element={<Logout/>} /> 
  
          <Route path='/Home' element={<Home/>} /> 

          <Route path = '/Profile' element = {<Profile/>} />

          <Route path = '/GiveOrReceiveGoods' element = {<GiveOrReceive/>} />

          <Route path = '/Search' element = {<Search/>} />

  
      </Routes> 
  
      </Router> 
  ); 
  } 

export default App
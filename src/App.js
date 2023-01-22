import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import About from './Maps';


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
  
          <Route path='/Maps' element={<About/>} /> 
  
      </Routes> 
  
      </Router> 
  ); 
  } 



export default App





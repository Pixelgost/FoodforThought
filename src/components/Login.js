import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./Home";

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
  return (
    <Router>
        <Route exact path = "/" component = {Home} />
    </Router>
  );
}
  
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;

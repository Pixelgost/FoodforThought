import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";

var AWS = require("aws-sdk");
let awsConfig = {
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "AKIATWHP2O5ZIHUYX4RT", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

const pos = [];
  
function Login() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }
  const onSuccess = (res) => 
  {
    localStorage.setItem("email", JSON.stringify(res.profileObj.email))
    var params = {
      TableName: "FoodForThoughtDB",
      Key: {
          "email": res.profileObj.email
      }
    };
    let result = null;
    docClient.get(params, function (err, data) {
      if (err) {
        console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
      }
      else {
        result = (JSON.stringify(data, null, 2));
        if(result === null || result === "{}"){
          save(res.profileObj.email, res.profileObj.name, "FoodForThoughtDB");
        
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var params = {
              TableName: "FoodForThoughtDB",
              Key: { "email": res.profileObj.email },
              UpdateExpression: "set latitude = :byUser, longitude = :boolValue",
              ExpressionAttributeValues: {
                  ":byUser": position.coords.latitude,
                  ":boolValue": position.coords.longitude
              },
              ReturnValues: "UPDATED_NEW"
      
          };
          docClient.update(params, function (err, data) {
      
              if (err) {
                  console.log("users::update::error - " + JSON.stringify(err, null, 2));
              } else {
                  console.log("users::update::success "+JSON.stringify(data) );
              }
          });
        
          console.log(pos);
          docClient.put(params, function (err, data) {
        
              if (err) {
                  console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
              } else {
                  console.log("users::save::success" );                      
              }
          
          });
          });
        handleClick();
      }
      
    })
    
  }
  
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login`
    );
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #FFA500, #ADD8E6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3rem'}}>
        <h1 style={{color: 'white', textShadow: '1px 1px #000000'}}>Food For Thought</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ 
            backgroundColor: 'white', 
            color: '#4285F4', 
            padding: '.5rem 2rem', 
            borderRadius: '.5rem',
            boxShadow: '1px 1px #000000'
          }}
          isSignedIn={true}
        />
      </div>
    </div>
  );
}

function save (email, name, Db) {
  
  var input = {
    "email": email, "name": name, "created_on": new Date().toString(), "inventory": [], "donated": [], "wishlist": [], "latitude": 0, "longitude": 0};
    
  var params = {
      TableName: Db,
      Item:  input
  };
  console.log(pos);
  docClient.put(params, function (err, data) {

      if (err) {
          console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
      } else {
          console.log("users::save::success" );                      
      }
  
  });
}
export default Login;

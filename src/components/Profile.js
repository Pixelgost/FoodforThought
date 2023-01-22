import React from 'react';
import NavBar from './NavBar';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIATWHP2O5ZIHUYX4RT", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
  
let docClient = new AWS.DynamoDB.DocumentClient();

const Button = styled.button`display: flex`;

let wishlist = [];

  
function Profile() {

  function getList(){
    var params = {
      TableName: "FoodForThoughtDB",
      Key: {
      "email": JSON.parse(localStorage.getItem("email"))
      }
      
    };
    let result = [];
    docClient.get(params, function (err, data) {

      if (err) {
          console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
      }
      else {
        result = JSON.parse(JSON.stringify(data));
        console.log(result.Item.wishlist);
        wishlist = result.Item.wishlist;
      }
      docClient.update(params, function (err, data) {
  
        if (err) {
            console.log("users::update::error" + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success::"+JSON.stringify(data) );
        }
    });
    });


  }
  getList();
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{textAlign: 'center', padding: '20px'}}>
        <h1 style={{fontSize: '2em', fontWeight: 'bold'}}>Profile</h1>
        <div style={{lineHeight: '1.5', fontSize: '1.2em'}}>
          Here, you can change your display name, the name that other users can see.
          <div>
            You can view your wishlist
            <div>
              Finally, you can view your stats here as well.
            </div>
          </div>
          <div style={{marginTop: '20px'}}>
            <Button onClick={getList} style={{backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', borderRadius: '5px', alignItems: 'center'}}> Update Location </Button>
            <div>
              <h3 style={{marginTop: '20px'}}>Your current wishlist:</h3>
              <ol>
                {wishlist.map((String) => (
                <li>{String}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );

};
  
export default Profile;
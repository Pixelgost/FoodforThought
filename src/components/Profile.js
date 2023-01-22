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
  console.log(wishlist);


  
  return (
    <><h1>
          Profile
      </h1><><div>
        Here, you can view your wishlist
        <div>
        </div>
      <h3>
        Your current wishlist:
      </h3>
      <ol>
        {wishlist.map((String) => (
          <li>{String}</li>
        ))}
      </ol>
      </div><NavBar />
          </></>
  );
};
  
export default Profile;
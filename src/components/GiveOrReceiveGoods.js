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

const ButtonGroup = styled.div`display: flex;`;
const Button = styled.button`display: flex`;
function GiveOrReceive() {
  function Giving(){
    let textVal = (document.getElementById("entry-box").value);
    document.getElementById("entry-box").value = '';
    var params = {
      TableName: "FoodForThoughtDB",
      Key: { "email": JSON.parse(localStorage.getItem("email")) },
      UpdateExpression: "set #ri = list_append(#ri, :vals)",
      ExpressionAttributeNames: {
        "#ri": "inventory"
      },
      ExpressionAttributeValues: {
        ":vals": [textVal]
      },
      ReturnValues: "ALL_NEW"

    };
    docClient.update(params, function (err, data) {
      if (err) {
          console.log("users::update::error - " + JSON.stringify(err, null, 2));
      } else {
          console.log("users::update::success "+JSON.stringify(data) );
          let name = JSON.parse(localStorage.getItem("name"))
          var input = {
            "Owner": name, "item": textVal, "latitude": JSON.parse(localStorage.getItem("pos")).lat, "longitude": JSON.parse(localStorage.getItem("pos")).lng};
            
          var params = {
              TableName:"FoodForThoughtItems",
              Item:  input
          };
          docClient.put(params, function (err, data) {
        
              if (err) {
                  console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
              } else {
                  console.log("users::save::success" );                      
              }
          
          });
      }
    });
    
  }
  function Wanting(){
    let textVal = (document.getElementById("entry-box").value);
    document.getElementById("entry-box").value = '';
    var params = {
      TableName: "FoodForThoughtDB",
      Key: { "email": JSON.parse(localStorage.getItem("email")) },
      UpdateExpression: "set #ri = list_append(#ri, :vals)",
      ExpressionAttributeNames: {
        "#ri": "wishlist"
      },
      ExpressionAttributeValues: {
        ":vals": [textVal]
      },
      ReturnValues: "ALL_NEW"

    };
    docClient.update(params, function (err, data) {
      if (err) {
          console.log("users::update::error - " + JSON.stringify(err, null, 2));
      } else {
          console.log("users::update::success "+JSON.stringify(data) );
      }
    });
  }
  return (
    <><h1>
          Give Or Receive Goods
      </h1><><div>
        <div>
          <h3>
            Type the goods that you wish to give or receive in the box, along with their quantities, then click on the appropriate button.
          </h3>
        </div>
        <div>
        <TextField id="entry-box" 
        label="" 
        multiline
        variant="outlined"
        fullWidth = "fullWidth" />
      
      
        
        <ButtonGroup>
        <Button onClick={Wanting}> I want to receive these goods </Button>
        <Button onClick={Giving}> I want to donate these goods</Button>
        </ButtonGroup>

        
  

        </div>
      </div><NavBar />
          </></>
  );
};
  
export default GiveOrReceive;
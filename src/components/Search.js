import React from 'react';
import NavBar from './NavBar';
import {Link} from "react-router-dom"
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
function Search() {
  function searchFunction(){
    let query = (document.getElementById("entry-box").value);
    let num = parseFloat(document.getElementById("num-box").value);
    let items = [];
    var params = {
      TableName: "FoodForThoughtItems"
    };
    docClient.scan(params, function (err, data) {
      if (err) {
          console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
      }
      else {
        let pos = JSON.parse(localStorage.getItem("pos"))
        let result = JSON.parse(JSON.stringify(data));
        result.Items.forEach((item, i) =>{
          let dist = (item.latitude-pos.lat) *(item.latitude-pos.lat)
          dist = dist + ((item.longitude-pos.lng) *(item.longitude-pos.lng))
          dist = dist *69
          if(dist <= (num*num) && item.item == query){
            const obj = {
              name: item.item,
              owner: item.Owner,
              distance: dist
            }
            items.push(obj)
          }

        });
        
      }
    });
  }
  return (
    <><h1>
          Give Or Receive Goods
      </h1><><div>
        <div>
          <h3>
            Type the goods that you wish to give or receive in the box, and a max distance (in miles) in the second box.
          </h3>
        </div>
        <div>
        <TextField id="entry-box" 
        label="" 
        multiline
        variant="outlined"
        fullWidth = "fullWidth" />
        <TextField id="num-box" 
        label="" 
        variant="outlined"
        fullWidth = "fullWidth" />
      
        
        <ButtonGroup>
        <Button onClick={searchFunction}> Search </Button>
        </ButtonGroup>

        
  

        </div>
      </div><NavBar />
          </></>
  );
};
  
export default Search;
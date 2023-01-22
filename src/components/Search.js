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
let items = [];
function Search() {
  function searchFunction(){
    let query = (document.getElementById("entry-box").value);
    let num = parseFloat(document.getElementById("num-box").value);
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
            let it = "Name: " + item.item +", Owner: "+ item.Owner +", Distance:" + String(dist);
            items.push(it)
          }
          
        });
        console.log(items)
      }
    });
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <h1 style={{fontSize: '2em', fontWeight: 'bold', textAlign: 'center', margin: '20px'}}>Search for Goods</h1>
      <div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px'}}>
        <div>
          <h3 style={{textAlign: 'center', marginBottom: '20px'}}>
            Type the goods that you wish to give or receive in the box, and a max distance (in miles) in the second box.
          </h3>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TextField 
            id="entry-box" 
            label="Goods" 
            multiline
            variant="outlined"
            fullWidth 
            style={{marginBottom: '20px'}}
          />
          <TextField 
            id="num-box" 
            label="Max Distance (in miles)" 
            variant="outlined"
            fullWidth 
            style={{marginBottom: '20px'}}
          />
          <ButtonGroup>
            <Button onClick={searchFunction} style={{backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', borderRadius: '5px'}}> Search </Button>
          </ButtonGroup>


        </div>
      </div>
      <NavBar />
    </div>
  );

};
  
export default Search;
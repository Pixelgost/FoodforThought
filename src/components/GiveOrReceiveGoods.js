import React from 'react';
import NavBar from './NavBar';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';


const ButtonGroup = styled.div`display: flex;`;
const Button = styled.button`display: flex`;
function GiveOrReceive() {
  function Giving(){
          
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
        <Button onClick={Giving}> I want to receive these goods </Button>
        <Button onClick={Giving}> I want to donate these goods</Button>
        </ButtonGroup>

        
  

        </div>
      </div><NavBar />
          </></>
  );
};
  
export default GiveOrReceive;
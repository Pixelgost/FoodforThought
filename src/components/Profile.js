import React from 'react';
import NavBar from './NavBar';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const Button = styled.button`display: flex`;
  
function Profile() {
  function UpdateName() {

  }
  function UpdateLocation() {

  }
  function SubmitWishlist() {

  }
  return (
    <><h1>
          Profile
      </h1><><div>
        Here, you can change your display name, the name that other users can see.
        <div>
        </div>
        You can also re-upate your current location, and provide a wishlist for the goods that you desire.
        <div>
        </div>
        Finally, you can view your stats here as well.
        <div>
        </div>
        <TextField id="new-name" 
        label="Enter your new name here" 
        size = "small"
        variant="outlined"/>

      <Button onClick={UpdateName}> Update Name </Button>
      <div>
      </div>
      <Button onClick={UpdateLocation}> Update Location </Button>
      <div>
      </div>
      <TextField id="wish-list" 
        label="Enter the goods on your wishlist here" 
        multiline
        variant="outlined"
        fullWidth = "fullWidth"/>
      <Button onClick={SubmitWishlist}> Submit Wishlist </Button>
      <div>
      </div>
      <h3>
        Your current stats:
      </h3>
      
      </div><NavBar />
          </></>
  );
};
  
export default Profile;
import React from 'react';
import NavBar from './NavBar';
  
function Profile() {
  return (
    <><h1>
          Profile
      </h1><><div>
        Here, you can change your display name, the name that other users can see.
      <div>
        You can also view your reputation, or star rating. You earn reputation by successfully completing donations.
        <div>
        </div>
        The more donations you do and the more consistent you are, the more reputation you earn.
        <div>
        Note that if your reputation drops too low, your account may be suspended.
        </div>

        <h3>
          Your current reputation is: 0.0
        </h3>

      </div>
      </div><NavBar />
          </></>
  );
};
  
export default Profile;
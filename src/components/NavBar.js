import React from 'react';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavBarElements';

const NavBar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/Home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/Profile' activeStyle>
            Profile
          </NavLink>
          <NavLink to='/GiveOrReceiveGoods' activeStyle>
            Give/Receive Goods
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/react-google-authentication'>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;
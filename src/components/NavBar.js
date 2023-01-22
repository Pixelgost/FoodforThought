import React from 'react';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
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
          <NavLink to='/Search' activeStyle>
            Search
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
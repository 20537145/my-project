import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import Search from "../components/Search";


function NavLayout() {
  let [clicked,setClicked]=useState(false);

  let handleClick=()=>{
  
     if (clicked === false) {
    setClicked(true)
   }else{
    setClicked(false)
   }
 
  }
  return (
    <header>
      <nav >
      <Link to="/" className="logo">
        <img width={"90px"} src={logo} alt="" />
      </Link>
        <div>
        <ul id="navbar" className={clicked ? '#navbar active' : '#navbar'}>
          <li>
            <Link  to="about">About</Link>
          </li>
          <li>
            <Link  to="shop">Shop</Link>
          </li>
          <li>
            <Link  to="shop">Shop</Link>
          </li>
          <li>
            <Link   to="shop">Shop</Link>
          </li>
          <li>
            <Link  to="shop">Shop</Link>
          </li>
         </ul>
        </div>
        <div className="toggle-menu" onClick={handleClick}>
          <i
          className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          <p className="clearfix"></p>
        </div>
          <Search/>
      </nav>
      <Outlet />
    
    </header>
  );
}

export default NavLayout;

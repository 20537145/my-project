import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const UserForms = () => {
  const location = useLocation()
const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth);
  const logoutHandler = () => {
    dispatch(logout());
  };
  const background = location.pathname === "/";

  return (
    <div className='drop-container' >
    
      <ul className={background?'ul_container':''}>
        <li><Link to='profile'>profil</Link></li>
        {isAuth?(<li onClick={logoutHandler}>déconnecter</li>):(<li> <Link to='login'>connecter</Link></li>)}
        
      </ul>
    </div>
  );
};

export default UserForms;

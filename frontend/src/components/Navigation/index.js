import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import logo from './logo2.png'
import SignupModal from '../SignupFormModal/index';

//import DemoUser from '../DemoUser/demoUser';


const StyledNavLink = (props) => {
  return <NavLink {...props} className={`${props.className} my-navlink-style`}/>
}

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser?.id != null) {
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <StyledNavLink to="/signup">Sign Up</StyledNavLink> */}
        <SignupModal />
      </>
    );
  }

  return (

    <header className='nav-class'>
      <li className='nav-li home'>
        <div className='logo-image'>
          <img src={logo} className="logo-image"/>
        </div>
        <StyledNavLink exact to="/">Homebnb</StyledNavLink>
      </li>
      <li className='nav-li profile'>
        {isLoaded && sessionLinks}
      </li>
  </header>

);
}

export default Navigation;

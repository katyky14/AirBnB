import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import logo from './logo2.png'

//import DemoUser from '../DemoUser/demoUser';


const StyledNavLink = (props) => {
  return <NavLink {...props} className={`${props.className} my-navlink-style`}/>
}

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // console.log('sessionUser', sessionUser);


  let sessionLinks;
  if (sessionUser?.id != null) {
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <StyledNavLink to="/signup">Sign Up</StyledNavLink>
      </>
    );
  }

  return (

    <ul className='nav-class'>
      <li className='nav-li'>
        <div className='logo-image'>
          {/* <img src="./logo2.png" alt='logo'/> */}
          <img src={logo} className="logo-image"/>
        </div>
        <StyledNavLink exact to="/">Homebnb</StyledNavLink>
      </li>
      <li className='nav-li'>
        {isLoaded && sessionLinks}
      </li>
  </ul>

);
// <ul className='nav-class'>
//   <li className='nav-li'>
//     <NavLink exact to="/">Home</NavLink>
//     {isLoaded && sessionLinks}
//   </li>
// </ul>
}

export default Navigation;

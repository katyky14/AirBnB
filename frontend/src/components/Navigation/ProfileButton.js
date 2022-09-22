import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

import '../Navigation/profile.css'

const StyledNavLink2 = (props) => {
  return <NavLink {...props} className={`${props.className} navlink-style-div`} />
}

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <li className="li-host">
        <StyledNavLink2 to='/spots/new'>Become a Host</StyledNavLink2>
      </li>
      <li>
        <button onClick={openMenu} className="button-user">
          <i className="fas fa-user-circle" />
        </button>
      </li>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-content">{user.username}</li>
          <li className="profile-content profile-line-sep">{user.email}</li>
          <li className="profile-content">
            <div className="test-hover">
                <StyledNavLink2 to={`/reviews`} >
                  My Reviews
                </StyledNavLink2>
            </div>
          </li>
          <li className="profile-content">
              <button className="button-style">
                <StyledNavLink2 to={`/spots/user`} >
                  My Spots
                </StyledNavLink2>
              </button>
          </li>

          <li className="profile-content">
              <button onClick={logout} className="button-style">Log Out</button>
          </li>

        </ul>
      )}
    </>
  );
}

export default ProfileButton;

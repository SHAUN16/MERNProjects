import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { FaUserCircle, FaCaretDown,FaAlignLeft } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {user, role,logout,name,email } = useGlobalContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        {/* {user && (<div className='btn-container'>
            
          </div>)} */}
        <img src={logo} alt='jobs app' />
        {user && (<>
          
          <div className='btn-container'>
            <button className='btn' onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle />
              {name}
              <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <Link to={`/dashboard`}>
            <button className='dropdown-btn'>
              Dashboard
            </button>
            </Link>
            <Link to={`/applies`}>
            <button className='dropdown-btn'>
              Applications
            </button>
            </Link>
            <Link to={`/profile`}>
            <button className='dropdown-btn'>
              My Profile
            </button>
            </Link>
            <Link to={`/resume`}>
            <button className='dropdown-btn'>
              My Resume
            </button>
            </Link>
            {
            role == "admin" && <Link to={`/add-job`}>
            <button className='dropdown-btn'>
              Add Job
            </button>
            </Link>
            }
              <button onClick={() => logout()} className='dropdown-btn'>
                logout
              </button>

            </div>
          </div>
        </>)}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .btn1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }


  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--white);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    transition: var(--transition);
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export default Navbar;

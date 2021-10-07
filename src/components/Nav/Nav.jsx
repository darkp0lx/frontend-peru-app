import { useRef, useState } from 'react'
import styled from 'styled-components'
import { AiFillExperiment } from 'react-icons/ai'
import { BiMenuAltLeft, BiSearchAlt2 } from 'react-icons/bi'
import { FaHome, FaUserAstronaut, FaArrowAltCircleLeft } from 'react-icons/fa'
import { HiChatAlt } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../store/stateProvider'
import { actionTypes } from '../../store/reducer'

export const Nav = () => {
  const [show, setShow] = useState(false)
  const [{ user }, dispatch] = useStateValue()

  const getOutUser = () => {
    dispatch({
      type: actionTypes.CHANGE_USER,
      user: null
    })
  }
  return (
    <Container>
      <div className={`sidebar ${show ? 'open' : ''}`}>
        <div className={`logo-details`}>
          <AiFillExperiment />
          <div className='logo_name'>Peru App</div>
          <BiMenuAltLeft
            id='btn'
            onClick={() => {
              setShow(!show)
            }}
          />
        </div>
        <ul className='nav-list'>
          <li>
            <BiSearchAlt2
              className='search'
              onClick={() => {
                setShow(!show)
              }}
            />
            <input
              className={`input ${show ? 'open' : ''}`}
              type='text'
              placeholder='Search...'
            />
            <span className='tooltip'>Search</span>
          </li>
          <li>
            <Link to='/perfil'>
              <FaUserAstronaut />
              <span className={`links_name ${show ? 'open' : ''}`}>
                Mi perfil
              </span>
              <span className='tooltip'>Mi perfil</span>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <FaHome />
              <span className={`links_name ${show ? 'open' : ''}`}>Home</span>
              <span className='tooltip'>Home</span>
            </Link>
          </li>
          <li>
            <Link to='/chat'>
              <HiChatAlt />
              <span className={`links_name ${show ? 'open' : ''}`}>chat</span>
            </Link>
            <span className='tooltip'>chat</span>
          </li>
          <li>
            <Link to='' onClick={getOutUser}>
              <FaArrowAltCircleLeft />
              <span className={`links_name ${show ? 'open' : ''}`}>salir</span>
              <span className='tooltip'>salir</span>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  )
}
const Container = styled.div`
  .sidebar li a {
    width: 100% !important;
    height: 75px !important
;
  }
  .search {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .sidebar li a:hover {
    width: 100%;
    height: 75px;
  }
  svg {
    color: white;
  }
  .input.open {
    display: block;
    width: 180px !important;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 20px;
    background: #11101d;
    padding: 6px 14px;
    z-index: 0;
    transition: all 0.5s ease;
    @media (min-width: 768px) {
      width: 60px;
    }
  }
  .sidebar.open {
    width: 250px;
  }
  .sidebar .logo-details {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: end;
  }
  .sidebar .logo-details .icon {
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar .logo-details .logo_name {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details .icon,
  .sidebar.open .logo-details .logo_name {
    opacity: 1;
  }
  .sidebar .logo-details #btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details #btn {
    text-align: right;
  }
  .sidebar i {
    color: #fff;
    height: 60px;
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .sidebar .nav-list {
    margin-top: 20px;
    height: 100%;
    padding: 0;
  }
  .sidebar li {
    position: relative;
    margin: 8px 0;
    list-style: none;
  }
  .sidebar li .tooltip {
    position: absolute;
    top: -20px;
    left: calc(100% + 15px);
    z-index: 3;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar li {
    display: flex;
    justify-content: center;
  }
  .sidebar li:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
    top: 50%;
    transform: translateY(-50%);
  }
  .sidebar.open li .tooltip {
    display: none;
  }
  .sidebar input {
    font-size: 15px;
    color: #fff;
    font-weight: 400;
    outline: none;
    height: 50px;
    width: 100%;
    width: 0;
    border: none;
    border-radius: 12px;
    transition: all 0.5s ease;
    background: #1d1b31;
  }
  .sidebar.open input {
    padding: 0 20px 0 50px;
    width: 100%;
  }
  .sidebar .bx-search {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 22px;
    background: #1d1b31;
    color: #fff;
  }
  .sidebar.open .bx-search:hover {
    background: #1d1b31;
    color: #fff;
  }
  .sidebar .bx-search:hover {
    background: #fff;
    color: #11101d;
  }
  .sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    background: #11101d;
    justify-content: center;
  }
  .sidebar li a:hover {
    background: #fff;
    color: #11101d;
  }
  .sidebar svg {
    width: 32px;
    height: 32px;
  }
  .sidebar li a .links_name {
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
    display: none;
  }
  .sidebar.open li a .links_name {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar li a:hover .links_name,
  .sidebar li a:hover svg {
    transition: all 0.5s ease;
    color: #11101d;
  }

  .sidebar li.profile {
    position: fixed;
    height: 60px;
    width: 60px;
    left: 0;
    bottom: 20px;
    padding: 10px 14px;
    background: #1d1b31;
    transition: all 0.5s ease;
    overflow: hidden;
    @media (min-width: 768px) {
      width: 20px;
    }
  }
  .sidebar.open li.profile {
    width: 250px;
  }
  .sidebar li .profile-details {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .sidebar li img {
    height: 45px;
    width: 45px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 10px;
  }
  .sidebar li.profile .name,
  .sidebar li.profile .job {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    white-space: nowrap;
  }
  .sidebar li.profile .job {
    font-size: 12px;
  }
  .sidebar .profile #log_out {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #1d1b31;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 0px;
    transition: all 0.5s ease;
  }
  .sidebar.open .profile #log_out {
    width: 50px;
    background: none;
  }
  .home-section {
    position: relative;
    background: #e4e9f7;
    min-height: 100vh;
    top: 0;
    left: 78px;
    width: calc(100% - 78px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .sidebar.open ~ .home-section {
    left: 250px;
    width: calc(100% - 250px);
  }
  .home-section .text {
    display: inline-block;
    color: #11101d;
    font-size: 25px;
    font-weight: 500;
    margin: 18px;
  }
  @media (max-width: 420px) {
    .sidebar li .tooltip {
      display: none;
    }
  }
`

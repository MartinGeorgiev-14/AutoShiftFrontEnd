import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import UserNav from './UserNav'
import Logo from './Logo'
import { useSelector } from 'react-redux'


const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    background-color: #f8f9fa;
    padding: 1rem 3rem;
    margin: 0 auto;
    margin-top: 3rem;
    z-index: 1;

    a{
        text-decoration: none;
        transition: color 0.3s ease;
        color: black;
    }

    a:hover{
        text-decoration: underline;
    }

    i{
     display: none;
    }

    @media screen and (max-width: 650px) {
        & {
            margin: 0 auto;
            width: 100%;
        }
        & div:not(:first-child) {display: none}
        & a.icon {
            float: right;
            display: block;
        }
    }

    @media screen and (max-width: 650px) {
    &.responsive {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 0;
        transition: 1s ease-in-out .5s
    }
    &.responsive a.icon {
        position: absolute;
        right: 0;
        top: 0;
    }
    &.responsive div {
        display: flex;
        flex-direction: column;
        justify-content: none;
        align-items: none;
        gap: 2rem;
    }

    .usernav{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: none;
        gap: 2rem;
        margin-top: 2rem;
    }
}
`

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 7vw;
`

const Navigation = () => {

 

    return (
        <Nav className='topnav'>
            <Logo className='active'/>
            
            <Div>
                <Link to={'/'}>Home</Link>
                <Link to={'/search'}>Search</Link>
                <Link to={'/about'}>About</Link>
            </Div>
            <UserNav className='usernav'/>
            {/* <a href="javascript:void(0);" className='icon' onClick={handleDropdown}>
                    <i className='icon'>show</i>
            </a> */}
        </Nav>
    )
}

export default Navigation
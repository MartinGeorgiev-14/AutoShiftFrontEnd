import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import UserNav from './UserNav'
import Logo from './Logo'
import { useSelector } from 'react-redux'






const Navigation = () => {

    const user = useSelector(u => u.user)

    return (
        <div className='nav'>
            <h1 className='text-center lg:mt-5 lg:text-shadow-lg'>AutoShift</h1>
            
            <div className='top-nav'>

                <div className='inner-nav'>
                    <Link className='link' to={'/'}>Home</Link>
                    <Link className='link' to={'/about'}>About</Link>
                    {user.accessToken && <>
                    <Link className='link' to={'/chatList'}>Chat</Link>
                    <Link className='link' to={'/favorite/filters'}>Favorite Filters</Link>
                    <Link className='link' to={'/favorite/listings'}>Favorite Listings</Link>
                    </>}
                    
                </div>
                <UserNav/>
            </div>
        </div>
    )
}

export default Navigation
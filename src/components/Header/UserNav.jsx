import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { setUser, clearUser } from "../../reducers/userReducer"
import { persistor } from "../../configure/configureStore"
import { useNavigate } from "react-router-dom"

const UserNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(o => o.user)
    const [isHovered, setIsHovered] = useState(false) 
    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(clearUser())
        persistor.purge()
        dispatch({ type: 'RESET_APP' })
        navigate('/')
    }
    
    return(
        <div className='user-nav'>
            {user.accessToken ? 
                <div className="lg:flex items-center lg:gap-5">
                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <Link>{user.username}</Link>
                        {
                            isHovered && <div className="lg:absolute lg:flex lg:flex-col lg:gap-2">
                                <Link className='link' to={'/myListings'}>My Listings</Link>
                                <Link className='link' to={'/createListing'}>Create Listing</Link>
                            </div>
                        }
                    </div>
                    <p className="link cursor-pointer" onClick={handleLogout}>Log out</p>
                </div>:
                <div className="lg:flex items-center lg:gap-5">
                    <Link className='link' to={'/login'}>Login</Link>
                    <Link className='link' to={'/register'}>Register</Link>
                </div>
            }
        </div>
    )

}

export default UserNav
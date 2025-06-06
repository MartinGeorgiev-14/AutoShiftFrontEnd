import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { setUser, clearUser } from "../../reducers/userReducer"
import { persistor } from "../../configure/configureStore"


// const Button = styled.button`
//     background-color: #E2323D;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 40px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//     color: white;

//     &:hover{
//         background-color: #de525b;
//     }
// `
// const DropdownDiv = styled.div`
//     position: relative;
//     display: 'inline-block';
// `
// const HoveredDiv = styled.div`
//     position: absolute;
//     top: 1.2rem;
//     z-index: 2;
//     display: flex;
//     flex-direction: column;
//     width: 10rem;
//     gap: 0.2rem;

//     a{
//         background: white;
//         padding: 0.4rem;
//         border-radius: 3px;
//         border: 1px black solid;
//     }
    
// `

const UserNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(o => o.user)
    const [isHovered, setIsHovered] = useState(false) 

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(clearUser())
        persistor.purge()
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
                    <p onClick={handleLogout}>Log out</p>
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
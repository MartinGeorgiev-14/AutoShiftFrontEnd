import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { setUser, clearUser } from "../../reducers/userReducer"
import { persistor } from "../../configure/configureStore"


const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const Button = styled.button`
    background-color: #E2323D;
    border: none;
    padding: 10px 20px;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: white;

    &:hover{
        background-color: #de525b;
    }
`
const DropdownDiv = styled.div`
    position: relative;
    display: 'inline-block';
`
const HoveredDiv = styled.div`
    position: absolute;
    top: 1.2rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 10rem;
    gap: 0.2rem;

    a{
        background: white;
        padding: 0.4rem;
        border-radius: 3px;
        border: 1px black solid;
    }
    
`

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
        <>
            {user.accessToken ? 
                <Div>
                    <DropdownDiv onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <Link to={'/profile'}>{user.username}</Link>
                        {
                            isHovered && <HoveredDiv>
                                <Link to={'/myListings'}>My Listings</Link>
                                <Link to={'/createListing'}>Create Listing</Link>
                            </HoveredDiv>
                        }
                    </DropdownDiv>
                    <Button onClick={handleLogout}>Log out</Button>
                </Div>:
                <Div>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}><Button>Register</Button></Link>
                </Div>
            }
        </>
    )

}

export default UserNav
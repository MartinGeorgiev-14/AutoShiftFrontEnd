import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { setUser, clearUser } from "../../reducers/userReducer"
import { useEffect } from "react"
import authService from "../../services/authenticationsService"

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

const UserNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(o => o.user)

    useEffect(() => {
        authService.getUserInfo().then(result => {
            dispatch(setUser(result))
        })
    }, [])

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(clearUser())
    }
  
    return(
        <>
            {user.accessToken ? 
                <Div>
                    <Link to={'/profile'}>{user.username}</Link>
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
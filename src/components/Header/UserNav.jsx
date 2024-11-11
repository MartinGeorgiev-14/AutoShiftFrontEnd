import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

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
    const [user, setUser] = useState("")

    return(
        <>
            {user ? 
                <Div>
                    <Link to={'/profile'}>Profile</Link>
                    <Button>Log out</Button>
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
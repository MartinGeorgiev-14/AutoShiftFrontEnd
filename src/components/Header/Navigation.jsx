import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 7rem;

    a{
        text-decoration: none;
        transition: color 0.3s ease;
        color: black;
    }

    a:hover{
        text-decoration: underline;
    }
`
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

const registerButton = {
    color: 'white',
    backgroundColor: '#E2323D',
    padding: '10px 20px',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
}

const Navigation = () => {
    const [user, setUser] = useState(null)

    return (
        <Nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/detailedSearch'}>Search</Link>
            <Link to={'/about'}>About</Link>
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
            
        </Nav>
    )
}

export default Navigation
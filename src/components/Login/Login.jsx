import styled from "styled-components"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import authService from "../../services/authenticationsService"
import { useDispatch } from "react-redux"
import { setUser } from "../../reducers/userReducer"
import { useNavigate } from "react-router"

const Form = styled.form`
`
const Div = styled.div`
`
const Label = styled.label`
`
const Input = styled.input`
`
const Button = styled.button`
`

const Login = () => {
    useDocumentTitle("Login")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logIn = async (event) => {
        event.preventDefault()
      
        try {
            const result = await authService.login({
                username: event.target[0].value,
                password: event.target[1].value,
            })
    
            dispatch(setUser(result))
            localStorage.setItem("token", JSON.stringify(result.accessToken))
            navigate(`/`)
        } catch (error) {
            alert(error.message)
        }
    }

return(
    <Div>
        <h1>Login</h1>
        <Form onSubmit={logIn}>
            <Div>
                <Label>Username</Label>
                <Input type="text" autoComplete="username"/>
            </Div>
            <Div>
                <Label>Password</Label>
                <Input type="password" autoComplete="current-password"/>
            </Div>
            <Button type="submit">Login</Button>
        </Form>
    </Div>
 
)

}

export default Login
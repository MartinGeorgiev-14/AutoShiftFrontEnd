import styled from "styled-components"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import authService from "../../services/authenticationsService"
import { useDispatch } from "react-redux"
import { setUser } from "../../reducers/userReducer"
import { useNavigate } from "react-router"
import SingleInput from "../Register/SingleInput"
import { displayNotification } from "../../reducers/notificationReducer"

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Div = styled.div`
    background-color: #F8F9FA;
    display: flex;
    align-items:center;
    flex-direction: column;
    width: 40%;
    margin: 2rem auto;
    border-radius: 3px;
    padding: 2rem;
    gap: 1rem;
`
const Button = styled.button`
    background-color: #E2323D;
    border: none;
    padding: 10px 20px;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 50%;
    margin: 0 auto;
    font-size: 1.2rem;
    color: white;

    &:hover{
        background-color:rgb(220, 87, 96);
    }
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
    
            console.log(result, 'login result:')
            dispatch(setUser(result))
            navigate(`/`)
        } catch (error) {
            dispatch(displayNotification({type: "error", message: "Invalid username or password"}))
        }
    }

return(
    <Div>
        <h1>Login</h1>
        <Form onSubmit={logIn}>
            <SingleInput label={'Username'} type={"text"} name={"username"} autoComplete={"username"}/>
            <SingleInput label={'Password'} type={"password"} name={"password"} autoComplete={"new-password"}/>
            <Button type="submit">Login</Button>
        </Form>
    </Div>
 
)

}

export default Login
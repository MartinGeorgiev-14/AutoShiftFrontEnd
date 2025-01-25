import styled from "styled-components"
import SingleInput from "./SingleInput"
import authService from "../../services/authenticationsService"
import { useDispatch } from "react-redux"
import { displayNotification } from "../../reducers/notificationReducer"

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
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

const Register = () => {
const dispatch = useDispatch()

    const handleRegister = async (event) => {
        event.preventDefault()

       try {
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            phone: event.target.number.value
        }

        const result = await authService.register(data)
       } catch (error) {
        dispatch(displayNotification({type: "error", message: error.message}))
       } 
       
        

    }

    return(
        <Div>
            <Form onSubmit={handleRegister}>
                <SingleInput label={'Username'} type={"text"} name={"username"} autoComplete={"username"}/>
                <SingleInput label={'Password'} type={"password"} name={"password"} autoComplete={"new-password"}/>
                <SingleInput label={'Retype Password'} type={"password"} name={"repassword"} autoComplete={"off"}/>
                <SingleInput label={'Email'} type={"email"} name={"email"} autoComplete={"email"}/>
                <SingleInput label={'First name'} type={"text"} name={"firstName"} autoComplete={"given-name"}/>
                <SingleInput label={'Last name'} type={"text"} name={"lastName"} autoComplete={"family-name"}/>
                <SingleInput label={'Phone number'} type={"tel"} name={"number"} autoComplete={"tel"}/>
                <Button type="submit">Register</Button>
            </Form>
        </Div>
       
    )
} 

export default Register
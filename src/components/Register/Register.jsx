import styled from "styled-components"
import SingleInput from "./SingleInput"
import authService from "../../services/authenticationsService"
import { useDispatch } from "react-redux"
import { displayNotification } from "../../reducers/notificationReducer"
import { useNavigate } from "react-router"
import useDocumentTitle from "../../hooks/useDocumentTitle"

const Register = () => {
    useDocumentTitle("Register")
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

        if(result.status === 200){
            navigate("/login")
        } 
       } catch (error) {
        dispatch(displayNotification({type: "error", message: error.message}))
       } 
       
        

    }

    return(
        <div className="login-register-container">
            <h2 className="page-heading">Register</h2>
            <form className="inner-login-register-container" onSubmit={handleRegister}>
                <SingleInput label={'Username'} type={"text"} name={"username"} autoComplete={"username"}/>
                <SingleInput label={'Password'} type={"password"} name={"password"} autoComplete={"new-password"}/>
                <SingleInput label={'Retype Password'} type={"password"} name={"repassword"} autoComplete={"off"}/>
                <SingleInput label={'Email'} type={"email"} name={"email"} autoComplete={"email"}/>
                <SingleInput label={'First name'} type={"text"} name={"firstName"} autoComplete={"given-name"}/>
                <SingleInput label={'Last name'} type={"text"} name={"lastName"} autoComplete={"family-name"}/>
                <SingleInput label={'Phone number'} type={"tel"} name={"number"} autoComplete={"tel"}/>
                <button className="login-register-button" type="submit">Register</button>
            </form>
        </div>
       
    )
} 

export default Register
import styled from "styled-components"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import authService from "../../services/authenticationsService"
import { useDispatch } from "react-redux"
import { setUser } from "../../reducers/userReducer"
import { useNavigate } from "react-router"
import SingleInput from "../Register/SingleInput"
import { displayNotification } from "../../reducers/notificationReducer"
import { useSelector } from "react-redux"

const Login = () => {
    useDocumentTitle("Login")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(u => u.user)

    if(user.accessToken){
        navigate('/')
    }

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
    <div className="login-register-container">
        <h2 className="page-heading">Login</h2>
        <form className="inner-login-register-container" onSubmit={logIn}>
            <SingleInput label={'Username'} type={"text"} name={"username"} autoComplete={"username"}/>
            <SingleInput label={'Password'} type={"password"} name={"password"} autoComplete={"new-password"}/>
            <button className="login-register-button" type="submit">Login</button>
        </form>
    </div>
 
)

}

export default Login
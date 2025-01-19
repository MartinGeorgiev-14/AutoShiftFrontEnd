import styled from "styled-components"
import SingleInput from "./SingleInput"
import authService from "../../services/authenticationsService"

const Form = styled.form`
`

const Button = styled.button`

`

const Register = () => {

    const handleRegister = async (event) => {
        event.preventDefault()

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            phone: event.target.number.value
        }

        const result = await authService.register(data)
        console.log(result)

    }

    return(
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
    )
} 

export default Register
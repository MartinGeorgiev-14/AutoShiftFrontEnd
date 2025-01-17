import styled from "styled-components"
import useDocumentTitle from "../../hooks/useDocumentTitle"

const Form = styled.div`
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

    const logIn = (event) => {
        event.preventDefault()

    }

return(
    <Div>
        <h1>Login</h1>
        <Form onSubmit={logIn}>
            <Div>
                <Label>Username</Label>
                <Input type="text" />
            </Div>
            <Div>
                <Label>Password</Label>
                <Input type="password"/>
            </Div>
            <Button type="submit">Login</Button>
        </Form>
    </Div>
 
)

}

export default Login
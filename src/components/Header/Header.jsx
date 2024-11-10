import styled from 'styled-components'
import Navigation from './Navigation'
import Logo from './Logo'

const HeaderStyled = styled.header`
    background-color: #f8f9fa;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 3rem
`

const Header = () => {
// Use Tesla style header
    return (
        <HeaderStyled>
            <Logo/>
            <Navigation />
        </HeaderStyled>
    )
}

export default Header
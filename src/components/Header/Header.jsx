import styled from 'styled-components'
import Navigation from './Navigation'

const HeaderStyled = styled.header`
`

const Header = () => {
// Use Tesla style header
    return (
        <HeaderStyled>
            <Navigation />
        </HeaderStyled>
    )
}

export default Header
import styled from "styled-components";
import Logo from "../Header/Logo";

const Container = styled.div`
    background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-top: 10rem;
`

const Footer = () => {

    return(
        <div className="footer">
           <Logo/>
        </div>
    )
}

export default Footer;
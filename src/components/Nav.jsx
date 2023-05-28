import styled from "styled-components";
import arrowBtn from "../arrow-btn.png"
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();

    return (
        <NavContainer>
            {window.location.pathname !== '/' &&
                    <img
                        data-test="go-home-header-btn"
                        onClick={() => navigate(-1)}
                        src={arrowBtn}
                        alt="Return" 
                    />
            }
            CINEFLEX
        </NavContainer>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }

    img {
        position: absolute;
        top: 25px;
        left: 20px;
        cursor: pointer;
    }
`
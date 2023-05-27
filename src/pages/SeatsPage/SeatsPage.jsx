import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import React from "react";
import SeatItem from "../../components/SeatItem"

export default function SeatsPage() {
    const { idSession } = useParams();
    axios.defaults.headers.common["Authorization"] = "iEdc61mkRad7o79TwQ6jAJSe";
    const [session, setSession] = React.useState({seats: []});

    React.useEffect(() => {
		axios
            .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`)
            .then(response => {setSession(response.data); console.log(response.data)})
            .catch((error) => console.log(error));
	}, []);

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map((seat, index) => (
                    <SeatItem seat={seat} key={index}></SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status="selected"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="available"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="unavailable"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const CaptionCircle = styled.div`
    border: 1px solid ${props => {
        switch (props.status) {
            case "available":
                return "#7B8B99";
            case "selected":
                return "#0E7D71";
            default:
                return "#F7C52B";
        }
    }};
    background-color: ${props => {
        switch (props.status) {
            case "available":
                return "#C3CFD9";
            case "selected":
                return "#1AAE9E";
            default:
                return "#FBE192";
        }
    }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
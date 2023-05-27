import styled from "styled-components"
import { useParams } from 'react-router-dom';
import axios from "axios";
import React from "react";
import SessionContainer from "../../components/SessionContainer"

export default function SessionsPage() {
    const { idMovie } = useParams();
    axios.defaults.headers.common["Authorization"] = "iEdc61mkRad7o79TwQ6jAJSe";
    const [movie, setMovie] = React.useState({days: []});

    React.useEffect(() => {
		axios
            .get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`)
            .then(response => {setMovie(response.data)})
            .catch((error) => console.log(error));
	}, []);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {movie.days.map((day, index) => (
                    <SessionContainer key={index} sessionInfo={day}></SessionContainer>
                ))}
            </div>

            <FooterContainer>
                <div>
                    <img src={movie.posterURL} alt={movie.title} />
                </div>
                <div>
                    <p>{movie.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
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
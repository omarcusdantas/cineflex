import styled from "styled-components"
import { useParams } from 'react-router-dom';
import axios from "axios";
import React from "react";
import SessionContainer from "../../components/SessionContainer"
import Footer from "../../components/Footer"

export default function SessionsPage() {
    const { idMovie } = useParams();
    const [movie, setMovie] = React.useState({days: []});

    React.useEffect(() => {
		axios
            .get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`)
            .then(response => {setMovie(response.data);})
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

            <Footer movieInfo={movie}></Footer>

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
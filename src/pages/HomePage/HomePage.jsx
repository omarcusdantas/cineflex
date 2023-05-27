import styled from "styled-components"
import axios from 'axios';
import React from "react";
import MovieContainer from "../../components/MovieContainer"

export default function HomePage() {
    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
		axios
            .get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
            .then(response => {setMovies(response.data)})
            .catch((error) => console.log(error));
	}, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map((movie, index) => (
                        <MovieContainer key={index} movieInfo={movie}></MovieContainer>
                ))}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`

import styled from "styled-components"
import { Link } from "react-router-dom";

export default function SessionContainer({sessionInfo}) { 
    return (
        <Container data-test="movie-day">
            {sessionInfo.weekday} - {sessionInfo.date}
            <ButtonsContainer>
                {sessionInfo.showtimes.map((time, index) => (
                    <Link to={`/assentos/${time.id}`} key={index}>
                        <button data-test="showtime">{time.name}</button>
                    </Link>
                ))}
            </ButtonsContainer>
        </Container>
    ) 
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    gap: 20px;
    a {
        text-decoration: none;
    }
`
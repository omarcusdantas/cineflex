import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import React from "react";
import SeatItem from "../../components/SeatItem"
import BuyForm from "../../components/BuyForm"
import Footer from "../../components/Footer"
import CaptionContainer from "../../components/CaptionContainer"

export default function SeatsPage({setOrderInfo}) {
    const { idSession } = useParams();
    const [session, setSession] = React.useState({seats: []});
    const [seatsToBuy, setSeatsToBuy] = React.useState({names: [], ids: []});

    React.useEffect(() => {
		axios
            .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`)
            .then(response => {setSession(response.data)})
            .catch((error) => console.log(error));
	}, []);

    function manageSeats(seat) {
        const indexToRemove = seatsToBuy.ids.indexOf(seat.id);
        if (indexToRemove !== -1) {
            const updatedIds = [...seatsToBuy.ids];
            const updatedNames = [...seatsToBuy.names];
            updatedIds.splice(indexToRemove, 1);
            updatedNames.splice(indexToRemove, 1);
            setSeatsToBuy({ names: updatedNames, ids: updatedIds });
            return;
        }
        setSeatsToBuy({
            names: [...seatsToBuy.names, seat.name],
            ids: [...seatsToBuy.ids, seat.id],
        });
      }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map((seat, index) => (
                    <SeatItem seat={seat} key={index} handleClick={manageSeats}></SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer></CaptionContainer>

            <BuyForm 
                seatsList={seatsToBuy} 
                setOrderInfo={setOrderInfo}
                sessionInfo={session}
            ></BuyForm>

            <Footer movieInfo={session.movie} session={{time: session.name, day: session.day}}></Footer>

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

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import React from "react";
import SeatItem from "../../components/SeatItem"
import BuyForm from "../../components/BuyForm"
import Footer from "../../components/Footer"

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
        const indexToRemove = seatsToBuy.ids.indexOf(seat);
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
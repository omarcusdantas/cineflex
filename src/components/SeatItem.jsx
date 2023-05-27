import styled from "styled-components"
import React from "react";

export default function SeatItem({seat}) {
    const [status, setStatus] = React.useState(seat.isAvailable? "available" : "unavailable");

    function selectSeat() {
        if (status === "unavailable") {
            alert("Esse assento não está disponível");
            return;
        }
        else if (status === "available") {
            setStatus("selected")
            return;
        }
        setStatus("available");
    }

    return (
        <Container status={status} onClick={selectSeat}>
            {seat.name}
        </Container>
    ) 
}

const Container = styled.div`
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
    cursor: ${props => (props.status === "unavailable" ? "default" : "pointer")};
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
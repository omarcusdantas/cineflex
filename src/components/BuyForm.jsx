import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BuyForm({ seatsList, setOrderInfo, sessionInfo }) {
    const navigate = useNavigate();
    const [inputName, setInputName] = React.useState("");
    const [inputCpf, setInputCpf] = React.useState("");

    function buyTickets(event) {
        event.preventDefault();

        const data = {
            ids: seatsList.ids,
            name: inputName,
            cpf: inputCpf,
        };
        
        axios
            .post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", data)
            .then(() => {
                setOrderInfo({ name: inputName, cpf: inputCpf, seats: seatsList.names, session: sessionInfo });
                navigate("/sucesso");
            })
            .catch((error) => console.log(error));
    }

    return (
        <FormContainer>
            <form onSubmit={buyTickets}>
                Nome do Comprador:
                <input
                    type="text"
                    placeholder="Digite seu nome..."
                    required
                    onChange={(event) => setInputName(event.target.value)}
                    value={inputName}
                    data-test="client-name"
                />
                CPF do Comprador:
                <input
                    type="text"
                    minLength="11"
                    maxLength="11"
                    pattern="\d{11}"
                    placeholder="Digite seu CPF..."
                    required
                    onChange={(event) => setInputCpf(event.target.value)}
                    value={inputCpf}
                    data-test="client-cpf"
                />
                <button type="submit" data-test="book-seat-btn">
                    Reservar Assento(s)
                </button>
            </form>
        </FormContainer>
    );
}

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
`;

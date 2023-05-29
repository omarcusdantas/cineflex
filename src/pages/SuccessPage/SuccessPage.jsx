import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage({ orderInfo, setOrderInfo }) {
    const navigate = useNavigate();

    function formatCPF(cpf) {
        const cpfDigits = cpf.toString().padStart(11, "0");
        return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-${cpfDigits.slice(9)}`;
    }

    function formatSeatNumber(seat) {
        if (seat.length < 2) {
            return seat.padStart(2, "0");
        }
        return seat;
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{orderInfo.session.movie.title}</p>
                <p>{orderInfo.session.day.date} - {orderInfo.session.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {orderInfo.seats.map((seat, index) => (
                    <p key={index}>Assento {formatSeatNumber(seat)}</p>
                ))}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {orderInfo.name}</p>
                <p>CPF: {formatCPF(orderInfo.cpf)}</p>
            </TextContainer>

            <button
                onClick={() => {
                    setOrderInfo({});
                    navigate("/");
                }}
                data-test="go-home-btn">
                Voltar para Home
            </button>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Roboto";
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247a6b;
    }
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`;

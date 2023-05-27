import styled from "styled-components";

export default function CaptionContainer() { 
    return (
        <Container>
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
        </Container>
    ) 
}

const Container = styled.div`
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
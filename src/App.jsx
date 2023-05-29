import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import Nav from "./components/Nav";
import axios from "axios";

export default function App() {
    const [orderInfo, setOrderInfo] = React.useState({});
    axios.defaults.headers.common["Authorization"] = "iEdc61mkRad7o79TwQ6jAJSe";

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route 
                    path="/" 
                    element={<HomePage />}
                />
                <Route 
                    path="/sessoes/:idMovie" 
                    element={<SessionsPage />} 
                />
                <Route 
                    path="/assentos/:idSession" 
                    element={<SeatsPage setOrderInfo={setOrderInfo} />} 
                />
                <Route 
                    path="/sucesso" 
                    element={<SuccessPage orderInfo={orderInfo} setOrderInfo={setOrderInfo} />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

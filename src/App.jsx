import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";

function App() {
    // Cambio aquí
    // Lala estuvo aquí
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/logs" element={<Logs />} />
            </Routes>
        </Router>
    );
}

export default App;

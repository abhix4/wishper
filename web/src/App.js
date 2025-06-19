import logo from "./logo.svg";
import "./App.css";
import Nav from "./pages/Elements/Nav";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Vault from "./pages/Vault";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Elements/Footer";
import Features from "./pages/Feature";

function App() {
  return (
    <div className="App  font-Poppins">
      <Nav />
      <Routes>
        <Route path="/features" element={<Features />} />
        <Route path="/" element={<Home />} />
        <Route path="/Vault" element={<Vault />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
   
      <div className="toast">
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
}

export default App;

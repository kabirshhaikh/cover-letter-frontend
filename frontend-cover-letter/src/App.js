import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import GenerateCoverLetter from "./Components/GenerateCoverLetter";
import ViewCoverLetters from "./Components/ViewCoverLetters";
import ManageProfile from "./Components/ManageProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate-cover-letter" element={<GenerateCoverLetter />} />
      <Route path="/view-cover-letters" element={<ViewCoverLetters />} />
      <Route path="/manage-profile" element={<ManageProfile />} />
    </Routes>
  );
};

export default App;

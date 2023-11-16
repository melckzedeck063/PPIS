import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Index from "./components";
import Login from "./components/Login";


function App() {
  return (
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
 </BrowserRouter>
  );
}

export default App;

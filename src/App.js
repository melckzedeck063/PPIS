import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Index from "./components";
import Login from "./components/Login";


function App() {
  return (
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index  />} />
      <Route path="/login" element={<Login />} />
    </Routes>
 </BrowserRouter>
  );
}

export default App;

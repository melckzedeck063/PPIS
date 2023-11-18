import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Index from "./components";
import Login from "./components/Login";
import AllMp from "./components/AllMp";
import Questions from "./components/Questions";


function App() {
  return (
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/all_mps" element={<AllMp />} />
      <Route path="/questions" element={<Questions />}  />
    </Routes>
 </BrowserRouter>
  );
}

export default App;

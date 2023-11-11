import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Index from "./components";


function App() {
  return (
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index  />} />
    </Routes>
 </BrowserRouter>
  );
}

export default App;

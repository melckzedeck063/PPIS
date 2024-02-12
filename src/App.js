import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./components";
import Login from "./components/Login";
import AllMp from "./components/AllMp";
import Questions from "./components/Questions";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/protect";
import Dashboard from "./components/dashboard";
import Forum from "./components/forum";
import UserProfile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import SignUp from "./components/SignUp";
import Users from "./utils/Users";
import Ministry from "./components/Ministry";



function App() {
  return (
 <BrowserRouter>
   <AuthProvider>
    <Routes>
      <Route path="/" element={<Index  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />}  />
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
      <Route path="/all_mps" element={ <ProtectedRoute> <Users /> </ProtectedRoute>} />
        <Route path="/users" element={ <ProtectedRoute> <Users /> </ProtectedRoute>} />
      <Route path="/ministry" element={<ProtectedRoute> <Ministry /> </ProtectedRoute>}   />
      <Route path="/questions" element={<ProtectedRoute> <Questions /> </ProtectedRoute>}  />
      <Route path="/forum" element={<ProtectedRoute> <Forum /> </ProtectedRoute>} />
      <Route  path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute> }  />
      <Route path="/settings" element={<ProtectedRoute> <ChangePassword /> </ProtectedRoute>} />
    </Routes>
    </AuthProvider>
 </BrowserRouter>
  );
}

export default App;

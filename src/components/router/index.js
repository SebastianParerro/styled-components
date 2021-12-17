import { Route, Routes } from "react-router-dom";
import Home from "../home";
import Login from "../login";
import Register from "../register";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

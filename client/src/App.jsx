import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../src/Pages/About";
import Dashboard from "../src/Pages/Dashboard";
import Home from "../src/Pages/Home";
import Projects from "../src/Pages/Projects";
import Signin from "../src/Pages/Signin";
import Signup from "../src/Pages/Signup";
import Header from "./components/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

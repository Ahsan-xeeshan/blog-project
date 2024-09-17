import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../src/Pages/About";
import Dashboard from "../src/Pages/Dashboard";
import Home from "../src/Pages/Home";
import Projects from "../src/Pages/Projects";
import Signin from "../src/Pages/Signin";
import Signup from "../src/Pages/Signup";
import FooterCom from "./components/Footer";
import Header from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute copy";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";
import UpdatePost from "./Pages/UpdatePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Home from "./components/main/Home";
import Login from "./components/main/Login";
import Signup from "./components/main/Signup";
import User from "./components/user";
import UserProfile from "./components/user/UserProfile";
import BrandLogin from "./components/main/brand_login";


function App() {
  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navigate to="/main/home" />} />
          <Route path="main" element={<Main />} >
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="brandlogin" element={<BrandLogin />} />

          </Route>
          <Route path="user" element={<User />} >
            <Route path="login" element={<Login />} />
            <Route path="userprofile" element={<UserProfile />} />

          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
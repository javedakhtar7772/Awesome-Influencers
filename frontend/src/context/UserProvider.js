import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children, currentUser}) => {

    const [loggedIn, setLoggedIn] = useState(currentUser!==null);
    const navigate= useNavigate();

    const [avatar, setAvatar] = useState('');

    const logout = () => {
        sessionStorage.removeItem('user');
        setLoggedIn(false);
        navigate('/main/login');
    }

    return <UserContext.Provider value={{loggedIn, setLoggedIn, logout, avatar, setAvatar}}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
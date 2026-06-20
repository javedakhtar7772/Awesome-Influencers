import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandContext = createContext();

const BrandProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('brand')));
    const [loggedIn, setLoggedIn] = useState(currentUser!==null);
    const navigate= useNavigate();

    const logout = () => {
        sessionStorage.removeItem('brand');
        setLoggedIn(false);
        navigate('/main/brandlogin');
    }

    return <BrandContext.Provider value={{loggedIn, setLoggedIn, logout}}>
        {children}
    </BrandContext.Provider>
}

export const useBrandContext = () => useContext(BrandContext);

export default BrandProvider;
import React, {useState} from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children })=> {

    const [isAuth, setIsAuth ] = useState(false);

    return (
        <UserContext.Provider value={{isAuth, setIsAuth }}>
            {children}
        </UserContext.Provider>
    );  
}

export default UserContext;

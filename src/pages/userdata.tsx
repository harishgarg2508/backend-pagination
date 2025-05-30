import React, { createContext, useState, useContext } from "react";

interface UserData {
    fullName: string;
    email: string;
    password: string;
}



interface UserContextType {
    userData: UserData | null;
    isAuthenticated: boolean;
    signup: (data: UserData) => void;
    login: (email: string, password: string) => boolean;

}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);





    const signup = (data: UserData) => {
        setUserData(data);
    };

    const login = (email: string, password: string): boolean => {
        if (userData && userData.email === email && userData.password === password) {
            setIsAuthenticated(true);
            console.log(userData);
            return true;
        }
        return false;
    };



    return (
        <UserContext.Provider value={{ userData, isAuthenticated, signup, login }}>
            {children}
        </UserContext.Provider>
    );
};
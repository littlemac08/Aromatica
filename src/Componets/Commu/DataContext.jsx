import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(null);

    return (
        <AppContext.Provider value={{ globalState, setGlobalState }}>
        {children}
        </AppContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useGlobalState must be used within an AppProvider');
    }
    return context;
};

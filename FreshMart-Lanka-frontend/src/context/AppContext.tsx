import { createContext, useState, ReactNode } from "react";

interface AppContextType {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
}

export const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <MyContext.Provider value={{ imageUrl, setImageUrl }}>
            {children}
        </MyContext.Provider>
    );
};

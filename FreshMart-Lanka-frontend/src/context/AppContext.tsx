import { createContext, useState, ReactNode } from "react";

interface AppContextType {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;

    itemDelete: boolean | null;
    setItemDelete: (status: boolean) => void;
}

export const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [itemDelete, setItemDelete] = useState<boolean | null>(null);

    return (
        <MyContext.Provider
            value={{
                imageUrl, setImageUrl,
                itemDelete, setItemDelete
        }}>
            {children}
        </MyContext.Provider>
    );
};

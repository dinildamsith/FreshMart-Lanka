import { createContext, useState, ReactNode } from "react";

interface AppContextType {

    //------------------ product save time upload image url
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;

    //------------------ item Delete state
    itemDelete: boolean | null;
    setItemDelete: (status: boolean) => void;


    //------------------ old item details
    updateItemCode:string | null;
    setUpdateItemCode: (code: string | null) => void;
    //
    // oldItemImage: string | null;
    // setOldItemImage: (image: string | null) => void;
    //
    // oldItemDesc: string | null;
    // setOldItemDesc: (desc: string | null) => void;
    //
    // oldItemPrice: number | 0;
    // setOldItemPrice: (price: number | 0) => void;
    //
    // oldItemQty: number | 0;
    // setOldItemQty: (qty: number | 0) => void;
}

export const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [itemDelete, setItemDelete] = useState<boolean | null>(null);

    const [updateItemCode, setUpdateItemCode] = useState<string | null>(null);
    // const [oldItemImage, setOldItemImage] = useState<string | null>(null);
    // const [oldItemDesc, setOldItemDesc] = useState<string | null>(null);
    // const [oldItemPrice, setOldItemPrice] = useState<number | 0>(0);
    // const [oldItemQty, setOldItemQty] = useState<number | 0>(0);

    return (
        <MyContext.Provider
            value={{
                imageUrl, setImageUrl,
                itemDelete, setItemDelete,
                updateItemCode, setUpdateItemCode
                // oldItemImage, setOldItemImage,
                // oldItemDesc, setOldItemDesc,
                // oldItemPrice, setOldItemPrice,
                // oldItemQty, setOldItemQty
        }}>
            {children}
        </MyContext.Provider>
    );
};

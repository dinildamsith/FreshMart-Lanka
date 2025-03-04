import { createContext, useState, ReactNode } from "react";

interface AppContextType {

    //------------------ product save time upload image url
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;

    //------------------ item Delete state
    itemDelete: boolean | null;
    setItemDelete: (status: boolean) => void;

    //------------------ customer Delete state
    customerDelete: boolean | null;
    setCustomerDelete: (status: boolean) => void;

    //------------------ update item code
    updateItemCode:string | null;
    setUpdateItemCode: (code: string | null) => void;

    //-----------------update customer code
    updateCustomerCode:string | null;
    setUpdateCustomerCode: (code: string | null) => void;
}

export const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [itemDelete, setItemDelete] = useState<boolean | null>(null);
    const [customerDelete, setCustomerDelete] = useState<boolean | null>(null);

    const [updateItemCode, setUpdateItemCode] = useState<string | null>(null);
    const [updateCustomerCode, setUpdateCustomerCode] = useState<string | null>(null);


    return (
        <MyContext.Provider
            value={{
                imageUrl, setImageUrl,
                itemDelete, setItemDelete,
                updateItemCode, setUpdateItemCode,
                updateCustomerCode, setUpdateCustomerCode,
                customerDelete, setCustomerDelete
                // oldItemImage, setOldItemImage,
                // oldItemDesc, setOldItemDesc,
                // oldItemPrice, setOldItemPrice,
                // oldItemQty, setOldItemQty
        }}>
            {children}
        </MyContext.Provider>
    );
};

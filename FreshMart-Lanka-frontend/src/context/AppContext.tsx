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

    //--------------- cart in remove item index state
    cartInRemoveItemIndex: any | null;
    setCartInRemoveItemIndex: (index: any | null) => void;
}

export const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [itemDelete, setItemDelete] = useState<boolean | null>(null);
    const [customerDelete, setCustomerDelete] = useState<boolean | null>(null);

    const [updateItemCode, setUpdateItemCode] = useState<string | null>(null);
    const [updateCustomerCode, setUpdateCustomerCode] = useState<string | null>(null);
    const [cartInRemoveItemIndex, setCartInRemoveItemIndex] = useState<any | null>(null)


    return (
        <MyContext.Provider
            value={{
                imageUrl, setImageUrl,
                itemDelete, setItemDelete,
                updateItemCode, setUpdateItemCode,
                updateCustomerCode, setUpdateCustomerCode,
                customerDelete, setCustomerDelete,
                cartInRemoveItemIndex, setCartInRemoveItemIndex
        }}>
            {children}
        </MyContext.Provider>
    );
};

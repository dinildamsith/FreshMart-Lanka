import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../../components/common/PageMeta.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import DropzoneComponent from "../../../components/form/form-elements/DropZone.tsx";
import Button from "../../../components/ui/button/Button.tsx";
import {FileIcon, PencilIcon} from "../../../icons";

import {codeByItemGet, saveItem, updateItem} from "../../../services/item/itemServices.ts";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../../context/AppContext.tsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";


export default function ItemForm() {

    const navigation = useNavigate()
    const { imageUrl, setImageUrl } = useContext(MyContext)!;
    const { updateItemCode , setUpdateItemCode } = useContext(MyContext)!;

    const [itemDescription, setItemDescription] = useState<string>("")
    const [itemPrice, setItemPrice] = useState<any>(undefined)
    const [itemQuantity, setItemQuntity] = useState<any>(undefined)


    const [errors, setErrors] = useState({
        itemDescriptionInput: false,
        itemPriceInput: false,
        itemQuantityInput: false
    })



    //------------------ Add item handel
    const itemData ={
        itemImageUrl: imageUrl,
        itemDescription,
        itemPrice,
        itemQuantity
    }

    const handelAddItem = async () => {

        if (imageUrl != null) {
            if (!itemDescription || !itemPrice || !itemQuantity ) {
                setErrors({
                    itemDescriptionInput: !itemDescription,
                    itemPriceInput: !itemPrice,
                    itemQuantityInput: !itemQuantity
                })
            } else {
                await saveItem(itemData)
            }
        } else {
            toast.error("Please Upload Image")
        }

    }

    const itemUpdateData ={
        itemCode: updateItemCode,
        itemImageUrl: imageUrl,
        itemDescription,
        itemPrice,
        itemQuantity
    }


    const handelUpdateItem = async () => {

        if (imageUrl != null) {
            if (!itemDescription || !itemPrice || !itemQuantity ) {
                setErrors({
                    itemDescriptionInput: !itemDescription,
                    itemPriceInput: !itemPrice,
                    itemQuantityInput: !itemQuantity
                })
            } else {
                const res = await updateItem(itemUpdateData)

                if (res.status == 'SUCCESS') {
                    navigation("/warehouse")
                    setImageUrl("")
                    setItemDescription("")
                    setItemPrice(0)
                    setItemQuntity(0)
                    setUpdateItemCode(null)
                }

            }
        } else {
            toast.error("Please Upload Image")
        }

    }

    const getItem = async () => {
        const res = await codeByItemGet(updateItemCode)
        setImageUrl(res.data.itemImageUrl)
        setItemDescription(res.data.itemDescription)
        setItemQuntity(res.data.itemQuantity)
        setItemPrice(res.data.itemPrice)
    }

    useEffect(() => {

        if (updateItemCode != null) {
            getItem()
        }


    }, [updateItemCode]);

  return (
    <div>
      <PageMeta
        title="item"
        description="item"
      />
      <PageBreadcrumb pageTitle="Item Manage" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/*----------Left Side----------*/}
        <div className="space-y-6">
             <div className="space-y-6">
                    <DropzoneComponent title={"Select Item Image"}/>
             </div>
        </div>

          {/*-------------Right Side----------*/}
        <div className="space-y-6">
            <ComponentCard title="Detils">
                <div className="space-y-6">

                    {/*-----------------------Input Fields-----------------------*/}
                    <div>
                        <div>
                            <Label htmlFor="input">Item Description</Label>
                            <Input type="text" id="input"
                                   value={itemDescription}
                                   error={errors.itemDescriptionInput}
                                   onChange={(e) => setItemDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Item Quantity</Label>
                            <Input type="number" id="input"
                                   value={itemQuantity}
                                   error={errors.itemQuantityInput}
                                   onChange={(e) => setItemQuntity(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Item Price</Label>
                            <Input type="number" id="input"
                                   value={itemPrice}
                                   error={errors.itemPriceInput}
                                   onChange={(e) => setItemPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>


                    {/*---------------Buttons----------------*/}
                    <div className="flex items-center gap-5">
                        {updateItemCode ? (
                            <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handelUpdateItem()}
                                startIcon={<PencilIcon className="size-5" />}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handelAddItem()}
                                startIcon={<FileIcon className="size-5" />}
                            >
                                Save
                            </Button>
                        )}
                    </div>

                    </div>
            </ComponentCard>
        </div>
      </div>
    </div>
  );
}

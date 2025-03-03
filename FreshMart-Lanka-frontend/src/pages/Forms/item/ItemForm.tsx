import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../../components/common/PageMeta.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import DropzoneComponent from "../../../components/form/form-elements/DropZone.tsx";
import Button from "../../../components/ui/button/Button.tsx";
import {FileIcon, PencilIcon} from "../../../icons";

import {saveItem} from "../../../services/item/itemServices.ts";
import {useContext, useState} from "react";
import {MyContext} from "../../../context/AppContext.tsx";
import toast from "react-hot-toast";


export default function ItemForm() {

    const { imageUrl } = useContext(MyContext)!;
    const [itemDescription, setItemDescription] = useState<string>("")
    const [itemPrice, setItemPrice] = useState<number>(0)
    const [itemQuantity, setItemQuntity] = useState<number>(0)


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

  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
                                   error={errors.itemDescriptionInput}
                                   onChange={(e) => setItemDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Item Quantity</Label>
                            <Input type="number" id="input"
                                   error={errors.itemQuantityInput}
                                   onChange={(e) => setItemQuntity(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Item Price</Label>
                            <Input type="number" id="input"
                                   error={errors.itemPriceInput}
                                   onChange={(e) => setItemPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>


                    {/*---------------Buttons----------------*/}
                    <div className="flex items-center gap-5">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handelAddItem()}
                            startIcon={<FileIcon className="size-5"/>}
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="warning"
                            startIcon={<PencilIcon className="size-5"/>}
                        >
                            Update
                        </Button>
                    </div>

                    </div>
            </ComponentCard>
        </div>
      </div>
    </div>
  );
}

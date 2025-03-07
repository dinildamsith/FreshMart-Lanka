import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../../components/common/PageMeta.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Button from "../../../components/ui/button/Button.tsx";
import {EnvelopeIcon, FileIcon, PencilIcon} from "../../../icons";
import {useContext, useEffect, useState} from "react";
import {idByGetCustomer, saveCustomer, updateCustomer} from "../../../services/customer/customerServices.ts";
import toast from "react-hot-toast";
import {MyContext} from "../../../context/AppContext.tsx";
import {useNavigate} from "react-router";

export default function CustomerForm() {

    const navigation = useNavigate()
    const { updateCustomerCode, setUpdateCustomerCode } = useContext(MyContext)!;
    const [customerName, setCustomerName] = useState<any>()
    const [customerEmail, setCustomerEmail] = useState<any>()
    const [customerAddress, setCustomerAddress] = useState<any>()
    const [customerBirthDate, setCustomerBirthDate] = useState<any>()

    const [errors, setErrors] = useState({
        nameInput: false,
        emailInput: false,
        addressInput: false,
        bodInput: false
    })

    //--------------------------save new customer
    const newCustomer = {
        customerName,
        customerEmail,
        customerAddress,
        customerBirthDate
    }

    const saveCustomerHandel = async () => {

        if (!customerName || !customerAddress || !customerEmail || ! customerBirthDate) {
            setErrors({
                nameInput: !customerName,
                addressInput: !customerAddress,
                emailInput: !customerEmail,
                bodInput: !customerBirthDate
            })
            toast.error("Required All Fields")
        } else {
            setErrors({
                nameInput: !customerName,
                addressInput: !customerAddress,
                emailInput: !customerEmail,
                bodInput: !customerBirthDate
            })
            await saveCustomer(newCustomer)
        }

    }

    //------------------------update user get
    const updateUserGet = async (id:any) => {
        const res = await idByGetCustomer(id)
        setCustomerName(res.data.customerName)
        setCustomerEmail(res.data.customerEmail)
        setCustomerAddress(res.data.customerAddress)
        setCustomerBirthDate(new Date(res.data.customerBirthDate).toISOString().split('T')[0])
    }


    //--------------------------customer update handel
    const updateCustomerData = {
        customerId: updateCustomerCode,
        customerName,
        customerEmail,
        customerAddress,
        customerBirthDate
    }

    const handelCustomerUpdate = async () => {

        if (!customerName || !customerAddress || !customerEmail || ! customerBirthDate) {
            setErrors({
                nameInput: !customerName,
                addressInput: !customerAddress,
                emailInput: !customerEmail,
                bodInput: !customerBirthDate
            })
            toast.error("Required All Fields")
        } else {
            setErrors({
                nameInput: !customerName,
                addressInput: !customerAddress,
                emailInput: !customerEmail,
                bodInput: !customerBirthDate
            })
            const res = await updateCustomer(updateCustomerData)

            if (res.status == 'SUCCESS') {
                setUpdateCustomerCode(null)
                setCustomerName("")
                setCustomerEmail("")
                setCustomerAddress("")
                setCustomerBirthDate(null)
                navigation("/all-customers")
            }
        }

    }

    //-------------page load time update customer details get
    useEffect(() => {

        if (updateCustomerCode != null) {
            updateUserGet(updateCustomerCode)
        }

    }, [updateCustomerCode]);

  return (
    <div>
      <PageMeta
        title="customer"
        description="customer"
      />
      <PageBreadcrumb pageTitle="Customers Manage" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/*-----------------------Left Side-----------------------*/}
        <div className="space-y-6">
            <ComponentCard title="Detils">
                <div className="space-y-6">

                    {/*-----------------------Input Fields-----------------------*/}
                    <div>
                        <div>
                            <Label htmlFor="input">Customer Name</Label>
                            <Input
                                type="text"
                                id="input"
                                value={customerName}
                                error={errors.nameInput}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Customer Address</Label>
                            <Input
                                type="text"
                                id="input"
                                value={customerAddress}
                                error={errors.addressInput}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label> Customer Email</Label>
                            <div className="relative">
                                <Input
                                    placeholder="info@gmail.com"
                                    type="text"
                                    className="pl-[62px]"
                                    value={customerEmail}
                                    error={errors.emailInput}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />
                                <span
                                    className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6"/>
            </span>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="input">Customer Birthday</Label>
                            <Input
                                type="date"
                                id="input"
                                error={errors.bodInput}
                                value={customerBirthDate}
                                onChange={(e) => setCustomerBirthDate(e.target.value)}
                            />
                        </div>
                    </div>


                    {/*---------------Buttons----------------*/}
                    <div className="flex items-center gap-5">
                        {updateCustomerCode ? (
                            <Button
                                size="sm"
                                variant="warning"
                                onClick={()=> handelCustomerUpdate()}
                                startIcon={<PencilIcon className="size-5" />}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => saveCustomerHandel()}
                                startIcon={<FileIcon className="size-5" />}
                            >
                                Save
                            </Button>
                        )}

                    </div>

                </div>
            </ComponentCard>
        </div>


          {/*-------------Right Side----------*/}
          <div className="space-y-6">

          </div>
      </div>
    </div>
  );
}

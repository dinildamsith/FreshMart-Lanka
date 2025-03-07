import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Button from "../../../components/ui/button/Button.tsx";
import { BoxIconLine, EnvelopeIcon } from "../../../icons";
import Select from "../../../components/form/Select.tsx";
import OrderSelectItemsTable from "../../../components/tables/BasicTables/OrderSelectItemsTable.tsx";
import Radio from "../../../components/form/input/Radio.tsx";
import {useContext, useEffect, useState} from "react";
import {getAllCustomers} from "../../../services/customer/customerServices.ts";
import {getAllItems} from "../../../services/item/itemServices.ts";
import {parchesNewOrder} from "../../../services/order/orderServices.ts";
import {MyContext} from "../../../context/AppContext.tsx";
import toast from "react-hot-toast";

export default function PurchaseOrderForm() {


  const { cartInRemoveItemIndex } = useContext(MyContext)!;

  const [selectedValue, setSelectedValue] = useState<string>("cash");

  const [allCustomers, setAllCustomers] = useState([]);
  const [allItems, setAllItems] = useState([])


  const [selectCustomer, setSelectCustomer] = useState<any>({})
  const [selectItem, setSelectItem] = useState<any>({})
  const [buyItemQty, setBuyItemQty] = useState<any>()

  const [cartInItems, setCartInItems] = useState<any[]>([])
  const [orderTotal, setOrderTotal] = useState<number>(0)


  const [amount, setAmount] = useState<any>(null)
  const [balance, setBalance] = useState<any>(null)
  const [cardDetails, setCardDetails] = useState<any>({
    cardNumber: null,
    cvc: null,
    ed: null
  })


  useEffect(() => {

    const removeItemWithout = cartInItems.filter((_,index) => index != cartInRemoveItemIndex)
    setCartInItems(removeItemWithout)

  }, [cartInRemoveItemIndex]);

  const allCustomerGetHandel = async () => {
    const res = await getAllCustomers();

    if (res.status === 'SUCCESS') {
      const formattedCustomers = res.data.map((customer: any) => ({
        value: JSON.stringify(customer),
        label: customer.customerName,
      }));
      setAllCustomers(formattedCustomers);
    }
  };

  const allItemsGetHandel = async () => {
    const res = await getAllItems();

    if (res.status === 'SUCCESS') {
      const formattedItems = res.data.map((item: any) => ({
        value: JSON.stringify(item),
        label: item.itemDescription,
      }));
      setAllItems(formattedItems);
    }
  };

  const selectCustomerHandel = (value: string) => {
    setSelectCustomer(JSON.parse(value));
  };

  const selectItemHandel = (value: string) => {
    setSelectItem(JSON.parse(value));
  };


  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handelBalance = (e:any) => {
    setAmount(e.target.value)
    setBalance(orderTotal - e.target.value)
  }


  // let tot = 0
  const addCartHandel = () => {

    const cart = {
      itemImage: "",
      itemId: "",
      itemName: "",
      itemPrice: "",
      buyQty: ""
    }


    if (buyItemQty <= selectItem.itemQuantity) {
      cart.itemImage = selectItem.itemImageUrl
      cart.itemId = selectItem._id
      cart.itemName = selectItem.itemDescription
      cart.itemPrice = selectItem.itemPrice
      cart.buyQty = buyItemQty


      setCartInItems((prevItems) => {
        const isExitItem =  prevItems.find((item) => item.itemId === selectItem._id)

        if (isExitItem) {
          return prevItems
        } else {
          return [...cartInItems,cart]
        }

      })

    } else {
      toast.error("This Item Quntity Not in Stock")
    }

  }


  useEffect(() => {
    console.log(cartInItems)
    let tot = 0

    cartInItems.map((item) => {
      tot+= Number(item.buyQty) * Number(item.itemPrice)
    })
    setOrderTotal(tot)

  }, [cartInItems]);

  useEffect(() => {
    allCustomerGetHandel()
    allItemsGetHandel()
  }, []);


  const newOrderData = {
    customerId: selectCustomer._id,
    customerName: selectCustomer.customerName,
    orderItems: cartInItems
  }

  const newOrderPurchaseOrder = async () => {

    if (selectedValue == 'card') {

      if (cardDetails.cardNumber != null || cardDetails.cvc != null || cardDetails.ed != null){
        const res = await parchesNewOrder(newOrderData)
        console.log(res)
      } else {
        toast.error("Please Input Card Details")
      }
    } else {

      if (amount != null) {
        const res = await parchesNewOrder(newOrderData)
        console.log(res)
      } else {
        toast.error("Please Input Amount")
      }

    }




  }

  return (
    <>
      <div>
        <PageMeta
          title="new order"
          description="new order"
        />
        <PageBreadcrumb pageTitle="Purchase New Order" />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/*-----------------------Left Side-----------------------*/}
          <div className="space-y-6 ">
            <ComponentCard title="Customer Detils">
              <div className="space-y-6 h-[350px]">
                {/*-----------------------Input Fields-----------------------*/}
                <div>
                  <div>
                    <Label>Select Customer</Label>
                    <Select
                      options={allCustomers}
                      placeholder="Select Customer"
                      onChange={selectCustomerHandel}
                      className="dark:bg-dark-900"
                    />
                  </div>

                  <div>
                    <Label htmlFor="input">Customer Code</Label>
                    <Input type="text" id="input" disabled value={selectCustomer._id}/>
                  </div>

                  <div>
                    <Label htmlFor="input">Customer Address</Label>
                    <Input type="text" id="input" disabled value={selectCustomer.customerAddress}/>
                  </div>

                  <div>
                    <Label> Customer Email</Label>
                    <div className="relative">
                      <Input
                        placeholder="info@gmail.com"
                        type="text"
                        className="pl-[62px]"
                        disabled
                        value={selectCustomer.customerEmail}
                      />
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <EnvelopeIcon className="size-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/*-------------Right Side----------*/}
          <div className="space-y-6">
            <ComponentCard title="Items">
              <div className="space-y-6">
                {/*-----------------------Input Fields-----------------------*/}
                <div>
                  <div>
                    <Label>Select Item</Label>
                    <Select
                      options={allItems}
                      placeholder="Select Item"
                      onChange={selectItemHandel}
                      className="dark:bg-dark-900"
                    />
                  </div>

                  <div>
                    <Label htmlFor="input">Item Code</Label>
                    <Input type="text" id="input" disabled value={selectItem.itemCode}/>
                  </div>

                  <div>
                    <Label htmlFor="input">Item Price</Label>
                    <Input type="text" id="input" disabled value={selectItem.itemPrice}/>
                  </div>

                  <div>
                    <Label htmlFor="input">Item Quantity</Label>
                    <Input type="email" id="input" onChange={(e)=> setBuyItemQty(e.target.value)}/>
                  </div>
                </div>

                {/*---------------Buttons----------------*/}
                <div className="flex items-center gap-5">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => addCartHandel()}
                    startIcon={<BoxIconLine className="size-5" />}
                  >
                    Add Cart
                  </Button>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/*------------------------- second left side ----------------------------   */}
          <div className="space-y-6">
            <ComponentCard title="Cart">
              <div className="space-y-6">
                <OrderSelectItemsTable cart={cartInItems}/>
              </div>
            </ComponentCard>
          </div>

          {/*------------------------- second right side ----------------------------   */}
          <div className="space-y-6">
            <ComponentCard title="Order Confirme">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="input">Order Total</Label>
                  <Input type="number" id="input" value={orderTotal}/>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <Label htmlFor="radio1">Payment Type</Label>
                  <Radio
                    id="radio1"
                    name="Cash"
                    value="cash"
                    checked={selectedValue === "cash"}
                    onChange={handleRadioChange}
                    label="Cash"
                  />
                  <Radio
                    id="radio2"
                    name="Card"
                    value="card"
                    checked={selectedValue === "card"}
                    onChange={handleRadioChange}
                    label="Card"
                  />
                </div>

                <div>
                  {selectedValue === "card" && (
                    <>
                      <div className={"space-y-6"}>
                        <Label htmlFor="tm">Card Number</Label>
                        <div className="relative">
                          <Input
                              type="text"
                              placeholder="Card number"
                              className="pl-[62px]"
                              onChange={(e) => setCardDetails({
                                cardNumber: e.target.value
                              })}
                          />
                          <span
                              className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                  cx="6.25"
                                  cy="10"
                                  r="5.625"
                                  fill="#E80B26"
                              />
                              <circle
                                  cx="13.75"
                                  cy="10"
                                  r="5.625"
                                  fill="#F59D31"
                              />
                              <path
                                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                                  fill="#FC6020"
                              />
                            </svg>
                          </span>
                        </div>

                        <div>
                          <Label htmlFor="input">Cvc</Label>
                          <Input type="number" id="input"
                                 onChange={(e) => setCardDetails({
                            cvc: e.target.value
                          })}/>
                        </div>

                        <div>
                          <Label htmlFor="input">Expire Date</Label>
                          <Input type="date" id="input"
                                 onChange={(e) => setCardDetails({
                                   ed: e.target.value
                                 })}
                          />
                        </div>

                      </div>
                    </>
                  )}

                  {
                      selectedValue === "cash" && (
                          <div className={"space-y-6"}>
                          <div>
                                    <Label htmlFor="input">Amount</Label>
                                    <Input type="number" id="input" onChange={(e) => handelBalance(e)}/>
                                </div>

                                <div>
                                    <Label htmlFor="input">Balance</Label>
                                    <Input type="number" id="input" disabled value={balance}/>
                                </div>
                            </div>
                        )
                    }
                </div>

                  <div className="flex items-center gap-5">
                      <Button
                          size="sm"
                          variant="success"
                          onClick={ ()=> newOrderPurchaseOrder()}
                    startIcon={<BoxIconLine className="size-5" />}
                  >
                    Confirm Order
                  </Button>
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
}

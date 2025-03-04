import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import {PencilIcon, TrashBinIcon} from "../../../icons";
import {useContext} from "react";
import {MyContext} from "../../../context/AppContext.tsx";
import {useNavigate} from "react-router";
import {deleteCustomer} from "../../../services/customer/customerServices.ts";

interface Customer {
  id: number;
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerBirthDate: string;
}

type CustomerListProps = {
  allCustomers: Customer[]
}


export default function AllCustomersTable(props:CustomerListProps) {

  const navigation = useNavigate()
  const { setUpdateCustomerCode, setCustomerDelete } = useContext(MyContext)!;


  //----------------customer update button handel
  const handelCustomerUpdateButton = (updateCustomerCode:any) => {
    console.log(updateCustomerCode)
    setUpdateCustomerCode(updateCustomerCode)
    navigation("/customers-manage")
  }


  //------------------customer delete button handel
  const customerDeleteHandel = async (deleteCustomerId:any) => {
    const res = await deleteCustomer(deleteCustomerId)

    if (res.status == 'SUCCESS') {
      setCustomerDelete(true)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Customer Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Address
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Birthday
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {props.allCustomers?.map((customer:any) => (
                <TableRow key={customer.id}>
                  <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    {customer.customerName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {customer.customerAddress}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {customer.customerEmail}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {new Date(customer.customerBirthDate).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <button
                          onClick={ ()=> handelCustomerUpdateButton(customer._id)}
                          className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                          onClick={ ()=> customerDeleteHandel(customer._id)}
                          className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

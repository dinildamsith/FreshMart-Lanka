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


export default function OrderSelectItemsTable(props:any) {

  const { setCartInRemoveItemIndex } = useContext(MyContext)!;

  const handelSelectItemRemove = (id:any) => {
      setCartInRemoveItemIndex(id)
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
                  Item Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Unit Price
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                  Quantity
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
              {props.cart.map((order:any, index:any) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center justify-center gap-3">
                          <div className="w-10 h-10 overflow-hidden  flex items-center justify-center">
                            <img
                                width={40}
                                height={40}
                                src={order.itemImage || ""}
                                className="object-cover"
                            />
                          </div>
                        </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {order.itemName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {order.itemPrice}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {order.buyQty}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                          onClick={()=> handelSelectItemRemove(index)}
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

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import {PencilIcon, TrashBinIcon} from "../../../icons";
import {deleteItem} from "../../../services/item/itemServices.ts";
import {useContext} from "react";
import {MyContext} from "../../../context/AppContext.tsx";
import {useNavigate} from "react-router";

// interface Item {
//   id: number;
//   itemImage: string;
//   itemDescription: string;
//   itemQuantity: number;
//   status: string;
//   itemPrice: number;
// }


export default function AllItemsTable(props: any) {

  const navigation = useNavigate()

  const { setItemDelete } = useContext(MyContext)!; // Access context
  const { setUpdateItemCode } = useContext(MyContext)!; // Access context

  const itemDeleteHandel = async (itemCode:any) => {
     const res = await deleteItem(itemCode)

    if (res.status == 'SUCCESS'){
      setItemDelete(true)
    } else {
      setItemDelete(false)
    }

  }

  const itemUpdateButtonHandel = (updateItemCode:any) => {

    if (updateItemCode != null) {
        setUpdateItemCode(updateItemCode)
        navigation("/items-manage")
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
                    Item
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Item Description
                  </TableCell>

                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Status
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
                    Price
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
                {props.allItems.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell className="px-5 py-4 sm:px-6">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-10 h-10 overflow-hidden  flex items-center justify-center">
                            <img
                                width={40}
                                height={40}
                                src={item.itemImageUrl || ""}
                                className="object-cover"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                        {item.itemDescription}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        <Badge
                            size="sm"
                            color={
                              item.itemQuantity >= 10
                                  ? "success"
                                  : item.itemQuantity === 0
                                      ? "error"
                                      : item.itemQuantity <= 5
                                          ? "warning"
                                          : "default"
                            }
                        >
                          {item.itemQuantity >= 10
                              ? "Available"
                              : item.itemQuantity === 0
                                  ? "Out of stock"
                                  : item.itemQuantity <= 5
                                      ? "Low"
                                      : item.status}
                        </Badge>

                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {item.itemQuantity}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {item.itemPrice}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <button
                              onClick={() => itemUpdateButtonHandel(item.itemCode)}
                              className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                              onClick={() => itemDeleteHandel(item.itemCode)}
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

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import {PencilIcon, TrashBinIcon} from "../../../icons";

interface Item {
  id: number;
  itemImage: string;
  itemDescription: string;
  itemQuantity: number;
  status: string;
  itemPrice: number;
}

// Define the table data using the interface
export const tableData : Item[] = [
  {
    id: 1,
    itemImage: "/images/user/user-17.jpg",
    itemDescription: "Lindsey Curtis",
    itemQuantity: 1,
    status: "Available",
    itemPrice: 3.9
  },
  {
    id: 2,
    itemImage: "/images/user/user-18.jpg",
    itemDescription: "Kaiya George",
    itemQuantity: 2,
    status: "Unavailable",
    itemPrice: 24.9
  }
];

export default function AllItemsTable() {
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
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
                        <img
                            width={40}
                            height={40}
                            src={order.itemImage}
                            className="object-cover"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.itemDescription}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Available"
                          ? "success"
                          : order.status === "Unavailable"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {order.itemPrice}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {order.itemQuantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button className="text-theme-link dark:text-theme-link-dark border border-transparent rounded p-1 hover:border-white ">
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

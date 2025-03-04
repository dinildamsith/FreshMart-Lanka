import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";


export default function AllOrdersTable(props:any) {
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
                                    Order Code
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                >
                                    Order Date
                                </TableCell>

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
                                   Items
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                >
                                    Total
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {props.allOrders?.map((order:any) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                                        {order._id}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {new Date(order.orderDate).toISOString().split('T')[0]}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {order.customerName}
                                    </TableCell>
                                    <TableCell className="border px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        {order.orderItems?.map((item:any) => (
                                            <>
                                                <hr/>
                                                <h1>{item.itemName}</h1>
                                                <span>Rs: {item.itemPrice}.00</span> X <span>{item.buyQty}</span>
                                                <hr/>
                                            </>
                                        ))}
                                    </TableCell>
                                    <TableCell className="border px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                       Rs:  {order.orderTotal}.00
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

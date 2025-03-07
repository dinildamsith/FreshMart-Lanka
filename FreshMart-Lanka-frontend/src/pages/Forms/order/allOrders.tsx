import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import AllOrdersTable from "../../../components/tables/BasicTables/allOrdersTable.tsx";
import {getAllOrders} from "../../../services/order/orderServices.ts";
import {useEffect, useState} from "react";



export default function AllOrders() {

    const [allOrders, setAllOrders] = useState()

    const allOrdersFetch = async () => {
       const res = await getAllOrders()

        if (res.status == 200) {
            setAllOrders(res?.data)
        }
    }

    useEffect(() => {
        allOrdersFetch()
    }, []);

    return (
        <>
            <PageMeta
                title="all-orders"
                description="all-orders"
            />
            <PageBreadcrumb pageTitle="Order History"/>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 h-screen w-full p-4">
                <div className="space-y-6 col-span-2">
                    <ComponentCard title="All Orders">
                        <AllOrdersTable allOrders={allOrders}/>
                    </ComponentCard>
                </div>
            </div>

        </>
    );
}
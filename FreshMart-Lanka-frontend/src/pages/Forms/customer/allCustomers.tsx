import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import AllCustomersTable from "../../../components/tables/BasicTables/AllCustomersTable.tsx";
import {getAllCustomers} from "../../../services/customer/customerServices.ts";
import {useEffect, useState} from "react";

export default function AllCustomers(){

    const [allCustomers, setAllCustomers] = useState<any>()

    const allCustomerGetHandel = async () => {
       const res = await getAllCustomers()

        if (res.status === 'SUCCESS') {
            setAllCustomers(res?.data)
        }
    }


    useEffect(() => {
        allCustomerGetHandel()
    }, []);

    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Warehouse"/>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 h-screen w-full p-4">
                <div className="space-y-6 col-span-2">
                    <ComponentCard title="All Items">
                        <AllCustomersTable allCustomers={allCustomers}/>
                    </ComponentCard>
                </div>
            </div>

        </>
    )
}
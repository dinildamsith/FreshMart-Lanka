import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import AllItemsTable from "../../../components/tables/BasicTables/AllItemsTable.tsx";
import {useEffect, useState} from "react";
import {getAllItems} from "../../../services/item/itemServices.ts";

export default function Warehouse() {

    const [allItems, setAllItems] = useState([])

    const getAllItemsHandel = async () => {
        const res = await getAllItems()
        console.log(res)
        setAllItems(res.data)
    }

    useEffect(() => {
        getAllItemsHandel()
    }, []);


    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Warehouse" />
            <div className="space-y-6">
                <ComponentCard title="All Items">
                    <AllItemsTable allItems = {allItems}/>
                </ComponentCard>
            </div>
        </>
    );
}
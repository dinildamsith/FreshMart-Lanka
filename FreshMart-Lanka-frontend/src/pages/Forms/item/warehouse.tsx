import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import AllItemsTable from "../../../components/tables/BasicTables/AllItemsTable.tsx";
import {useContext, useEffect, useState} from "react";
import {getAllItems} from "../../../services/item/itemServices.ts";
import {MyContext} from "../../../context/AppContext.tsx";


export default function Warehouse() {

    const { itemDelete } = useContext(MyContext)!;
    const [allItems, setAllItems] = useState([])

    const getAllItemsHandel = async () => {
        const res = await getAllItems()
        console.log(res)
        setAllItems(res.data)
    }

    //----------page trigger time all item get function work
    useEffect(() => {
        getAllItemsHandel()
    }, []);

    //----------item delete after all item get function work
    useEffect(() => {
        getAllItemsHandel()
    }, [itemDelete]);


    return (
        <>
            <PageMeta
                title="warehouse"
                description="warehouse"
            />
            <PageBreadcrumb pageTitle="Warehouse"/>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 h-screen w-full p-4">
                <div className="space-y-6 col-span-2">
                    <ComponentCard title="All Items">
                        <AllItemsTable allItems={allItems}/>
                    </ComponentCard>
                </div>
            </div>

        </>
    );
}
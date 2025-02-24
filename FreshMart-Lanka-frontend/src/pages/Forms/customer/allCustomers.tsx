import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import AllCustomersTable from "../../../components/tables/BasicTables/AllCustomersTable.tsx";

export default function AllCustomers(){
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Warehouse" />
            <div className="space-y-6">
                <ComponentCard title="All Items">
                    <AllCustomersTable/>
                </ComponentCard>
            </div>
        </>
    )
}
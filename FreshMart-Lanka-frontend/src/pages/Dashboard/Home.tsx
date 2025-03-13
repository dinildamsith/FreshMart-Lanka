import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import {useEffect, useState} from "react";
import {customerCount} from "../../services/customer/customerServices.ts";
import {allOrdersSummaryGet} from "../../services/order/orderServices.ts";

export default function Home() {

  const [allCustomerCount, setAllCustomerCount] = useState<any>()
  const [ordersSummary, setOrderSummary] = useState<any>()

  const customerCountGet = async () => {
    const res = await customerCount()
    setAllCustomerCount(res?.data)
  }

  const allOrdersSummary = async () => {
    const res = await allOrdersSummaryGet()
    setOrderSummary(res?.data)
  }


  useEffect(() => {
    customerCountGet()
    allOrdersSummary()
  }, []);

  return (
    <>
      <PageMeta
        title="dashbord"
        description="dashbord"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics customerCount={allCustomerCount}  ordersCount={ordersSummary?.orderTotal}/>

          <MonthlySalesChart orderCount={ordersSummary?.orderCount}/>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

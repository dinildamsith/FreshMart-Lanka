import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import AlItemsTable from "./pages/Tables/AlItemsTable.tsx";
import ItemForm from "./pages/Forms/item/ItemForm.tsx";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CustomerForm from "./pages/Forms/customer/customerForm.tsx";
import Warehouse from "./pages/Forms/item/warehouse.tsx";
import AllCustomers from "./pages/Forms/customer/allCustomers.tsx";
import PurchaseOrderForm from "./pages/Forms/order/purchaseOrderForm.tsx";
import {Toaster} from "react-hot-toast";
import AllOrders from "./pages/Forms/order/allOrders.tsx";

export default function App() {
  return (
    <>
      {/* Add the Toaster component here to ensure it's globally available */}
      <Toaster
          position="top-right" // You can adjust the position as per your preference
          reverseOrder={false}
          containerStyle={{zIndex: 9999999999}}
      />

      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashbord" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/items-manage" element={<ItemForm />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/customers-manage" element={<CustomerForm />} />
            <Route path="/all-customers" element={<AllCustomers />} />
            <Route path="/purchase-new-order" element={<PurchaseOrderForm />} />
            <Route path="/all-orders" element={<AllOrders/>} />



            {/* Tables */}
            <Route path="/basic-tables" element={<AlItemsTable />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

import {
  Route,
  createRoutesFromElements,
  createHashRouter,
  createBrowserRouter,
} from "react-router-dom";

import TradeCount from "../container/Admin/Setups/TradeCount/Tradecount";
import CounterLimit from "../container/Admin/Reports/CounterParty/CounterLimit";
import VolMeter from "../container/Admin/Reports/VolMeter/VolMeter";
import CategoryManagement from "../container/Admin/Setups/CategoryManagement/CategoryManagement";
// import CorporateUser from "../container/Admin/Pages/UserManagements/CorporateUser/CorporateUser";
import CorporateList from "../container/Admin/Setups/CorporateUserList/CorporateList";
import BankerList from "../container/Admin/Setups/BankerList/BankerList";
import LoginHistory from "../container/Admin/Setups/LoginHistory/LoginHistory";
import TradeAccessManagement from "../container/Admin/Setups/TradeAccessManagement/TradeAccessManagement";
import SpreadManagement from "../container/Admin/Setups/Spread Management/SpreadManagement";
import SystemLogin from "../container/AdminLogin/System Login/Login/SystemLogin";
import CreatePassword from "../container/AdminLogin/System Login/CreatePassword/CreatePassword";
import ChangePassword from "../container/AdminLogin/System Login/ChangePassword/ChangePassword";
import ResetPassword from "../container/AdminLogin/System Login/ResetPassword/ResetPassword";
import TwoFaVerification from "../container/AdminLogin/System Login/2faVerificationScreen/TwoFaVerification";
import AdminDashboard from "../container/Admin/AdminDashboard/AdminDashboard";
import BankUser from "../container/Admin/Pages/UserManagements/BankUser/BankUser";
import CorporateUser from "../container/Admin/Pages/UserManagements/CorporateUser/CorporateUser";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SystemLogin />} />
      <Route path="CreatePassword" element={<CreatePassword />} />
      <Route path="ChangePassword" element={<ChangePassword />} />
      <Route path="ResetPassword" element={<ResetPassword />} />
      <Route path="2FAVerfication" element={<TwoFaVerification />} />
      {/* <Route element={<PrivateRoutes />}> */}
      <Route path="/BOP/" element={<AdminDashboard />}>
        {/* <Route path="" element={<PropertyType />} /> */}
        {/* <Route path="" element={<AssetsBanking />} /> */}

        <Route index element={<BankUser />} />
        <Route path="AddBankUser" element={<BankUser />} />
        <Route path="tradeCount" element={<TradeCount />} />
        <Route path="counterLimit" element={<CounterLimit />} />
        <Route path="volMeter" element={<VolMeter />} />
        <Route path="categorymanagement" element={<CategoryManagement />} />
        <Route path="CorporateUser" element={<CorporateUser />} />
        <Route path="CorporateList" element={<CorporateList />} />
        <Route path="BankerList" element={<BankerList />} />
        <Route path="LoginHistory" element={<LoginHistory />} />
        <Route
          path="TradeAccessManagement"
          element={<TradeAccessManagement />}
        />

        <Route path="SpreadManagement" element={<SpreadManagement />} />
      </Route>
      {/* </Route> */}
    </>
  )
);

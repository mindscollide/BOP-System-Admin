import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import VolMeter from "../container/Admin/Pages/Setup/VolMeter/VolMeter";
import CategoryManagement from "../container/Admin/Pages/Setup/CategoryManagementFX/CategoryManagement/CategoryManagement";
import BankerList from "../container/Admin/Pages/UserManagements/BankerList/BankerList/BankerList";
import SystemLogin from "../container/AdminLogin/System Login/Login/SystemLogin";
import CreatePassword from "../container/AdminLogin/System Login/CreatePassword/CreatePassword";
import ChangePassword from "../container/AdminLogin/System Login/ChangePassword/ChangePassword";
import ResetPassword from "../container/AdminLogin/System Login/ResetPassword/ResetPassword";
import TwoFaVerification from "../container/AdminLogin/System Login/2faVerificationScreen/TwoFaVerification";
import AdminDashboard from "../container/Admin/AdminDashboard/AdminDashboard";
import BankUser from "../container/Admin/Pages/UserManagements/BankUser/BankUser";
import CorporateUser from "../container/Admin/Pages/UserManagements/CorporateUser/CorporateUser";
import CorporateList from "../container/Admin/Pages/UserManagements/CorporateUsersList/CorporateUsersList/CorporateList";
import LoginHistory from "../container/Admin/Pages/UserManagements/LoginHistory/LoginHistory";
import TradeCount from "../container/Admin/Pages/UserManagements/TradeCount/TradeCount/TradeCount";
import TradeAccessManagement from "../container/Admin/Pages/Setup/TradeAccessManagement/TradeAccessManagement/TradeAccessManagement";
import SpreadManagement from "../container/Admin/Pages/Setup/Spread Management/SpreadManagement";
import CurrencyManagement from "../container/Admin/Pages/Setup/CurrencyManagement/CurrencyManagement";
import HolidaysManagement from "../container/Admin/Pages/Setup/HolidaysManagement";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SystemLogin />} />
      <Route path="CreatePassword" element={<CreatePassword />} />
      <Route path="ChangePassword" element={<ChangePassword />} />
      <Route path="ResetPassword" element={<ResetPassword />} />
      <Route path="2FAVerfication" element={<TwoFaVerification />} />
      <Route path="/BOP/" element={<AdminDashboard />}>
        <Route index element={<BankUser />} />
        <Route path="AddBankUser" element={<BankUser />} />
        <Route path="tradeCount" element={<TradeCount />} />
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
        <Route path="HolidaysManagement" element={<HolidaysManagement />} />
        <Route path="CurrencyManagement" element={<CurrencyManagement />} />
        <Route path="SpreadManagement" element={<SpreadManagement />} />
      </Route>
    </>
  )
);

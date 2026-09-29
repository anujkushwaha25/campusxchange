import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingBar from "./components/LoadingBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/Forgotpass";
import Dashboard from "./afterlogpages/Dashboard";
import SellItem from "./afterlogpages/SellItem";
import MyListings from "./afterlogpages/MyListings";
import Messages from "./afterlogpages/Messages/Messages"
import Myorders from "./afterlogpages/Myorders";
import Wishlist from "./afterlogpages/Wishlist";
import Profile from "./afterlogpages/settings/Profile";
import AccountSecurity from "./afterlogpages/settings/AccountSecurity";
import BrowseProducts from "./afterlogpages/Browse/BrowseProducts";
import BuyProduct from "./afterlogpages/Browse/BuyProduct";
import SellerWallet from "./afterlogpages/SellerWallet";


function App() {
   useEffect(() => {
   AOS.init({
  duration: 1000,
  once: true,
  mirror:false,
  offset: 100,
  easing: "ease-in-out",
  delay: 100,
});
  }, []);
  return (
    <BrowserRouter>
      <LoadingBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "Login" element={<Login/>} />    
        <Route path="Signup" element={<Signup/>}/>
        <Route path="/admin-login" element={<AdminLogin />}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell-item" element={<SellItem />} />
        <Route path="/mylistings" element={<MyListings/>}/>
        <Route path="/messages/" element={<Messages/>}/>
        <Route path="/messages/:sellerId" element={<Messages/>}/>
        <Route path="/myorders" element={<Myorders/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/browseproducts" element={<BrowseProducts/>}/>
        <Route path="/accountsecurity" element={<AccountSecurity />}/>
       <Route path="/buy/:productId" element={<BuyProduct/>}/>
       <Route path="/sellerwallet" element={<SellerWallet/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
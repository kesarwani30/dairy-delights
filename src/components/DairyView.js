import React, { useContext } from "react"
import {Routes,Route,Navigate,Outlet} from "react-router-dom"
import DairyList from "./DairyList"
import AboutUs from "./AboutUs"
import ContactUs from "./ContactUs"
import Login from "./Login"
import SignUp from "./SignUp"
import UserHome from "./UserHome"
import AdminHome from "./AdminHome"
import MoreDetails from "./MoreDetails"
import Cart from "./Cart"
import OrderHistory from "./OrderHistory"
import EditProduct from "./EditProduct"
import AddProduct from "./AddProduct"
import ErrorFallback from "./ErrorFallback"
import {DataContext} from "../App"
import { ErrorBoundary } from "react-error-boundary";

export default function DairyView(){

    const  {isLoggedIn} = useContext(DataContext)
    const ProtectedRoute=()=>{
        return isLoggedIn===true ? <Outlet/> : <Navigate to="/login"/>;
    }
    const main={
        height:"auto",
        padding:"10px",
        margin:"10px"
    }
    return(
        <div style={main}>
           <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    <Route path="/" element={<DairyList />}/>
                    <Route path="/home" element={<DairyList />}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/contactus" element={<ContactUs/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/> 
                    <Route path="/moredetails" element={<MoreDetails/>}/>
                    <Route path="/cart" element={<Cart/>}/>     
                    <Route element={<ProtectedRoute />}>               
                        <Route path="/userhome" element={<UserHome/>}/>       
                        <Route path="/adminhome" element={<AdminHome/>}/>
                        <Route path="/orderHistory" element={<OrderHistory/>}/>
                        <Route path="/editproduct" element={<EditProduct/>}/>
                        <Route path="/addproduct" element={<AddProduct/>}/>
                    </Route>
                </Routes>
            </ErrorBoundary>
        </div>
    )
}
import './App.css';
import Homepage from "./pages/homepage/homepage";
import React from "react";
import {Route, Routes} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage";
import Header from "./components/header/header";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" Component={Homepage}/>
                <Route path="/shop" Component={ShopPage}/>
            </Routes>
        </div>
    );
}

export default App;

import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import {Route, Routes, useLocation} from "react-router-dom";
import CollectionPage from "../collections/collections";

const ShopPage = () => {
    return (<div className='shop-page'>
        <Routes>
            <Route exact path='/' Component={CollectionsOverview}/>
            <Route path=':collectionId' Component={CollectionPage} />
        </Routes>

    </div>)
}

export default ShopPage;
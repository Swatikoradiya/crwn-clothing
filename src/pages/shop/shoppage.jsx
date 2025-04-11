import React from "react";
import {Route, Routes} from "react-router-dom";
import {connect} from "react-redux";
import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collections/collections.container";
import {fetchCollectionsStart} from "../../redux/shop/shop.action";

class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
    }

    render() {
        return (
            <div className='shop-page'>
                <Routes>
                    <Route
                        exact
                        path='/'
                        Component={CollectionOverviewContainer}/>
                    />
                    <Route
                        path=':collectionId'
                        Component={CollectionPageContainer}/>
                    />
                </Routes>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);


import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching} from "../../redux/shop/shop.selector";
import {connect} from "react-redux";
import CollectionsOverview from "./collections-overview";
import withSpinner from "../with-spinner/with-spinner";
import {compose} from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);

export default CollectionOverviewContainer;
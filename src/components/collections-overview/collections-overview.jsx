import "./collections-overview.scss";
import {connect} from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview";
import {createStructuredSelector} from "reselect";
import {selectCollections, selectCollectionsForPreview} from "../../redux/shop/shop.selector";

const CollectionsOverview = ({collections}) => {
    console.log("Collection overview : ", collections);
    return (
        <div className='collection-overview'>
            {collections.map(collection => (
                <CollectionPreview key={collection.id} {...collection}></CollectionPreview>
            ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
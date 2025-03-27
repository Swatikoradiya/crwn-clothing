import {connect} from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview";
import {createStructuredSelector} from "reselect";
import {selectCollectionsForPreview} from "../../redux/shop/shop.selector";
import {CollectionsOverviewContainer} from "./collections-overview.styles";

const CollectionsOverview = ({collections}) => {
    return (
        <CollectionsOverviewContainer className='collection-overview'>
            {collections.map(collection => (
                <CollectionPreview key={collection.id} {...collection}></CollectionPreview>
            ))}
        </CollectionsOverviewContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
import {connect} from "react-redux";
import {selectCollection} from "../../redux/shop/shop.selector";
import {withRouter} from "../../router/withRouter";
import CollectionItem from "../../components/collection-item/collection-item";
import {CollectionItemsContainer, CollectionPageContainer, CollectionTitle} from "./collections.styles";

const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {collectionId} = ownProps.router.params;
    return {
        collection: selectCollection(collectionId)(state)
    };
};

export default withRouter(connect(mapStateToProps)(CollectionPage));
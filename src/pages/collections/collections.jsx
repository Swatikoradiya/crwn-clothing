import "./collections.scss";
import {connect} from "react-redux";
import {selectCollection} from "../../redux/shop/shop.selector";
import {withRouter} from "../../router/withRouter";
import CollectionItem from "../../components/collection-item/collection-item";

const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {collectionId} = ownProps.router.params;
    console.log("collectionId ", collectionId);
    return {
        collection: selectCollection(collectionId)(state)
    };
};

export default withRouter(connect(mapStateToProps)(CollectionPage));
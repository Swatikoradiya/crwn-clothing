import {connect} from "react-redux";
import {addItem} from "../../redux/cart/cart.actions";
import {
    AddButton,
    BackgroundImage,
    CollectionFooterContainer,
    CollectionItemContainer,
    NameContainer,
    PriceContainer
} from "./collection-item.styles";

const CollectionItem = ({item, addItem}) => {
    return (
        <CollectionItemContainer>
            <BackgroundImage style={{backgroundImage: `url(${item.imageUrl})`}}></BackgroundImage>
            <CollectionFooterContainer>
                <NameContainer>{item.name}</NameContainer>
                <PriceContainer>${item.price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)}>Add to cart</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);
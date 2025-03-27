import CartItem from "../cart-item/cart-item";
import {connect} from "react-redux";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {withRouter} from "../../router/withRouter";
import {useNavigate} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {
    CartDropdownButton, CartDropDownContainer, CartItemsContainer, EmptyMessageContainer
} from "./cart-dropdown.styles";

const CartDropdown = ({cartItems, dispatch}) => {
    const navigate = useNavigate();
    return (<CartDropDownContainer>
        <CartItemsContainer>
            {cartItems.length > 0 ? cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem}/>)) : (
                <EmptyMessageContainer>Your cart is empty!</EmptyMessageContainer>)}
        </CartItemsContainer>
        <CartDropdownButton
            onClick={() => {
                navigate('/checkout');
                dispatch(toggleCartHidden())
            }}
        >
            CHECKOUT
        </CartDropdownButton>
    </CartDropDownContainer>)
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));
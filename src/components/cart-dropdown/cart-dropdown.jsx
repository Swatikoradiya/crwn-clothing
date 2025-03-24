import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import {connect} from "react-redux";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {withRouter} from "../../router/withRouter";
import {useNavigate} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems, dispatch}) => {
    const navigate = useNavigate();
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length > 0
                        ? cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem}/>
                        ))
                        : (<span className='empty-message'>Your cart is empty!</span>)
                }
            </div>
            <CustomButton onClick={() => {
                navigate('/checkout');
                dispatch(toggleCartHidden())
            }}>CHECKOUT</CustomButton>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));
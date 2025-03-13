import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="cart-items">
            <CustomButton className="button">GO TO CHECKOUT</CustomButton>
        </div>
    </div>
)

export default CartDropdown;
import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
    hidden: true
};

const CartReducer = (state = INITIAL_STATE, action) => {
    console.log("Action : ", action);
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN :
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
}

export default CartReducer;
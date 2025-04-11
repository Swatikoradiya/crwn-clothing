import './App.css';
import Homepage from "./pages/homepage/homepage";
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up-page";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout";
import {checkUserSession} from "./redux/user/user.actions";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();
    }

    componentWillUnmount() {
        // this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Routes>
                    <Route path="/" Component={Homepage}/>
                    <Route path="/shop/*" Component={ShopPage}/>
                    <Route path="/checkout" Component={CheckoutPage}/>
                    <Route exact path="/signin"
                           element={this.props.currentUser ? (<Navigate to="/"/>) : (<SignInAndSignUpPage/>)}/>
                </Routes>
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
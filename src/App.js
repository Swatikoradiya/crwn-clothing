import './App.css';
import Homepage from "./pages/homepage/homepage";
import React from "react";
import {Route, Routes} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up-page";
import {auth} from "./firebase/firebase-utils";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            console.log(user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Routes>
                    <Route path="/" Component={Homepage}/>
                    <Route path="/shop" Component={ShopPage}/>
                    <Route path="/signin" Component={SignInAndSignUpPage}/>
                </Routes>
            </div>
        );
    }

}

export default App;

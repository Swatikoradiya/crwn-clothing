import './App.css';
import Homepage from "./pages/homepage/homepage";
import React from "react";
import {Route, Routes} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up-page";
import {auth, CreateUserProfileDocument} from "./firebase/firebase-utils";
import SignUp from "./components/sign-up/sign-up";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await CreateUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            }
            this.setState({currentUser: userAuth});
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

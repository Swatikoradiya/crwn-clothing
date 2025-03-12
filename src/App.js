import './App.scss';
import Homepage from "./pages/homepage/homepage";
import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import ShopPage from "./pages/shop/shoppage";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up-page";
import {auth, CreateUserProfileDocument} from "./firebase/firebase-utils";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await CreateUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {

                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                })
            }
            setCurrentUser(userAuth);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Routes>
                    <Route path="/" Component={Homepage}/>
                    <Route path="/shop" Component={ShopPage}/>
                    <Route exact path="/signin" element={this.props.currentUser ? (<Navigate to="/"/>) : (<SignInAndSignUpPage/>)}/>
                </Routes>
            </div>
        );
    }

}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

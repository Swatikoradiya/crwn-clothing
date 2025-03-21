import React from "react";
import FormInput from "../form-input/form-input";
import "./sign-in.scss";
import CustomButton from "../custom-button/custom-button";
import {auth, SignInWithGoogle} from "../../firebase/firebase-utils";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.error("Error while sign in : ", e.message);
        }
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign In with your email and Password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' value={this.state.email} handleChange={this.handleChange}
                               label='email' required/>
                    <FormInput name='password' type='password' value={this.state.password}
                               handleChange={this.handleChange} label='password'
                               required/>

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
import React from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import {auth, CreateUserProfileDocument} from "../../firebase/firebase-utils";
import {SignUpContainer, SignUpTitle} from "./sign-up.styles";
import {connect} from "react-redux";
import {signUpStart} from "../../redux/user/user.actions";

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        signUpStart({displayName, email, password});
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign Up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={this.state.displayName}
                        label='Display Name'
                        handleChange={this.handleChange}
                        required/>

                    <FormInput
                        type='text'
                        name='email'
                        value={this.state.email}
                        label='Email'
                        handleChange={this.handleChange}
                        required/>

                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        label='Password'
                        handleChange={this.handleChange}
                        required/>

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        label='Confirm Password'
                        handleChange={this.handleChange}
                        required/>

                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </SignUpContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
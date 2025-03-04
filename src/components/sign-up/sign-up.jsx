import React from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import {auth, CreateUserProfileDocument} from "../../firebase/firebase-utils";
import "./sign-up.scss";

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

        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }
        
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await CreateUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (e) {
            console.error("Error while adding a new user : ", e.message);
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
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
            </div>
        )
    }
}

export default SignUp;
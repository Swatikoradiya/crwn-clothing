import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import "./sign-in-and-sign-up-page.scss";

const SignInAndSignUpPage = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn></SignIn>
            <SignUp></SignUp>
        </div>
    )
}

export default SignInAndSignUpPage;
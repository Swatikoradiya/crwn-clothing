import "./with-spinner.styles";
import {SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

const WithSpinner = WrappedComponent => {
    console.log(WrappedComponent);
    return ({isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
}

export default WithSpinner;
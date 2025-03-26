import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51R6UynHCnnBaVwOnlbGH7FV40xysEur7wGCssCNJboCY0G25mkGqJupeDDxldpF3NiPkRhdffdsbZJ1wqMK3lN2X00uIctmfZE';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://i.postimg.cc/nzfCYcr1/crown.png'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            currency='USD'
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey} />
    )
}

export default StripeCheckoutButton;
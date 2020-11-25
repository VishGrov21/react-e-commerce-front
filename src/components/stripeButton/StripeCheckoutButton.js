import React from 'react';
import StripeButton from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const onToken = (token) => {
    // This toke is passed to backend which then creates the charge
    console.log(token);
    alert('Payment Successful');
  };
  const priceForStripe = price;
  const publishableKey =
    'pk_test_51HrGnJHWuwcUOtD0DGwcOsY9d9U8UZmCgttwvmOwVmQSxhVSF4qC8Zn9SK8qRho7yK23nFX4qI9TvVjbNXyv4vo200vsjsEVeF';
  return (
    <StripeButton
      label='Pay Now'
      name='Crown Clothing'
      billingAddress
      shippingAddress
      description={`Total Price is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      // token is the on success callback which triggers when we submit
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

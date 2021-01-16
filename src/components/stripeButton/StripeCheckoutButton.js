import React from 'react';
import StripeButton from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HrGnJHWuwcUOtD0DGwcOsY9d9U8UZmCgttwvmOwVmQSxhVSF4qC8Zn9SK8qRho7yK23nFX4qI9TvVjbNXyv4vo200vsjsEVeF';
  const onToken = (token) => {
    axios({
      url: 'http://localhost:5000/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        console.log('Payment Successful');
        alert('Payment Successful');
      })
      .catch((err) => {
        console.log(err);
        // console.log('Error', JSON.parse(err));
      });
  };
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

import React, { Component } from 'react'
import Axios from 'axios'
import Butto from "./Button/Button";
export class Razorpay extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
   // this.razorPayHandler = this.razorPayHandler(this);

  }

  async razorPayPaymentHandler() {
    const API_URL = `https://razorpayapi2121.azurewebsites.net/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    
    const options = {
      key: 'rzp_test_avjJKVYmb8zit0',
      name: "Buy Premium",
      description: "",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
             console.log('success')
         }
         
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  
  render() {
    return (
      <>
      <div>
      <Butto theme="Primary"
      onclick={this.razorPayPaymentHandler}
      className="btn btn-primary">
        Pay Now
      </Butto>
    </div>
      </>

    )
  }
}

export default Razorpay;

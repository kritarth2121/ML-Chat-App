import React from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
//import { Button } from '@material-ui/core';
import Butto from "./Button/Button";
import { useHistory } from 'react-router-dom';

interface props {}

const Razorpay : React.FC<props> = () => { 
  const user = useSelector(selectUser);
  const history = useHistory();
  async function  razorPayPaymentHandler() :Promise<any>  {

    if (!user){
      history.push("/login")
      alert("First Login ,to buy a premium");
      return;
    }

    const API_URL=`http://localhost:5000/razorpay/`
    //const API_URL = `https://razorpayapi2121.azurewebsites.net/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    

    const options = {
      key: 'rzp_live_OgpgPeLThwTOSQ',
      name: "Buy Premium",
      description: "",
      order_id: data.id,
      handler: async (response:any) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
          var citiesRef = db.collection("premium");
             console.log('success',citiesRef);
             db.collection("premium").doc(user.uid).set({premium:true}) ;
             
         }
         
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  }
  
  
    return (
      <>
      <div>
      <Butto theme="Primary"
      onclick={()=>razorPayPaymentHandler()}
      >

        Buy Premium
      </Butto>
    </div>
      </>

    )
  
};

export default React.memo(Razorpay);
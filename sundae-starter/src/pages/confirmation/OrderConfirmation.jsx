import React, { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import { Button } from "react-bootstrap";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      //in real app we would get order details from context
      //and send the POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response?.data?.orderNumber);
      })
      .catch((error) => {
        //Todo: handle error here
      });
  }, []);

  const handleClick = () => {
    resetOrder();

    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per out terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;

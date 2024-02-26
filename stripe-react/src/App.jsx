import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";
import CheckoutForm from "./components/checkoutForm.jsx";
import ModernDevGuide from "./assets/moderndev-guide.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuccessPage from "./components/successPage.jsx";

const PRICE_OF_THE_PRODUCT = 20;

const stripePromise = loadStripe("pk_test_51Onz66JHuJFGPQmWJowezl2fwrcK7V3EzHdgX9KkErrQtqMySC3LhvD4jfT5BXLvO8yeYpgR768D7qb2zlNIX4tk00TEZLKzNg");

function Home() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Make sure to change the url in development
    fetch(`http://localhost:4242/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "moderndev_guide" }] })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe"
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="App">
      <h1 className="header">Buy The Moderndev Guide</h1>
      <img className="product-image" src={ModernDevGuide} alt="" />
      <h3 className="price">Price: {PRICE_OF_THE_PRODUCT}$</h3>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
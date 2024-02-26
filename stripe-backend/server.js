const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PRICE_OF_THE_PRODUCT = 20;

app.use(express.static("public"));
app.use(express.json());

app.use(cors());
const calculateOrderAmount = (items) => {
  return items?.length * PRICE_OF_THE_PRODUCT * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({

    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));



const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require('body-parser');
const port = 3000;
const url = "https://business-api.tiktok.com/open_api/v1.2/pixel/track/";
const token = "3b228a7c437b4db8fe3933394870b55ba2efd1a8";

const request = {
  pixel_code: "C9ENMI3C77U9N0P9IE10",
  event: "CompletePayment",
  event_id: "",
  timestamp: "",
  // test_event_code: "TEST73988",

  context: {
    ad: {
      callback: "",
    },
    user: {
      external_id: "",
    },
    page: {
      url: "http://livethebester.tilda.ws/protectnew123",
    },

    ip: "",
    user_agent: "",
  },

  properties: {
     contents: [],
     currency: "",
     value: ""
  },
};

app.use(bodyParser.json())

app.post("/api", async (req, res) => {

  const ttclid = req.body.ttclid;
  const event_id = req.body.event_id;
  const user_id = req.body.user_id;
  const purchase_date = req.body.purchase_date;
  const ip = req.body.ip;
  const user_agent = req.body.user_agent;
  const currency = req.body.currency;
  const price = req.body.price;

  console.log("body = ", request.body);
  console.log("ttclid = ", req.body.ttclid);

  const content = {
    price: price,
    quantity: 1,
    content_type: "product",
    content_id: event_id,
  };

  if (ttclid == "") return res.json({status: false, message: "ttclid is required" });

  try {

    request.event_id = event_id;
    request.timestamp = purchase_date;
    request.context.ad.callback = ttclid;
    request.context.user.external_id = user_id;
    request.context.user_agent = user_agent;
    request.context.ip = ip;
    request.properties.currency = currency;
    request.properties.value = price;
    request.properties.contents = [content];

    redirect = await axios.post(url, request, {
      headers: {
        "Access-Token": token,
        "Content-Type": "application/json"
      },
    });

  } catch (e) {
    console.log(e);
    return res.json({ status: false, message: "something went wrong" });
  }

  res.send(redirect.data);
});


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});


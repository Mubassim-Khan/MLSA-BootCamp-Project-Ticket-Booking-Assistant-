const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion , Payload } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/dialogflow", async (req, res) => {
    res.send(200);
  })

app.post("/dialogflow", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });


    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hi, I will assist in booking your flight. Just let me know your destination. ")
    
        const payload = {
            "richContent": [
              [
                {
                  "options": [
                    {
                      "text": "Flight Schedule"
                    },
                    {
                      "text": "Booking"
                    }, 
                    {
                      "text": "Airport"
                    },
                    {
                      "text": "Airlines"
                    }
                  ],
                  "type": "chips"
                }
              ]
            ]
          }
          agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            })
          );
    }

    let intentMap = new Map();
    intentMap.set('hi', hi); 
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
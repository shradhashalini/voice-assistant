// Import the appropriate service and chosen wrappers
const express = require('express');
const bodyParser = require('body-parser');

//const functions = require('firebase-functions');
/*var mysql = require('mysql');
var bathroom_visits = '';
var bathroom_visits_string = '';*/

// Import the service function and various response classes
const {
 dialogflow,
 Image,
} = require('actions-on-google');

// Create an app instance
const app = dialogflow();
//const app = express().use(bodyParser.json());
/*var con = mysql.createConnection({
  host: "robby.cirl.missouri.edu",
  user: "ss9cw",
  password: "Kunugeli$123",
  database: "adl_sandbox"
  //port: "3306"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT hit_count FROM adl_sandbox.bathroom_visits where userid = '3004' and start_time = '2005-11-10 18:49:59'", function (err, result, fields) {
    if (err) throw err;
    //console.log(result[0].hit_count);
    bathroom_visits = result[0].hit_count;
    console.log("value=", bathroom_visits);
    bathroom_visits_string = bathroom_visits.toString();
    console.log(typeof bathroom_visits_string);
  });
});*/


/*const app = dialogflow({
  debug: true,
});*/

// Register handlers for Dialogflow intents

app.intent('Default Welcome Intent', conv => {
  conv.ask('Hi, how is it going?');
  //conv.ask(`Here's a picture of a cat`)
  //conv.ask(new Image({
    //url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    //alt: 'A cat',
  //}))
});

/*app.intent('Default Welcome Intent', (conv) => {
  //conv.ask('Hi, Welcome to Health System ${var1_string}');
  conv.ask('Welcome. Your number of bathroom visit are '+ bathroom_visits_string);
  //conv.ask(new Image({
  //  url: '/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
  //  alt: 'A cat',
  //  accessibilityText: "hi",

});*/

// Intent in Dialogflow called `Goodbye`
app.intent('Goodbye', conv => {
  conv.close('See you later!');
});

/*app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
}) */

app.fallback((conv) => {
  conv.ask(`I couldn't understand. Can you say that again?`);
});

app.catch((conv, error) => {
  console.error(error);
  conv.ask('I encountered a glitch. Can you say that again?');
});

const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillment', app);
expressApp.listen(3000);

// name has to be `dialogflowFirebaseFulfillment`
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

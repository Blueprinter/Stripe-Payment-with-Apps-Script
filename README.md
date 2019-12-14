Note that there is now a new repo with stripe version 3 code in the repo

https://github.com/Blueprinter/stripe-js.v3-using-elements

# Stripe-Payment-with-Apps-Script
Process an online payment from Stripe with Apps Script

This project is set up as an Apps Script Web App.
This project is meant for purposes of learning how to process a payment with stripe.com
It may not fit your "use case".
It is assumed that you know how to create and publish an Apps Script web app.  If you do not know how to do that,
you will need to learn that.
You need to know JavaScript, CSS and HTML to understand the user interface.
You need to understand JSON to understand the data.
You need to know and understand Apps Script UrlFetchApp.fetch(url) in order to understand this code

There is no gaurantee that this code will work for you.  You are responsible for testing it.

To understand "templated HTML" in Apps Script, see the following documentation:
https://developers.google.com/apps-script/guides/html/templates

You must know and understand the 2 different modes used by stripe.com
stripe.com has a "test" mode and a "live" mode

stripe provides some code that you must use in the client-side HTML

     <script src="https://checkout.stripe.com/checkout.js"></script>

Put that in the  head tag

    <head>
      <script src="https://checkout.stripe.com/checkout.js"></script>
    </head>
  
The flow of events for this set up, is that the actual payment processing is done from Google's server to stripes server, not from the users computer (client side) to Stripe.  So, you need to collect payment information, send it to a "gs" script file, and then make a urlFetchApp.fetch(url) call to Stripe.  Then a confirmation comes back, and you need a "success handler" in the client side JavaScript code.  


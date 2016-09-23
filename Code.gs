function doGet() {//doGet is a reserved function name that runs from a GET request in the browser
  return HtmlService.createTemplateFromFile('HTML_PayProcess').evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('Monitize with Stripe');
};

// GLOBAL VARIABLES - Global variable in all Caps for clear identifiation of a global
var STRIPE_SECRET = 'sk_test_etc';   // *** DEV Stripe Secret ***
//var STRIPE_SECRET = 'sk_live_etc';   // *** LIVE Stripe Secret ***

//Test with the test secret key
//For getting live payments - comment out the test line and un comment the live line

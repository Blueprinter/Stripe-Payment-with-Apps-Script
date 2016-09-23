function doGet() {
  return HtmlService.createTemplateFromFile('HTML_PayProcess').evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('Monitize with Stripe');
};

// GLOBAL VARIABLES
var STRIPE_SECRET = 'sk_test_etc';   // *** DEV Stripe Secret ***
//var STRIPE_SECRET = 'sk_live_etc';   // *** LIVE Stripe Secret ***

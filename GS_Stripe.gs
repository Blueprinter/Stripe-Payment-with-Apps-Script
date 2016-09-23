/* Code for Stripe */
function processCharge(a) {//parameter "a" is a JSON string of customer and payment information
  var amount,charge,chargeResponse,credits,customer,custId,description,jsonP,path,objPaymentInfo;

  Logger.log('a: ' + a);
  
  objPaymentInfo = JSON.parse(a);
  Logger.log('objPaymentInfo: ' + objPaymentInfo);
  
  amount = objPaymentInfo.amount;
  description = objPaymentInfo.description;
  credits = objPaymentInfo.credits;

  Logger.log('amount: ' + amount);
  Logger.log('description: ' + description);
  Logger.log('credits: ' + credits);
  Logger.log('objPaymentInfo.token.id: ' + objPaymentInfo.token.id);
  Logger.log('objPaymentInfo.token.email: ' + objPaymentInfo.token.email);
  
  // Create a Customer (optional)
  path = "/customers";
  customer = stripeFuncs.Stripe_PostRequest(path, [], [], {
    "description": "Company Name customer", 
    "source": objPaymentInfo.token.id,
    "email": objPaymentInfo.token.email
  });

  Logger.log('customer: ' + customer);
  custId = JSON.parse( customer.getContentText() ).id;
  Logger.log('objPaymentInfo.token.email: ' + objPaymentInfo.token.email);

  // Create a Charge
  Logger.log('customer: ' + customer);
  
  path = "/charges";
  charge = stripeFuncs.Stripe_PostRequest(path, [], [], {
    "currency": "usd", 
    "amount": Number(amount),
    "description": description,
    "customer": custId,
    "receipt_email": objPaymentInfo.token.email //customer email
  });
  
  chargeResponse = charge.getResponseCode();
  
  return [chargeResponse,credits];
};

/**
 * Generic function for making a POST request to the Stripe API.
 * Provided by Stripe support
 *
 * @param {string} path
 * @param {Object} parameters 
 * @return {HTTPResponse} 
 */

var stripeFuncs = {
  Stripe_PostRequest:function(path, fields, expandableFields, parameters) {
    var options,secret,url;
    // Expand related fields when accessing sub-properties
    // (e.g. `customer.email` should expand the customer
    // object when retrieving a charge).
    if (expandableFields !== undefined) {
      parameters["expand[]"] = [];
      fields.forEach(function(field) {
        field = field.split(".")[0];
        if (expandableFields.indexOf(field) !== -1) {
          parameters["expand[]"].push("data." + field);
        }
      });
    }
    secret = STRIPE_SECRET;
    options = {
      "method" : "post",
      "headers": {
        "Authorization": "Bearer " + secret,
        "User-Agent": "Company Name/1.0"
      }
    };
    url = "https://api.stripe.com/v1" + path + stripeFuncs.serializeQueryString(parameters);
    return UrlFetchApp.fetch(url, options); 
  }
  ,serializeQueryString:function(parameters) {
    var key,str,value;
  
    Logger.log('parameters: ' + parameters);
    
    str = [];
  
    for (key in parameters) {
      value = parameters[key];
      if (parameters.hasOwnProperty(key) && value) {
        if (value.map) {
          str.push(value.map(function(array_value) {
            return key + "=" + encodeURIComponent(array_value);
          }).join("&"));
        } else {
          str.push(key + "=" + encodeURIComponent(value));
        }
      }
    }
    return '?' + str.join("&");
  }
  
};

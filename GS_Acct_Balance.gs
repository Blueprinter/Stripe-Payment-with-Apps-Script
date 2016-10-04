function accountFunctions(action,amount) {
  var beginBalance,crrntBalance;

  beginBalance = getUsrPrp('Premium_Balance');//Get current balance saved to user props

  //Logger.log("crrntBalance: " + crrntBalance);
  //Logger.log("amount: " + amount);

  crrntBalance = !beginBalance?50:beginBalance;//If beg balance is falsy then set the current balance value to 50
  //The reason to start the begining balance at 50, is so that users can use the service for free up to 50 credits
  switch(action) {
    case 'add':
      crrntBalance = parseFloat(parseFloat(crrntBalance) + parseFloat(amount));
      break;
    case 'subtract':
      crrntBalance = parseFloat(parseFloat(crrntBalance) - parseFloat(amount));
      break;
    default://This is for returning the current balance - no payment was made
      crrntBalance = crrntBalance;
  };

  crrntBalance = parseInt(crrntBalance);

  if (beginBalance !== crrntBalance) {
    setUsrPrp('Premium_Balance', crrntBalance);//Save the new balance to user props
  };
  
  //Logger.log("crrntBalance = " + crrntBalance);

  return crrntBalance;
};

function acctBalHtml() {
  var bal = accountFunctions('balance');
  return "<span><b>What you have Donated: $" + bal + "</b></span>";
};

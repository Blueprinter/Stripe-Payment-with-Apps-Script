function sendMsg(e,funcName,yourOwnErrorCode,msg) {
  var usrEmail;
  
  usrEmail = Session.getActiveUser().getEmail();
  MailApp.sendEmail(usrEmail, 'ERROR', 'error is: ' + e.message + "\n" +
                    'function name is: ' + funcName + ' message is:  ' + msg);
};

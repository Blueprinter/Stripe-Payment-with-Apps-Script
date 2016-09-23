function getUsrPrp(a) {//get Property
  var i,b,p;
  if (!a) {sendMsg(undefined,'getUsrPrp',undefined,'Failed to pass parameter');return;};
  for (i=1;i<6;i+=1) {try{
    if (!p) {//This iterates 5 times - no point getting the properties every time
      p = PropertiesService.getUserProperties();
    };
    if (p===null) {sendMsg(undefined,'getUsrPrp',undefined,'User Properties can not be retrieved');return};
    b = p.getProperty(a);
    return b;
    } catch(e) {
      if (i!==5) {Utilities.sleep(i*1000);};
      if (i===5) {
        sendMsg(e,'gPrp',undefined,"a: " + a);
      };
    };
  };
};

function setUsrPrp(a,b) {//Save a value to USER properties
  var i;
  if (typeof b==='object') {b=JSON.stringify(b);};
  for (i=1;i<6;i+=1) {try{
    PropertiesService.getUserProperties().setProperty(a,b);
    return true;//If successful, return true
    } catch(e) {
      if (i!==5) {Utilities.sleep(i*1000);};
      if (i===5) {
        sendMsg(e,'setPrp',undefined,"a: " + a);
        return false;
      };
    };
  };
};

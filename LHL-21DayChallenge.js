function powerOn(){
  ship.powerOn = true
  return ship.powerOn;
}

function countModules(){
    return availableModules.length;
}

function countEssential(){
  var counter = 0;
  for (var i in availableModules){
    if (availableModules[i].essential)
    counter += 1;
  }
  return counter;
}

function loadModule(index){
  availableModules[index].enabled = true;
  ship.modules.push(availableModules[index])
}

function lifeSupport(){
  for (var i in availableModules){
    if (availableModules[i].name === "life-support"){
      loadModule(i);
    }
  }
}
lifeSupport();

function findModuleIndex(modName){
  for (var i in availableModules){
    if ((availableModules[i].name === modName) && availableModules[i].essential)
      return i;
  }
}

function resetLARRY(){
  for (var counter = 1; counter <= 10; counter++)
{
 LARRY.quack();
}
}

radio.message = JSON.stringify(navigation);

function setMessage(){
  for (var i in radio){
    if (radio[i].name === "message"){
      loadModule(i);
    }
  }
}

function activateBeacon(){
  radio.beacon = true
  return radio.beacon;
}

function setFrequency(){
  radio.frequency = (radio.range.low + radio.range.high)/2;
}

function initialize(){
  navigation.x = 0;
  navigation.y = 0;
  navigation.z = 0;
  return (navigation.x, navigation.y, navigation.z)
}

function calibrateX(){
    for (i = 0; i < 12; i++){
      var signal = checkSignal();
      if (typeof signal !== "undefined"){
        navigation.x = signal;
     }
   }
}

function calibrateY(){
    for (i = 1; i < 61; i++){
      var signal = checkSignal();
      if (typeof signal !== "undefined"){
        navigation.y = signal;
        break;
     }
   }
}

function calibrateZ(){
    for (i = 1; i < 61; i++){
      var signal = checkSignal();
      if (typeof signal !== "undefined"){
        navigation.z = signal;
        break;
     }
   }
}

function calibrate(){
  calibrateX();
  calibrateY();
  calibrateZ();
}

function setSpeed(speed){
  if (speed >= 0){
    navigation.speed = parseInt(speed);
  }
}

function activateAntenna(){
  ship.antenna.active = true;
}

function sendBroadcast(){
  for (i = 0; i < 100; i++){
    broadcast()
  }
}

function configureBroadcast(){
  setFrequency()
  activateAntenna()
  sendBroadcast()
}

function decodeMessage(message){
  message = message
    .replace(/1/gi, "i")
    .replace(/4/gi, "a")
    .replace(/0/gi, "o")
    .replace(/3/gi, "e")
    .replace(/2/gi, "u")
    .replace(/5/gi, "y");
    return message;
  }

function returnToEarth(){
  navigation.x = parseInt(decodeMessage(broadcast("x")), 16);
  navigation.y = parseInt(decodeMessage(broadcast("y")), 16);
  navigation.z = parseInt(decodeMessage(broadcast("z")), 16);
}

returnToEarth();

configureBroadcast();

activateBeacon;

setMessage();

resetLARRY();
loadModule(findModuleIndex("propulsion"));
loadModule(findModuleIndex("navigation"));
loadModule(findModuleIndex("communication"));

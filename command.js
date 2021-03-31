class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     //commandType will be one of the following: 'MODE_CHANGE', 'MOVE', 'STATUS_CHECK'
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 
 module.exports = Command;
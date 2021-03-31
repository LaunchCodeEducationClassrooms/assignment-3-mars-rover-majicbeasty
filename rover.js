class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

  receiveMessage(message){
    let i = 0;
    let response = {
      message: message.name,
      results: []
    }; //set up empty response object
      
    if(message.commands){
      for(i = 0; i < message.commands.length; i++){
        let commandObj = {
          completed: false,
          roverStatus: {}
        };  
        let currentCommand = message.commands[i].commandType; //let the command equal the current command in the array that we look at
        

        if(currentCommand === 'STATUS_CHECK') {
          //no updates to rover object, build command object with completed and roverstatus properties
          commandObj.completed = true;
          commandObj.roverStatus = {
            //values for position, mode, generatorWatts will depend on current state of rover
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
          };
          response.results.push(commandObj); //****THIS UPDATES THE RESPONSE.RESULTS ARRAY
        }     
        
        else if(currentCommand === "MOVE") {
          if(this.mode === "NORMAL"){
            this.position = message.commands[i].value;
            commandObj["completed"] = true;
          }
          response.results.push(commandObj);          
        }

        else if(currentCommand === "MODE_CHANGE"){
          //update mode to rover object
          this.mode = message.commands[i].value;
          commandObj["completed"] = true;
          response.results.push(commandObj);
        }
        
      }
    }
    return response; //returns the array of command objects
  }
}

module.exports = Rover;
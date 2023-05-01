const { Sign } = require('crypto');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


  

// #CLASSES

class Room {
  constructor(description, connection, inventory, doorIsOpen) {
      this.description = description
      this.connection = connection
      this.inventory = inventory
      this.doorIsOpen = doorIsOpen
  }
}

class Item {
  constructor (name, description, inventory, firstAction, secondAction) {
    this.name =  name
    this.description = description
    this.inventory = inventory
    this.firstAction = firstAction
    this.secondAction = secondAction
  }
}

// ==================================================================        ITEMS          ======================================================================================




// ==================================================================        ROOMS         ======================================================================================


//================================================================        STATE MACHINE      ===================================================================================
//We need a State Machine to represent the different rooms and how they are connected
// the keys (left) are the different locations, the values (right) represent the possible transitions for each room
const locationsYouCanGo = {
 street : ['hallway'],
 hallway: ['street', 'kitchen', 'bedroom'],
 bedroom: ['hallway'],
 kitchen: ['hallway'],
};

// ==========================================================        LOOKUP TABLES      ==================================================================================================

const commandLookup = {
  inventory: [ 'i', 'inventory'],
  use: ['use'],
  pickup: ['take', 'get'],
  help: ['help'],
  drop: ['drop'],
  move: ['move'],
  read: ['read'],
  open: ['open'],
};

const roomLookup = {
  street: 'street',
  hallway: 'hallway'
}

 // ==============================================================       FUNCTIONS    ==============================================================================================
function useItem(Item) {
  console.log(`You use the ${Item}`);
}

function pickItem(Item) {
  player.inventory.push(Item);
  console.log(`Now ${Item} is part of your inventory`);
}

function dropItem(Item) {
  
}




function transition(newRoom) {
  const validTransitions = locationsYouCanGo[currentPlayerLocation];

  // first, we check if the transition is valid
    if (!validTransitions.includes(newRoom)) {
    console.log("We can't go this way, let's try somewhere else");
  } else {
    // if valid transition
    if (newRoom.doorIsOpen) { 
      // door is open, update current room and notify user
      console.log(`You walk to the ${newRoom.name}`);
      currentPlayerLocation = newRoom;
    } else {
      console.log(`You can't go this way! The door is locked.`); //but the door is closed..
    }
  }
}

function getInventory(item) {
  let stringInventory = item.inventory.toString(', '); //we turn the inventory (arr) into a string using the method toString()
  console.log(`In the ${item} there is: ${stringInventory} `);
}


function openItem(item) {
    if (!item.isOpen) {  //if we see that it is closed
      item.isOpen = true;
      console.log(`Perfect! Now the door opens.`);
    }   
  }
  








// ----------------------------------------------------
let player = {
  inventory: [],
  status: null
};
// *****************************************************
let currentPlayerLocation = 'street';
// *****************************************************

start();
async function start() {

  console.log(`182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign`);

  

while(true) {
  let answer = await ask(`What would you like to do now?\n`);  //The player's answer will be stored in the variable answer
  let inputArray = answer.split(' ');
  let command = inputArray[0];
  let thing = inputArray[1];

  if(commandLookup.move.includes(command)) {
    transition(thing)
  } 
  
  else if (commandLookup.inventory.includes(command)) {
    getInventory(thing)
  } 
  
  else if (commandLookup.use.includes(command)) {
    useItem(thing);
  } 
  
  else if (commandLookup.pickup.includes(command)) {
    pickItem(thing);
  } 
  
  else if (commandLookup.drop.includes(command)) {
    // ...
  } 
  
  else if(commandLookup.help.includes(command)) {
    console.log('put function here for help inventory')
  } 

  else if(commandLookup.drop.includes(command)) {
    console.log('put function here for drop inventory')
  }

  else if(commandLookup.read.includes(command)) {
    if (thing.includes('sign')) {
        console.log(sign.description);
    }  
  } 

  else if(commandLookup.open.includes(command)) {
    openItem(thing);
  } else {
    console.log(`Are you sure about your answer? ${command} doesn't seem right.
Try again`)
  }

}   

 
process.exit();

};

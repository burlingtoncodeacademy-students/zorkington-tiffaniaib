const { Sign } = require('crypto');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}




// ==================================================================       ITEMS        ===================================================================================================

const sign = { 
  read: async function solveRiddle () {
  console.log(`You went closer but it looks like the sign has changed. Now the text says:
  If 3 equals 5,
  and 25 equals 11.
  What does 17 equal to?
  If you provide the right answer, you will start a journey. But without a guide.
  You have only 3 guesses. Good luck!`)

  const question = 'What do you think is the number?\n';
  let answer = await ask(question);
  // First create a variable to store the total of tries that the player does because we gave a max of 3
  let totalGuesses = 2; //We set this to 2 so the counting will work and it will only allow 3 tries

    while (totalGuesses <= 3) {
      if (answer == 9) {
      console.log('I knew you were the one! The door is now open');
      break;
      } else {
      console.log(`${answer} is the wrong answer.`);
      totalGuesses++;
      answer = await ask("Try again\n");
      }
    }

    if (totalGuesses > 3) {
      console.log(`AAH wrog number!\nIt's sad to see you leaving so soon.\nGAME OVER!`);
      process.exit();
    }
  }
};

const backpack = {
  inventory: ['wallet', 'bottle of water', 'parchment'],
  message: function whatsInMyBackpack (inventory) {
    // first we need to turn the inventory (arr) into a string using the method toString()
    let stringInventory = backpack.inventory.toString(', ');

    // then we print a message that provides the p with the info on the inventory
    console.log(`It looks like you are covered! In your packpack you have:
    ${stringInventory}.`)}
};

const parchment = {
  read: `The content is the following:
  'You know where you're coming from, but not where you are going.
  The helves put some extra help in your bag
  without you knowing. 
  The objects are going to change, basing on your needs.
  You might find a potion, or some magic seeds.`
};

// CLASSES

class Room {
  constructor(description, connection, inventory) {
      this.description = description
      this.connection = connection
      this.inventory = inventory
  }
}

class Characters {
  constructor (inventory, status) {
    this.inventory = inventory
    this.status = status
  }
}

// ==================================================================        ROOMS         ======================================================================================
const field = new Room(
  `You have entered the foyer and the door shuts behind you;
  What you see look unbeliavebly beautiful:
  it's a huge field with bright green grass, that almost looks like it has no end.
  Ahead of you there is a long pathway that leads to a giagantic tree.
  On your right, 10 feet from where you are,
  there is a house from which you can hear baby screaming sound.`, //description
  ['pathway', 'brick house'], //connection
  ['red lollipop', 'yellow lollipop'] //inventory
  );

const street = new Room(
  [],
  [field],
  [sign]
);


// ==============================================================        CHARACTERS         =======================================================================================
const player = new Characters (
  ['wallet', 'bottle of water', 'parchment'],
  ['street', 'field', 'pathway', 'brick house', 'forest']
  );

//================================================================        STATE MACHINE      ===================================================================================
//We need a State Machine to represent the different rooms and how they are connected
// the keys (left) are the different locations, the values (right) represent the possible transictions for each room
const locationsYouCanGo = {
 'street' : ['field'],
 'field': ['pathway', 'brick house'],
 'brick house': ['field'],
 'pathway': ['forest'],
 'forest': ['street']
};


// const firstDoorStates = {
//   open: 'closed',
//   closed: 'open'
// };
// let doorOpen = false;
// ==========================================================        LOOKUP TABLES      ==================================================================================================

const commandLookup = {
  inventory: [ 'i', 'inventory'],
  use: ['use'],
  pickup: ['pick up'],
  help: ['help'],
  drop: ['drop'],
  move: ['move'],
  read: ['read'],
  open: ['open'],
  close: ['close']
};



 // ==============================================================       FUNCTIONS    ==============================================================================================
function useItem(Item) {
  console.log(`You use the ${Item}`);
}

function pickItem(Item) {
  console.log(`You pick the ${Item}`);
}

// function openAndCloseDoors(door) {
//   validOptions = door[DoorCurrState];

//   if (validTransitions.includes(newDoorState)) {
//     currentState = newState;
//     console.log(`You moved to the ${currentState}`);
//   }
//   else {
//     throw("Invalid state transition attempted - from " 
//          + currentState + " to " + newState)
//   }
// }


function transition(newRoom) {
  const validTransitions = locationsYouCanGo[currentPlayerLocation];

// first, check for invalid transition
  if (!validTransitions.includes(newRoom)) {
    console.log("We cant go this way, lets try somewhere else");
  } else {
    console.log(`You walk to the ${newRoom}`);
    currentRoom = newRoom;
  }
}

function getInventory(item) {
  let stringInventory = item.inventory.toString(', ');
  console.log(`In the ${item} there is: ${stringInventory} `);
}


// function openItem











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
  let answer = await ask(`What would you like to do?\n`);  //The player's answer will be stored in the variable answer
  let inputArray = answer.split(' ');
  let command = inputArray[0];
  let thing = inputArray[1];

  if(commandLookup.move.includes(command)) {
    transition(thing)
  } else if (commandLookup.inventory.includes(command)) {
    getInventory(thing)

  } else if (commandLookup.use.includes(command)) {
    useItem(thing);

  } else if (commandLookup.pickup.includes(command)) {
    pickItem(thing);

  } else if(commandLookup.help.includes(command)) {
    console.log('put function here for help inventory')

  } else if(commandLookup.drop.includes(command)) {
    console.log('put function here for drop inventory')
  }
  else if(commandLookup.read.includes(command)) {
    if (thing.includes('sign')) {
        console.log(sign.read());
    } 
    else if (thing.includes('parchment')) {
      console.log(parchment.read);
    }
   
  }

}   

 
process.exit();

};


 



 
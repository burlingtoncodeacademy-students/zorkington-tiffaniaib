const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

// ------------------------ALL THE CLASSES BELOW------------
// This are the templates that we will be using to create the different elements of the story
class Items {
    constructor (description, initialState, newState) {
        this.description = description
        this.initialState = initialState
        this.newState = newState
    }
}

class Room {
    constructor(name, description, connection, inventory) {
        this.name = name
        this.description = description
        this.connection = connection
        this.inventory = inventory
    }
}

class Characters {
  constructor (name, inventory, status) {
    this.name = name
    this.inventory = inventory
    this.status = status
  }
}

// ------------------------------------------------------------------------------------------------------------------------

//We need a State Machine to represent the different rooms and how they are connected
// the keys (left) are the different locations, the values (right) represent the possible transictions for each room

// STATE MACHINE
let locationsYouCanGo = {
   'street' : ['field'],
   'field': ['pathway", "brick house'],
   'pathway': ['forest']
}

async function start() {

    let currentPlayerLocation = 'street';

    // ----------THIS FUNCTION WILL BE VERY HELPFUL 
    function checkTheAnswer (answer) {
      
        let answerCheck =  answer.includes(wordsNeeded);
      
      }

    //   -----------------------------------------
  const welcomeMessage = `182 Main St.
  You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign that says: LOOK CLOSER .`;

// Instead of a question the player here will have the previous text that will direct them to an answer;
//  if insert the right words, something will be selected from the object and a change will be made

// The player's answer will be stored in the variable answer
  let answer = await ask(welcomeMessage);

// We check the answer 
let wordsNeeded = ['look closer'];
checkTheAnswer(answer);

// if it's true..

if (answerCheck = true) {
    console.log(`You looked closer but it looks like the sign as changed. Instead of the previous text there is a much longer one that says: `)
}


  

//   const speakingVoice1 = ``
  
  process.exit();
}

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

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

// ------------------------REST OF THE ELEMENTS  BELOW------------
const doorAtBeginning = {
  closed: `This door is closed. I bet you know the password, otherwise you wouldn't be here, right?`,
  open: 'I knew you were the one! The door is now open'
 }

const street = new Room(
  [],
  ['field'],
  []
);

// ------------------------------------------------------------------------------------------------------------------------

//We need a State Machine to represent the different rooms and how they are connected
// the keys (left) are the different locations, the values (right) represent the possible transictions for each room

// STATE MACHINE
const locationsYouCanGo = {
 'street' : ['field'],
 'field': ['pathway', 'brick house'],
 'pathway': ['forest']
};


async function start() {

  let currentPlayerLocation = 'street';


// Instead of a question the player here will have this text that will direct them to an answer (ex. there is ... to read -> read ...);
//  if insert the right words, something will be selected from the object and a change will be made
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign that says: LOOK CLOSER\n`;

  let answer = await ask(welcomeMessage);  //The player's answer will be stored in the variable answer


// We check the answer 

//If the player inserts these words tryng to force the door open
 if ((answer.includes('open')) && (answer.includes('door'))) {
    console.log(doorAtBeginning.closed);
};

// Otherwise, if the p inserts the right commands
if (answer.includes('look closer')) {
    console.log(`Mmm...weird`);
}

else {
    console.log(`...`);
    answer = await ask ('Try again!\n');
    
    while (answer !== 'look closer') {
    answer = await ask (`${answer} doesn't ring any bell. Try again!\n`);
    }
};
  
console.log(`
You went closer but it looks like the sign has changed. Now the text says:\n
'If 2 equals 3,
3 equals 5,
and 25 equals 11.
What does 17 equal to?'.
If the right answer you will provide, you will start a jurney. But without a guide. 
You have only 3 guesses. Good luck!`);


// First create a variable to store the total of tries that the player does because we gave a max of 3
let totalGuesses = 2;


const guessPass = `
What do you think is the number?\n`
  answer = await ask(guessPass);

    if (answer == 9) {
       console.log(doorAtBeginning.open);
    } 
    
 
    else {
      while (totalGuesses <= 3) {
        totalGuesses++
        console.log(`${answer} is the wrong answer.`)
        answer = await ask ("Try again\n")
        };
    
    

    console.log(`AAH wrog number!\nIt's sad to see you leaving so soon.\nGAME OVER!`)
    process.exit(); 
  }

  const steppingInside = `
After all the mistery you can finally see what's behind the door.
You take a deep breath, but when you are about to put your hand on the door knob,
you notice that the sign on the door has changed. Again.
This time it is says: "Check your bag for a little message".
`
  answer = await ask(steppingInside);

  if ((answer.includes('check')) && (answer.includes('bag'))) {
     console.log(`
     You move your hand around and touch your wallet, then your bottle of water, then something unrecognizable.
     You pull it out: it's a parchment!`)
  } 
  else {
      console.log(`I don't understand ${answer}`);
      answer = await ask ('Try again\n');
      
      while ((answer.includes !== 'check') && (answer.includes !== 'bag')) {
      answer = await ask (`I don't understand ${answer}. Try again!\n`);
      }
  }; 
   

  process.exit();

};


 



 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

// ------------------------REST OF THE ELEMENTS  BELOW------------
 const doorAtBeginning = {
  closed: "This door is closed. I bet you know the password, otherwise you wouldn't be here, right?",
  open: "I knew you were the one! The door is now open"
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
  let validInputs = ['look closer'];

  // ----------THIS FUNCTION WILL BE VERY HELPFUL 
  function checkTheAnswer (answer) { 
      return answer.includes(validInputs);
      let answerCheck =  answer.includes(validInputs);
    }

  //   -----------------------------------------

// Instead of a question the player here will have this text that will direct them to an answer (ex. there is ... to read -> read ...);
//  if insert the right words, something will be selected from the object and a change will be made
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign that says: LOOK CLOSER\n`;
// The player's answer will be stored in the variable answer
  let answer = await ask(welcomeMessage);


// We check the answer 
// if it's true..

if (checkTheAnswer(answer)) {

  console.log(`Mmm...weird`);
}

else {
    console.log(`I'm sorry, I don't understand ${answer}.`);
    differentAnswer = await ask ("Try again\n");
    
    while (checkTheAnswer(differentAnswer) === false) {
      differentAnswer = await ask (`Try again\n`);
    }
};
  
console.log(`
You went closer but it looks like the sign has changed. Instead of the previous text there is a much longer one.
"If 2 equals 3,
3 equals 5,
and 25 equals 11.
What does 17 equal to?
If the right answer you will provide, you will start a jurney. But without a guide. 
You have only 3 guesses. Good luck!`);




const guessPass = `
What do you think is the number?\n`
  answer = await ask(guessPass);

  
  if (answer != 9) {

    // First create a variable to store the total of tries that the player does because we gave a max of 3
    let totalGuesses = 1;
    
    while (totalGuesses < 3) {
    
    totalGuesses++
    console.log(`${answer} is the wrong answer.`)
    answer = await ask ("Try again\n")
    }

    // after the 3rd try the game ends
    console.log(`AAH wrog number!\nIt's sad to see you leaving so soon.\nGAME OVER!`)
    process.exit();
  }
  


  else {console.log(doorAtBeginning.open);} 

  process.exit();

};


 



 
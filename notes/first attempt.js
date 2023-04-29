async function start() {

 
    console.log(`182 Main St.
    You are standing on Main Street between Church and South Winooski.
    There is a door here. A keypad sits on the handle.
    On the door is a handwritten sign that says: LOOK CLOSER\n`);

    
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
   
  while (answer != 9) {
    if (answer == 9) {
       console.log(doorAtBeginning.open);
    } 
    
    else if(totalGuesses > 3) {
    console.log(`AAH wrog number!\nIt's sad to see you leaving so soon.\nGAME OVER!`)
    process.exit(); 
    }

    else {
      
        totalGuesses++
        console.log(`${answer} is the wrong answer.`)
        answer = await ask ("Try again\n")
        };  
  }

  const steppingInside = `
After all the mistery you can finally see what's behind the door.
You take a deep breath, but when you are about to put your hand on the door knob,
you notice that the sign on the door has changed. Again.
This time it is says: "Check your bag for a little message".
`
  answer = await ask(steppingInside);

  if ((answer.includes('check')) && (answer.includes('bag'))) {

// we create this const; after it will be used as an argument for the AWAIT ASK, to which the p will have to answer 'read parchment'

console.log(`You move your hand around and touch your wallet, then your bottle of water, then something unrecognizable.`);
  } else {
    console.log(`I don't understand ${answer}`);
    answer = await ask ('Try again\n');
      
      while ((!answer.includes('check')) && (!answer.includes('bag'))) {
      answer = await ask (`I don't understand ${answer}. Try again!\n`);
      }
  }; 

const readParchment = `You pull it out: it's a parchment!\n`;

 answer = await ask(readParchment);

if ((answer.includes('read')) && (answer.includes('parchment'))) {
  console.log(read(parchment));
} else {
  console.log(`No no no`);
  answer = await ask ("Think about it, what do you need to do with this parchment?\n");
  
    while (answer !== 'read parchment') {
    answer = await ask (`Nope. Try again!\n`);
    }

}
 
   
const moveToOpenDoor = `
If you were confused before, now you are feeling completely lost.
But one thing is sure: you want to unveil the mystery.
You put the parchment back in the backpack and proceed to open the door
 `

 answer = await ask(moveToOpenDoor);

 if (answer.includes('open door')) {
  console.log(field.description);
 }
 else {
  console.log(`I don't understand ${answer}`);
  answer = await ask ('Try again\n');
  
   while (answer.includes !== 'open door') {
   answer = await ask (`I don't understand ${answer}. Try again!\n`);
   }
}; 

 
  process.exit();

};


 



 
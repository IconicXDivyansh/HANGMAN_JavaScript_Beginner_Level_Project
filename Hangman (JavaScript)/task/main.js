let input = require("sync-input");

// All global variables


let alreadyCorrect = [];

let allEntries = [];

let attempts = 8;
let noOfWins = 0;
let noOfLoss = 0;


//  All function Definition



function playGame() {
    let words = ["python", "java", "swift", "javascript"];

    let correctWord = words[Math.floor(Math.random() * words.length)];

    let testCorrectWord = correctWord.split("");
    let hint = "-".repeat(correctWord.length);
    console.log(`\n\n${hint}`);

    while (attempts) {

        takeInputFromUser();

        if (alreadyCorrect.length === testCorrectWord.length) {
            // console.log(hint);
            console.log(`You guessed the word ${hint}!`);
            console.log("You survived!");
            noOfWins++;
            break;
        }
        if(attempts !== 0){
            console.log(hint);
        }
        // console.log();
    }

    if (alreadyCorrect.length !== testCorrectWord.length) {
        console.log();
        console.log("You lost!");
        noOfLoss++;
    }
    // clearing for new game
    alreadyCorrect = [];
    allEntries = [];
    attempts = 8;


    // function definition used in playGame()
    function takeInputFromUser() {
        hint = hint.split("");
        let usr_Input = input("Input a letter:");
        let input_Check = true;
        // User input checks ->
        //Case 1 - Single letter condition
        if(usr_Input.split("").length !== 1){
            console.log("Please, input a single letter.")
            input_Check = false;
        }
        //Case 2
        const regex = /[^a-zA-Z]/;
        if(usr_Input.toLowerCase() !== usr_Input || usr_Input === "" || regex.test(usr_Input)){
            console.log("Please, enter a lowercase letter from the English alphabet.");
            input_Check = false;
        }

        else if(input_Check === true){

            if (testCorrectWord.includes(usr_Input)) {
                // Case 2 - user enters the correct word second time
                if (alreadyCorrect.includes(usr_Input)) {
                    console.log("You've already guessed this letter.");
                }


                else {
                    for (let i = 0; i < testCorrectWord.length; i++) {
                        if (usr_Input === testCorrectWord[i]) {
                            hint[i] = usr_Input;
                            alreadyCorrect.push(usr_Input);

                        }
                    }
                }

            }
            else {
                if(allEntries.includes(usr_Input)){
                    console.log("You've already guessed this letter.");
                }
                else{
                    console.log("That letter doesn't appear in the word.");
                    attempts--;
                }

            }


            allEntries.push(usr_Input);
        }

        hint = hint.join("");
        console.log();

    }

}



function printResult(){
    console.log(`You won: ${noOfWins} times.`);
    console.log(`You lost: ${noOfLoss} times.`);
}

function displayMenu(){
    console.log("H A N G M A N");
    let flag = true;
    while(flag){
        let usrChoice = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`);
        switch(usrChoice){
            case "play":
                playGame();
                break;
            case "results":
                printResult();
                break;
            case "exit":
                flag = false;
        }
    }


}

displayMenu();
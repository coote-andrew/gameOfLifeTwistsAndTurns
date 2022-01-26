let gameboard = document.getElementById("gameboard");
let InputListener = false;

let basicsettings = '{"salary": 5000, "money": 5000, "family": "nil", "vehicle": "skateboard", "education": "nil", "house":"nil" }';
let basicGenericSettings = '{"currentTurn":0, "maxTurns":"10"}';
let player1cookie;
let player2cookie;
let player3cookie;
let player4cookie;
let player1;
let player2;
let player3;
let player4;
let genericStatusCookie;
let genericStatus;


for(let i=0; i<11; i++){
    let number = document.createElement('div');
    number.id = "number" + i;
    number.classList.add("numbers");
    
    gameboard.appendChild(number);
    let rotationValue = ((360/11)*i-90);
    let minimumValues = getComputedStyle(document.body).getPropertyValue('--distanceForNumbers');
    number.style.transform = "rotate("+rotationValue+"deg) translate(" + minimumValues + ")";
    textdiv = document.createElement('div');
    textdiv.innerText=i;
    textdiv.classList.add("innerText");
    textdiv.style.transform = "rotate("+ (rotationValue) *-1 + "deg)";
    number.appendChild(textdiv);
}


function spinTheDice(){
    let randomValue = Math.floor(Math.random()*11);
    console.log(randomValue);
    let speed = 0.2;
   
    for(let k = 0; k<11; k++){
    // number of numbers to spin around
        let actualNumberToAnimate = (k + randomValue)%11;
        clearSpecificDie(k);
        void document.getElementById('number' + actualNumberToAnimate).offsetWidth;
        document.getElementById('number'+ actualNumberToAnimate).style.animation= "blue " + speed + "s " + k * speed + "s linear backwards";
    }
    
    document.getElementById('number'+randomValue).style.animation="blue 0.5s linear forwards 5";
    return(randomValue);
}

function clearTheDice(){
    for(let i=0; i<11; i++){
        document.getElementById('number'+randomValue).style.animation="blue 0%";
    }
}

function clearSpecificDie(numberToClear){
    document.getElementById('number'+numberToClear).style.animation="blue 0%";
}

function writeTextToScreen(text){
    let screen = document.getElementById("screenText");
    screen.innerText = text;
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function appendTextToScreen(text, delay = 0){
    let screen = document.getElementById("screenText");
    sleep(delay).then(()=>{
        let currentText = screen.innerText;
        screen.innerText = currentText + text;
    });
    
}

function acceptText(status){
    let InputRow = document.getElementById("inputRow");
    let InputText = document.getElementById("screenInput");
    
    if(status==false){
        InputRow.classList.remove("activeText")
        InputRow.classList.add("inactiveText");
        InputText.innerText = "";
        InputListener = false;
    }
    if(status==true){
        InputRow.classList.remove("inactiveText")
        InputRow.classList.add("activeText");
        InputText.innerText = "";
        InputListener = true;
    }
}

function readInputText(){
    return document.getElementById("screenInput").innerText;
}

function writeInputText(e){
    if (InputListener == true) {

        let character = e.key;
        let currentInputText = readInputText();
        if(character == "Enter"){
            console.log("enter");
        } else if (character =="Delete" || character=="Backspace"){
            document.getElementById("screenInput").innerText = currentInputText.substring(0, currentInputText.length -1);
        } else if (/^[a-zA-Z0-9]$/.test(character)){
            document.getElementById("screenInput").innerText = currentInputText + character;
        }

    }
   
}

function updateCurrentStatusFromCookie(){
    let currentCookie = document.cookie;
    let players = currentCookie.split(";");
    console.log(players[1].split("=")[1]);
    genericStatus = JSON.parse(players[0].split("=")[1]);
    player1 = JSON.parse(players[1].split("=")[1]);
    player2 = JSON.parse(players[2].split("=")[1]);
    player3 = JSON.parse(players[3].split("=")[1]);
    player4 = JSON.parse(players[4].split("=")[1]);
}

function setCurrentStatusToCookie(){
    // console.log( "player1cookie = " + JSON.stringify(player1));
    document.cookie = "genericStatusCookie = "+ JSON.stringify(genericStatus);
    document.cookie = "player1cookie = " + JSON.stringify(player1);
    document.cookie = "player2cookie = " + JSON.stringify(player2);
    document.cookie = "player3cookie = " + JSON.stringify(player3);
    document.cookie = "player4cookie = " + JSON.stringify(player4);
    console.log(document.cookie);
}

function setUpPlayersAndCookies(playerNumber){
    genericStatus = JSON.parse(basicGenericSettings);
    if(playerNumber >=2){
        player1 = JSON.parse(basicsettings);
        player2 = JSON.parse(basicsettings);
        player3 = JSON.parse('{"playing":"false"}');
        player4 = JSON.parse('{"playing":"false"}');
    }
    if (playerNumber>=3){
        player3 = JSON.parse(basicsettings);
        player4 = JSON.parse('{"playing":"false"}');
    }
    if (playerNumber>=4){
        player4 = JSON.parse(basicsettings);
    }
    // console.log(genericStatus);
    // console.log(player1);
    // console.log(player2);
    // console.log(player3);
    // console.log(player4);
    setCurrentStatusToCookie();
    // console.log(document.cookie);
}

function setUpGame(){
    writeTextToScreen("hello... setting up");
    appendTextToScreen("\ntest");
    appendTextToScreen("\nanother test", 1000);
    acceptText(true);
    // DONT FORGET TO DELETE THIS LINE-----------------------
    setUpPlayersAndCookies(3);
    // updateCurrentStatusFromCookie();
    player3.family = "married";
    setCurrentStatusToCookie();
    updateCreditCards();

}

function updateCreditCards(){
    for(let l=1; l<5;l++){
        let currentPlayerValues;
        if(l==1){
            currentPlayerValues = player1;
        } else if(l==2){
            currentPlayerValues = player2;
        } else if(l==3){
            currentPlayerValues = player3;
        } else if(l==4){
            currentPlayerValues = player4;
        }
        let playerToEdit = document.getElementById("player"+l);
        for(let m=0; m<playerToEdit.children.length; m++){
            if(playerToEdit.children[m].className=="dollars"){
                playerToEdit.children[m].innerText = currentPlayerValues.money;
            }
        }
    }
}



setUpGame();


let spinButton = document.getElementById("spinButton");
spinButton.addEventListener('click', spinTheDice);


let body = document.body;
body.addEventListener('keydown', writeInputText);
const socket = io();

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('CorrectAnswer', CorrectAnswer);
socket.on('PlayerAnswer', playerAnswer);
socket.on('Player1Correct', addToPlayer1Score);
socket.on('Player2Correct', addToPlayer2Score);
socket.on('Player3Correct', addToPlayer3Score);
socket.on('Player4Correct', addToPlayer4Score);
socket.on('ShowScreen', ShowScreen);
socket.on('assignPlayerName', assignName);
socket.on('assignPlayerOne', assignPlayer1);
socket.on('assignPlayerTwo', assignPlayer2);
socket.on('assignPlayerThree', assignPlayer3);
socket.on('assignPlayerFour', assignPlayer4);
let canvas, ctx;
let playerNumber;
let gameActive = false;

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const playerScreen = document.getElementById('playerScreen');
const waitscreen = document.getElementById('waitscreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameNameInput = document.getElementById('gameNameInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const gameCodeDisplay2 = document.getElementById('gameCodeDisplay2');
const gamePlayer1Display = document.getElementById('gamePlayer1Display');
const gamePlayer2Display = document.getElementById('gamePlayer2Display');
const gamePlayer3Display = document.getElementById('gamePlayer3Display');
const gamePlayer4Display = document.getElementById('gamePlayer4Display');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const playeranswer1Btn = document.getElementById('playeranswer1');
const playeranswer2Btn = document.getElementById('playeranswer2');
const playeranswer3Btn = document.getElementById('playeranswer3');
const playeranswer4Btn = document.getElementById('playeranswer4');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const score3 = document.getElementById('score3');
const score4 = document.getElementById('score4');
const question = document.getElementById('question');
const count = document.getElementById('counter');
const count2 = document.getElementById('counter2');
const startTime = 600;
let playerNumber1 = -1;
let playerNumber2 = -1;
let playerNumber3 = -1;
let playerNumber4 = -1;
let time = startTime;
let answertime = 5;
let scorep1 = 0;
let scorep2 = 0;
let scorep3 = 0;
let scorep4 = 0;
let ans = "";
let pos = -1;
let questionCount = 0;
let gameState = {};
let globala;
var audio = new Audio('IGORS THEME.mp3');
let code = ""
let playercode =""
let CorrectAnswerPos = 0 
let PlayerName = ""
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
playeranswer1Btn.addEventListener('click', answered1);
playeranswer2Btn.addEventListener('click', answered2);
playeranswer3Btn.addEventListener('click', answered3);
playeranswer4Btn.addEventListener('click', answered4);
function newGame() {
  socket.emit('newGame');
  init();

}
function assignName(playerName, PlayerCode){
  console.log("here") 
  if (playerNumber == 1){
    playerDisplayCode = gameCodeDisplay.innerText;
    console.log(gamePlayer1Display.innerText);
    if (gamePlayer1Display.innerText == 'Player 1 :'){
       const newname = playerName + ' : ';
       gamePlayer1Display.innerText = newname; 
       playerNumber1 = PlayerCode;
       socket.emit('PlayerOneCode', PlayerCode, playerDisplayCode);
    } else if (gamePlayer2Display.innerText == 'Player 2 :'){
          const newname = playerName + ' : ';
          gamePlayer2Display.innerText = newname; 
          playerNumber2 = PlayerCode;
          socket.emit('PlayerTwoCode', PlayerCode, playerDisplayCode);
    } else if (gamePlayer3Display.innerText == 'Player 3 :'){
          const newname = playerName + ' : ';
          gamePlayer3Display.innerText = newname;
          playerNumber3 = PlayerCode;
          socket.emit('PlayerThreeCode', PlayerCode, playerDisplayCode);
    } else if (gamePlayer3Display.innerText == 'Player 4 :'){
          const newname = playerName + ' : ';
          gamePlayer4Display.innerText = newname; 
          playerNumber4 = PlayerCode;
          socket.emit('PlayerFourCode', PlayerCode, playerDisplayCode);
    }
 }
}
function answered1() {
  playerDisplayCode = gameCodeDisplay2.innerText;
  console.log(playerNumber1)
  if (playerNumber == playerNumber1){
    socket.emit('answered', playerDisplayCode, '0', playerNumber1);
    waitscreen.style.display = "block";
    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    playerScreen.style.display = "none";
 }
 if (playerNumber == playerNumber2){
  socket.emit('answered', playerDisplayCode, '0', playerNumber2);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber3){
  socket.emit('answered', playerDisplayCode, '0', playerNumber3);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber4){
  socket.emit('answered', playerDisplayCode, '0', playerNumber4);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
}
function answered2(){
  playerDisplayCode = gameCodeDisplay2.innerText;
  console.log(playerNumber1)
  if (playerNumber == playerNumber1){
    socket.emit('answered', playerDisplayCode, '1', playerNumber1);
    waitscreen.style.display = "block";
    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    playerScreen.style.display = "none";
 }
 if (playerNumber == playerNumber2){
  socket.emit('answered', playerDisplayCode, '1', playerNumber2);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber3){
  socket.emit('answered', playerDisplayCode, '1', playerNumber3);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber4){
  socket.emit('answered', playerDisplayCode, '1', playerNumber4);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
}
function answered3(){
  playerDisplayCode = gameCodeDisplay2.innerText;
  console.log(playerNumber1)
  if (playerNumber == playerNumber1){
    socket.emit('answered', playerDisplayCode, '2', playerNumber1);
    waitscreen.style.display = "block";
    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    playerScreen.style.display = "none";
 }
 if (playerNumber == playerNumber2){
  socket.emit('answered', playerDisplayCode, '2', playerNumber2);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber3){
  socket.emit('answered', playerDisplayCode, '2', playerNumber3);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber4){
  socket.emit('answered', playerDisplayCode, '2', playerNumber4);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
}
function answered4(){
  playerDisplayCode = gameCodeDisplay2.innerText;
  console.log(playerNumber1)
  if (playerNumber == playerNumber1){
    socket.emit('answered', playerDisplayCode, '3', playerNumber1);
    waitscreen.style.display = "block";
    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    playerScreen.style.display = "none";
 }
 if (playerNumber == playerNumber2){
  socket.emit('answered', playerDisplayCode, '3', playerNumber2);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber3){
  socket.emit('answered', playerDisplayCode, '3', playerNumber3);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
if (playerNumber == playerNumber4){
  socket.emit('answered', playerDisplayCode, '3', playerNumber4);
  waitscreen.style.display = "block";
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
}
}

function joinGame() {
  const code = gameCodeInput.value;
  const PlayerName = gameNameInput.value;
  playername = gameNameInput.value; 
  socket.emit('joinGame', code, playername);
  playersinit();

}
function answer(ans, pos) {
  socket.emit('answer', code, ans, pos);
}

function init() {
  answer1.style.backgroundColor = '#337ab7';
  answer2.style.backgroundColor = '#ff7a00';
  answer3.style.backgroundColor = '#ff3e00';
  answer4.style.backgroundColor = '#ff00fc';
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  playerScreen.style.display = "none";
  waitscreen.style.display = "none";
  gameActive = true;
  time = 5;
  
}

function musicQuestion(){
  var musicArray = new Array(new Audio('IGORS THEME.mp3'), new Audio('The Mission.mp3'), new Audio('No Rome.mp3'), new Audio('TDCC.mp3'));
  var pos = Math.floor(Math.random() * musicArray.length);
  var randElement = musicArray[pos];
  var tylerArray = new Array("Igor", "Goblin", "Flower Boy", "Wolf");
  var BakarArray = new Array("FIFA 22", "FIFA 23", "FIFA 21", "FIFA 20");
  var NoRomeArray = new Array("Saint Laurent", "Gucci", "Louis Vuitton", "Chanel");
  var TwoArray = new Array("Two Door Cinema Club", "The Script", "Snow Patrol", "U2");
  var QuestionArray = new Array("This song is the album opener to which Tyler the Creater album?", "This song featured on which of the FIFA soundtracks?", "The Title of this Song by No Rome is named after which Luxury Fashion Brand?", "This Song is performed by which of one of the following Irish Bands?");
  var allArray = new Array(tylerArray, BakarArray, NoRomeArray, TwoArray);
  var pickedArray = allArray[pos];
  var pos2 = -1;
  ans = pickedArray[0];
  var randElement2 = pickedArray[Math.floor(Math.random() * pickedArray.length)];
  for (var i = 0; i <pickedArray.length; i++) {
    if (pickedArray[i] === randElement2) {
        if (pickedArray[i] == ans){
          pos2 = 0;
        }      
      pickedArray.splice(i, 1);
      
    }
  }
  var randElement3 = pickedArray[Math.floor(Math.random() * pickedArray.length)];
  for (var i = 0; i < pickedArray.length; i++) {
    if (pickedArray[i] === randElement3) {
      if (pickedArray[i] == ans){
        pos2 = 1;
      } 
      pickedArray.splice(i, 1);
    }
  }var randElement4 = pickedArray[Math.floor(Math.random() * pickedArray.length)];
  for (var i = 0; i < pickedArray.length; i++) {
    if (pickedArray[i] === randElement4) {
      if (pickedArray[i] == ans){
        pos2 = 2;
      }   
      pickedArray.splice(i, 1);
    }
  }
  var randElement5 = pickedArray[Math.floor(Math.random() * pickedArray.length)];
  for (var i = 0; i < pickedArray.length; i++) {
    if (pickedArray[i] === randElement5) {
      if (pickedArray[i] == ans){
        pos2 = 3;
      }   
      pickedArray.splice(i, 1);
    }
  }
  audio = randElement;
  audio.play();
  answer1.innerHTML = randElement2;
  answer2.innerHTML = randElement3; 
  answer3.innerHTML = randElement4;
  answer4.innerHTML = randElement5;
  question.innerText = QuestionArray[pos]; 
  answer(ans, pos2)
  time = 30;
}


function playersinit() {
  playeranswer1Btn.style.backgroundColor = '#337ab7';
  playeranswer2Btn.style.backgroundColor = '#ff7a00';
  playeranswer3Btn.style.backgroundColor = '#ff3e00';
  playeranswer4Btn.style.backgroundColor = '#ff00fc';
  initialScreen.style.display = "none";
  gameScreen.style.display = "none";
  playerScreen.style.display = 'block';
  waitscreen.style.display = "none";
  gameActive = true;
}

setInterval(updateTimer, 1000)
function updateTimer(){
  let seconds = time % 60
  count.innerHTML = seconds
  time--

  if (time <= 0 && playerNumber === 1){
    code = gameCodeDisplay.innerText;
    socket.emit('newScreen', code)
    score1.innerHTML = scorep1
    score2.innerHTML = scorep2
    score3.innerHTML = scorep3
    score4.innerHTML = scorep4
    let ansshown = "The Answer Was : " + ans  
    question.innerText = ansshown
    answertime--
    
    if(answertime <= 0 && playerNumber === 1){
      time = 30
      answertime = 5
      if(questionCount != 4){ 
        if (questionCount != 5){ 
          newQuestion()
          questionCount++
        } else {
          audio.pause();
          newQuestion()
          questionCount++
        }
      } else{
        musicQuestion()
        questionCount++
      }
      
      if(questionCount > 6){
        var playerArray = new Array(scorep1, scorep2, scorep3, scorep4);
        var highScore = 0;
        var highscorePos = -1;
        for (var i = 0; i < playerArray.length; i++) {
            if(playerArray[i] > highScore){
              highScore = playerArray[i];
              highscorePos = i;
            }
        }
        if (highscorePos == 0){
          alert(gamePlayer1Display.innerText + " Has won the Game");
          reset();
        } else if (highscorePos == 1){
            alert(gamePlayer2Display.innerText + " Has won the Game");
            reset();
        } else if (highscorePos == 2){
          alert(gamePlayer3Display.innerText + " Has won the Game");
          reset();
        } else if (highscorePos == 3){
          alert(gamePlaye4Display.innerText + " Has won the Game");
          reset();
        } 
    }
    }
  }
}


async function newQuestion(){
  const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple')
  const data = await response.json()
  let ans1 = data.results[0].correct_answer;
  let ans2 = data.results[0].incorrect_answers[0]; 
  let ans3 = data.results[0].incorrect_answers[1];
  let ans4 = data.results[0].incorrect_answers[2];
  var answerarray = new Array(ans1,ans2,ans3,ans4);
  var randElement = answerarray[Math.floor(Math.random() * answerarray.length)];
  for (var p = 0; p < data.results[0].question.length; p++) {
    if (data.results[0].question[p] === '&'){
      p = data.results[0].question.length;
      newQuestion()
    }
  }
  for (var i = 0; i < answerarray.length; i++) {
    if (answerarray[i] === randElement) {
        answerarray.splice(i, 1);
        if(randElement == ans1) {
          pos = 0
        }
    }
  }
  var randElement2 = answerarray[Math.floor(Math.random() * answerarray.length)];
  for (var l = 0; l < answerarray.length; l++) {
    if (answerarray[l] === randElement2) {
        answerarray.splice(l, 1);
        if(randElement2 == ans1) {
          pos = 1
        }
    }
  }
  var randElement3 = answerarray[Math.floor(Math.random() * answerarray.length)];
  for (var j = 0; j < answerarray.length; j++) {
    if (answerarray[j] === randElement3) {
        answerarray.splice(j, 1);
        if(randElement3 == ans1) {
          pos = 2
        }
    }
  }
  var randElement4 = answerarray[Math.floor(Math.random() * answerarray.length)];
  if(randElement4 == ans1) {
    pos = 3
  }
  var randanswerarray = new Array(randElement, randElement2, randElement3, randElement4);
  var correct = "";
  for (var a = 0; a < randanswerarray.length; a++) {
    if (ans1 === randanswerarray[a]) {
        ans = ans1;
        aoption = a;
    }
  }
  answer1.innerHTML = randElement;
  answer2.innerHTML = randElement2; 
  answer3.innerHTML = randElement3;
  answer4.innerHTML = randElement4;
  question.innerText = data.results[0].question; 
  time = 30;
  ans = ans1;
  answer(ans, pos)
}


function paintGame(state) {
  return;
}

function handleInit(number, roomName, PlayerName) {
  playerNumber = number;
  playercode = roomName;
  gameCodeDisplay2.innerText = playercode;
  socket.emit('assignName', roomName,  number, PlayerName);
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  paintGame(gameState);
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

//  if (data.winner === playerNumber) {
//    alert('You Win!');
//  } else {
//    alert('You Lose :(');
//  }
}

function handleGameCode(gameCode) {
  code = gameCode;
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
  reset();
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  reset();
  alert('This game is already in progress');
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
  playerScreen.style.display = "none";
  waitscreen.style.display = "none";
}
function HandleCorrectAnswer(){
  socket.emit('answer');
}

function CorrectAnswer(aoption){
  CorrectAnswerPos = aoption; 
}

function playerAnswer(answerreturn, playernum){
  room = gameCodeDisplay.innerText
  console.log(room)
  console.log(answerreturn);
  console.log(CorrectAnswerPos);
  if (playerNumber == 1){
    if(playernum == playerNumber1){
      if(answerreturn == CorrectAnswerPos){
        socket.emit('PlayerOneCorrect', room, playernum);
      }
    } else if(playernum == playerNumber2){
        if(answerreturn == CorrectAnswerPos){
          socket.emit('PlayerTwoCorrect', room, playernum);
      }
    } else if(playernum == playerNumber3){
        if(answerreturn == CorrectAnswerPos){
           socket.emit('PlayerThreeCorrect', room, playernum);
      }
    } else if(playernum == playerNumber3){
      if(answerreturn == CorrectAnswerPos){
         socket.emit('PlayerFourCorrect', room, playernum);
    }
  }
 }
}
function addToPlayer1Score(){
  scorep1 = scorep1 + 100;
  score1.innerHTML = scorep1;
}
function addToPlayer2Score(){
  scorep2 = scorep2 + 100;
  score2.innerHTML = scorep2;
}
function addToPlayer3Score(){
  scorep3 = scorep3 + 100;
  score3.innerHTML = scorep3;
}
function addToPlayer4Score(){
  scorep4 = scorep4 + 100;
  score4.innerHTML = scorep4;
}
function ShowScreen(playercode2){
  if(playerNumber != 1){
    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    playerScreen.style.display = "block";
    waitscreen.style.display = "none";
    gameCodeDisplay2.innerText = playercode2;
  }
}

function assignPlayer1(playernum){
    playerNumber1 = playernum;
}

function assignPlayer2(playernum){
  playerNumber2 = playernum;
}
function assignPlayer3(playernum){
  playerNumber3 = playernum;
}
function assignPlayer4(playernum){
  playerNumber4 = playernum;
}


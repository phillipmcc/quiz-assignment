const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})



const { initGame, gameLoop } = require('./game');
const { FRAME_RATE } = require('./constants');
const { makeid } = require('./utils');

const state = {};
const clientRooms = {};

server.listen(3000, () => {
  console.log("Server running...");
});

io.on('connection', client => {


  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('answer', HandleRoundAnswer);
  client.on('answered', HandlePlayerAnswer);
  client.on('PlayerOneCorrect', HandleAddScore1);
  client.on('PlayerTwoCorrect', HandleAddScore2);
  client.on('PlayerThreeCorrect', HandleAddScore3);
  client.on('PlayerFourCorrect', HandleAddScore4);
  client.on('newScreen', HandleNewScreen);
  client.on('assignName', HandleName);
  client.on('PlayerOneCode', PlayerOneCode);
  client.on('PlayerTwoCode', PlayerTwoCode);
  client.on('PlayerThreeCode', PlayerThreeCode);
  client.on('PlayerFourCode', PlayerFourCode);
  function PlayerOneCode(playercode, roomname){
    io.sockets.in(roomname)
    .emit('assignPlayerOne', playercode); 
  }
  function PlayerTwoCode(playercode, roomname){
    io.sockets.in(roomname)
    .emit('assignPlayerTwo', playercode); 
  }
  function PlayerThreeCode(playercode, roomname){
    io.sockets.in(roomname)
    .emit('assignPlayerThree', playercode); 
  }
  function PlayerFourCode(playercode, roomname){
    io.sockets.in(roomname)
    .emit('assignPlayerFour', playercode); 
  }
  function HandleName(roomname, number, playerName){
    console.log(number);
    io.sockets.in(roomname)
    .emit('assignPlayerName', playerName, number);  
  }
  function HandleNewScreen(roomname){
    io.sockets.in(roomname)
    .emit('ShowScreen', roomname);
  }
  function HandleAddScore1(roomName, playernum){
    //console.log(roomName);
      io.sockets.in(roomName)
      .emit('Player1Correct');
  }
  function HandleAddScore2(roomName, playernum){ 
      io.sockets.in(roomName)
      .emit('Player2Correct');
  }
  function HandleAddScore3(roomName, playernum){ 
    io.sockets.in(roomName)
    .emit('Player3Correct');
  }
  function HandleAddScore4(roomName, playernum){ 
    io.sockets.in(roomName)
    .emit('Player4Correct');
  }
  function HandlePlayerAnswer(roomName, answer, playerCode) {
    //console.log(answer);
    //console.log(roomName);
    io.sockets.in(roomName)
    .emit('PlayerAnswer', answer, playerCode, roomName);
  }  
  function HandleRoundAnswer(roomName, answer, pos) {
    io.sockets.in(roomName)
    .emit('CorrectAnswer', JSON.stringify(pos));
  }
  function handleJoinGame(roomName, playerName) {
    client.userID = Math.floor(Math.random() * (100000 - 2 + 1) + 2)
    let numClients = 0; 
    if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }
    console.log(client.userID);
    clientRooms[client.id] = roomName;
    client.join(roomName);

    client.emit('init', client.userID, roomName, playerName);
    
    startGameInterval(roomName);
  }

  function handleNewGame() {
    let roomName = makeid(5);
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame();

    client.join(roomName);
    client.number = 1;
    client.emit('init', 1);
  }

  
  
});

function startGameInterval(roomName) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state[roomName]);
    
    if (!winner) {
      emitGameState(roomName, state[roomName])
    } else {
      emitGameOver(roomName, winner);
      state[roomName] = null;
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room)
    .emit('gameState', JSON.stringify(gameState));
}

function emitGameOver(room, winner) {
  io.sockets.in(room)
    .emit('gameOver', JSON.stringify({ winner }));
}

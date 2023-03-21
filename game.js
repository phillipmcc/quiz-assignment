module.exports = {
  initGame,
  gameLoop,
}

function initGame() {
  const state = GameState()
  return state;
}
function GameState(){
return { 
  players: [{
    score: 0,
    Option: 0,
  }, {
    score: 0,
    Option: 0,
  }, {
    score: 0,
    Option: 0,
  }, {
    score: 0,
    Option: 0,
  }],
  correctAnswer: "",
  correctPos: 6,
  Questioncount: 0,
};
}

function gameLoop(state) {
  if (!state) {
    return;
  }


  return false;
}




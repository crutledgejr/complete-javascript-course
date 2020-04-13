/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const defaultHighScore = 25;
let activePlayer, gamePlaying, highScore, prevRoll, roundScore, scores;
initGame();

document.querySelector('.btn-roll').addEventListener('click', () => {
  let isDoubleSix;
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update round score if the rolled score is not "1"
    if (dice !== 1) {
      if (dice === 6) {
        if (prevRoll === 6) {
          isDoubleSix = true;
          console.log('dice=' + dice + '; prev=' + prevRoll);
          scores[activePlayer] = 0;
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer].toString();
          alert('Player #' + (activePlayer + 1) + ' has rolled double 6! Total score is lost!');
          nextPlayer();
        }
      }
      if (!isDoubleSix) {
        roundScore += dice;
        prevRoll = dice;
        console.log('set current and previous dice roll');
        document.querySelector('#current-' + activePlayer).textContent = roundScore.toString();
      }
    } else {
      nextPlayer();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // save round score to player's score
    scores[activePlayer] += roundScore;
    // update ui with current player's score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer].toString();
    // clear current player's round score
    document.querySelector('#current-' + activePlayer).textContent = '0';
    // check if player won the game;
    // if so, end game (disable all user interface components)
    // if not, switch to other player
    if (scores[activePlayer] >= (!!highScore ? highScore : defaultHighScore)) {
      gamePlaying = false;
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
    } else {
      nextPlayer();
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', initGame);

function nextPlayer() {
  roundScore = 0;
  prevRoll = 0;
  document.getElementById('current-' + activePlayer).textContent = '0';
  //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  activePlayer = (activePlayer === 0) ? 1 : 0;
  //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

function initGame() {
  gamePlaying = true;
  highScore = document.getElementById('score').value;
  console.log('Your high score for this game: ' + (!!highScore ? highScore : defaultHighScore));
  // remove winner class if it exists
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  // clear all scores (player scores and round scores)
    // update ui with 0'd scores
    // set player to player #1
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  prevRoll = 0;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
}
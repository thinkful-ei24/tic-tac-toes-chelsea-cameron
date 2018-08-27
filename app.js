/* global $*/
'use strict';

// Can immediately click cells to alternate between Xs and Os on each click
// Cannot change cell if it has a value inside of it
// I can see when a winning line has been created
//  - no other moves can be put on the board
// I can click new game at any time to reset the board

const state = {
  cells: Array(9).fill(null),
  clear: function() {
    this.cells = Array(9).fill(null);
  },
  currentMarker: 'X',
  endOfGame: false
};

// State modification functions

//clear state back to empty
function clearState() {
  state.clear();
}

// switch current marker O to X etc.
function switchCurrentMarker() {
  switch (state.currentMarker) {
    case 'X':
      state.currentMarker = 'O';
      break;
    case 'O':
      state.currentMarker = 'X';
      break;
  }
}

// mark cell with current marker
function markCell(index) {
  if (state.cells[index] === null) {
    state.cells[index] = state.currentMarker;
    switchCurrentMarker();
  }
}

//determine winner
function determineWinner() {
  const winnerPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];

  for (let i = 0; i < winnerPatterns.length; i++) {
    const winPattern = winnerPatterns[i]; 
    if(!state.cells[winPattern[0]]) continue; 
    if (
      state.cells[winPattern[0]] === state.cells[winPattern[1]] &&
      state.cells[winPattern[1]] === state.cells[winPattern[2]] 
    ) {
      $(`#${winPattern[0]}`).addClass('win');
      $(`#${winPattern[1]}`).addClass('win');
      $(`#${winPattern[2]}`).addClass('win');
      // disable click on cells after we have a winner
      state.endOfGame = true;
    }
  }
}

// Render functions

function render() {

  let htmlArr = [];
  // for loop through state cells length and generate html
  for (let i = 0; i < state.cells.length; i++) {
    let html = '';
    if (i % 3 === 0) {
      html += `
      <div class="row">
        `;
    } 
    html += `
    <div class="cell" id="${i}">
    <p>${state.cells[i] ? state.cells[i] : '&nbsp;'}</p>
    </div>
    `;
    if (i % 3 === 2) {
      html += `
      </div>
      `;
    }
    htmlArr.push(html);
  }
  // push html to DOM .board
  $('.board').html(htmlArr.join(''));
  // run determine winner function to see if anyone is winning
  determineWinner();

  //
  if (state.endOfGame) {
    $('.board').off('click', '.cell');
  } else {
    handleCellClick();
  }
}

// Event Listeners

function handleStartNewGame() {
  $('#new-game').click(() => {
    clearState();
    state.endOfGame = false;
    render();
  });
}

function handleCellClick() {
  $('.board').on('click', '.cell', function(event) {
    markCell(this.id);
    render();
  });
}

function main() {
  render();
  handleCellClick();
  handleStartNewGame();
}

$(main);

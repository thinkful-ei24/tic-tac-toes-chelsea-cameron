/* global $*/
'use strict';

// Can immediately click cells to alternate between Xs and Os on each click
// Cannot change cell if it has a value inside of it
// I can see when a winning line has been created
//  - no other moves can be put on the board
// I can click new game at any time to reset the board

const state = {
  cells: ['', '', '', '', '', '', '', '', ''],
  clear: function() {
    this.cells = ['', '', '', '', '', '', '', '', ''];
  }
};

// State modification functions

// Render functions

function render() {}

// Event Listeners

function handleStartNewGame() {
  $('#new-game').click(() => state.clear());
}

function handleCellClick() {}

function main() {
  handleCellClick();
  handleStartNewGame();
}

$(main);

/* global $*/
'use strict';

// Can immediately click cells to alternate between Xs and Os on each click
// Cannot change cell if it has a value inside of it
// I can see when a winning line has been created
//  - no other moves can be put on the board
// I can click new game at any time to reset the board

const state = {
  cells: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  clear: function() {
    this.cells = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    console.log('it works');
  },
  currentMarker: 'X'
};

// State modification functions
function clearState(){
  state.clear();
}

function switchCurrentMarker(){
  switch(state.currentMarker){
  case 'X':
    state.currentMarker = 'O';
    break;
  case 'O':
    state.currentMarker = 'X';
    break;  
  }
}

function markCell(index){
  state.cells[index] = state.currentMarker;
  switchCurrentMarker();
}
// Render functions

function render() {
  let htmlArr = [];
  for (let i=0; i<state.cells.length; i++){
    let html = `
    <div class="cell" id="${i}">
    <p>${state.cells[i]}</p>
    </div>
    `;
    htmlArr.push(html);
  } $('.board').html(htmlArr.join(''));
}

// Event Listeners

function handleStartNewGame() {
  $('#new-game').click(() => clearState());
  render();
}

function handleCellClick() {
  $('.board').on('click', '.cell', function(event){
    markCell(this.id);
    console.log(this.id);
    render();
  });
}

function main() {
  render();
  handleCellClick();
  handleStartNewGame();
}

$(main);

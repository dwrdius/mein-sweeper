"use strict";
const SIZE = 20;
let table;
let game;

class Game{
    constructor(size){
        this.board = [];
        for(let i = 0; i< size; i++){
            this.board[i] = [];
            for(let j = 0; j< size; j++){
                this.board[i].push(0);
            }
        }
    }
}

class Coord{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    static add(coord1, coord2){
        return new Coord(coord1.x+coord2.x, coord1.y, coord2.y);
    }
    static distance(coord1, coord2){
        let dx = coord1.x - coord2.x;
        let dy = coord1.y - coord2.y;
        return Math.abs(dx) + Math.abs(dy);
    }
}

function initTable(){
    table = document.createElement("table");
    document.body.append(table);
    for(let i = 0; i< SIZE; i++){
        let row = document.createElement("tr");
        table.append(row);
        for(let j = 0; j< SIZE; j++){
            let cell = document.createElement("td");
            row.append(cell);
        }
    }

}

function getCell(coord){
    return table.children[coord.x].children[coord.y];
}

function drawBombs(){
    for(let i = 0; i< SIZE; i++){
        for(let j = 0; j< SIZE; j++){
            let cell = getCell(new Coord(i,j));
            if(game.board[i][j]){
                $(cell).text('💣');
            }
        }
    }
}

function startGame(){
    game = new Game(SIZE);
    initTable();
    window.game = game;
}


startGame();
game.board[6][9] = 1;
drawBombs();

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
            $(cell).on("click",function(){
                clicked(new Coord(i,j));
            })
        }
    }

}

function getCell(coord){
    return table.children[coord.x].children[coord.y];
}

function getNeighborBombs(coord){
    let count = 0;
    count += game.board?.[coord.x-1]?.[coord.y-1] || 0;
    count += game.board?.[coord.x-1]?.[coord.y] || 0;
    count += game.board?.[coord.x-1]?.[coord.y+1] || 0;
    count += game.board?.[coord.x]?.[coord.y-1] || 0;
    count += game.board?.[coord.x]?.[coord.y+1] || 0;
    count += game.board?.[coord.x+1]?.[coord.y-1] || 0;
    count += game.board?.[coord.x+1]?.[coord.y] || 0;
    count += game.board?.[coord.x+1]?.[coord.y+1] || 0;
    return count;
}

function drawOne(coord){
    let cell = getCell(coord);
    if(game.board[coord.x][coord.y]){
        // $(cell).text('💣');
        drawBombs();
        $(cell).empty();
        $(`<img src="img/bomb red.png" style="width:20px;height:20px"></img>`).appendTo(cell);
    }
    else{
        let count = getNeighborBombs(coord);
        if(count === 0){
            let uncover = breadthFirstSearch(coord);
            console.log(uncover);
            for(let e of uncover){
                let c = getNeighborBombs(e);
                // if(c)
                    $(getCell(e)).text(''+c);
            }
        }
        // if(count)
            $(cell).text(''+count);
    }
}

function drawBombs(){
    for(let i = 0; i< SIZE; i++){
        for(let j = 0; j< SIZE; j++){
            let cell = getCell(new Coord(i,j));
            $(cell).off("click");
            if(game.board[i][j]){
                $(`<img src="img/bomb grey.png" style="width:20px;height:20px"></img>`).appendTo(cell);
            }
        }
    }
}

function generateBombs(numberOfBomb){
    let allTiles = Array(SIZE*SIZE);
    for(let i=0; i<numberOfBomb; i++){
        allTiles[i] = true;
    }
    shuffle(allTiles);
    for(let i = 0; i< SIZE; i++){
        for(let j = 0; j< SIZE; j++){
            game.board[i][j] = allTiles[i*SIZE + j];
        }
    }
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function clicked(coord){
    drawOne(coord);
}

function notOutOfBounds(coord){
    return coord.x > 0 && coord.x < SIZE && coord.y > 0 && coord.y < SIZE;
}

function breadthFirstSearch(coord){
    let visited = [];
    let queue = [coord];
    while(queue.length){
        let curr = queue.shift();
        console.log(curr)
        if(!notOutOfBounds(curr)){
            continue;
        }
        if(getNeighborBombs(curr)){
            visited.push(curr);
            continue;
        }
        if(visited.some(coord => coord.x === curr.x && coord.y === curr.y)){
            continue;
        }
        visited.push(curr);
        queue.push(new Coord(curr.x-1, curr.y-1));
        queue.push(new Coord(curr.x-1, curr.y  ));
        queue.push(new Coord(curr.x-1, curr.y+1));
        queue.push(new Coord(curr.x  , curr.y-1));
        queue.push(new Coord(curr.x  , curr.y+1));
        queue.push(new Coord(curr.x+1, curr.y-1));
        queue.push(new Coord(curr.x+1, curr.y  ));
        queue.push(new Coord(curr.x+1, curr.y+1));
    }
    return visited;
}

function startGame(){
    game = new Game(SIZE);
    initTable();
    window.game = game;
}

startGame();
generateBombs(69);
// drawBombs();

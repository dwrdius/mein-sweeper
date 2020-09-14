"use strict";
const SIZE = 20;
let table;
initTable();
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

function highlight(coord, color){
    table.children[coord.x].children[coord.y].style.backgroundColor = color;
}

function highlightMOAR(coordList, color){
    for (let e of coordList){
        highlight(e,color);
    }
}

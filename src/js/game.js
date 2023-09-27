"use strict";


// Array Scripts

function create2DArrayInitializedTo(numofRow, numofCol, initialValue) {
    const arr2D = [];
    for (let i  = 0; i < numofRow; i++){
        let row = [];
        for (let j = 0; j < numofCol; j++){
            row.push(initialValue)
        }
        arr2D.push(row)
    }
}

function set2DArrayEveryElementToValue(arr2D, value) {
    for (let i = 0; i < arr2D.length; i++) {
        for (let j = 0; j < arr2D[0].length; j++) {
            arr2D[i][j] = value;
        }
    }
}

function create2DArrayClonedFrom(arr2D) {
    const arr2DCloned = [];
    for (let i = 0; i < arr2D.length; i++) {
        arr2DCloned.push([...arr2D[i]]);
    }
    return arr2DCloned;
}

// dimension of arr2DA and arr2DB should be the same.
function logicalAndBetween2DArray(arr2DA, arr2DB) {
    const arr2D = [];
    for (let i = 0; i < arr2DA.length; i++) {
        let row = [];
        for (let j = 0; j < arr2DA[0].length; j++) {
            row.push(arr2DA[i][j] && arr2DB[i][j]);
        }
        arr2D.push(row);
    }
    return arr2D;
}

// pawnMoveTuple: represent pawn move
const MOVE_UP = [-1, 0];
const MOVE_DOWN = [1, 0];
const MOVE_LEFT = [0, -1];
const MOVE_RIGHT = [0, 1];

// Represents the position of a Pawn

class PawnPosition{
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    equals(otherPosition){
        this.row === otherPosition.row && this.col === otherPosition.col 
    }

    newAddMove(pawnMoveTuple){
        return new PawnPosition(this.row + pawnMoveTuple[0], this.col + pawnMoveTuple[1]);
    }

}

// Represents a Pawn

class Pawn {
    constructor(index, isWhiteSide, isHumanPlayer, forClone=false){
        this.index = null;
        this.isWhiteSide = null;
        this.isHumanPlayer = null;
        this.position = null;
        this.goalRow = null;
        this.numberofWalls = null;
        
        if(!forClone){
            this.index = index
            this.isHumanPlayer = isHumanPlayer
            if(isWhiteSide === true){
                this.isWhiteSide = true;
                this.position = new PawnPosition(8,4);
                this.goalRow = 0;
            } else {
                this.isWhiteSide = false;
                this.position = new PawnPosition(0,4);
                this.goalRow = 8;
            }

            this.numberofWalls = 10;

        }


    }

}

// Represents a Board

class Board {
    constructor(whiteHuman=true, blackHuman=false,forClone = false) {
        this.pawns = null;
        this.walls = null;
        if (!forClone) {
            // this.pawns[0] represents a light-colored pawn (which moves first).
            // this.pawns[1] represents a dark-colored pawn.
            this.pawns = [new Pawn(0, true, whiteHuman), new Pawn(1, false, blackHuman)];

            // horizontal, vertical: each is a 8 by 8 2D array, true: there is a wall, false: there is not a wall.
            this.walls = {horizontal: create2DArrayInitializedTo(8, 8, false), vertical: create2DArrayInitializedTo(8, 8, false)};
        }
    }
}

// Represents a game of Quoridor and its rules


class Game {
    constructor(whiteHuman=true, blackHuman=false, forClone = false) {
        this.board = null;
        this.winner =null;
        this._turn = null;
        this._validNextWalls = null;       
        this._openWays = null;
        this._validNextPositions = null;
        // Flag to see if valid Positions needs to be checked
        this._validNextPositionsUpdated = null; 

        if(!forClone){
            this.board = new Board(whiteHuman, blackHuman)
            this.winner = null;
            this._turn = 0;
            this._validNextWalls = {horizontal: create2DArrayInitializedTo(8,8,true), vertical: create2DArrayInitializedTo(8,8,true)};
            this._openWays = {upDown: create2DArrayInitializedTo(8,9, true), leftRight: create2DArrayInitializedTo(9,8, true)};
            this._validNextPositions = create2DArrayInitializedTo(9,9, false);
            this._validNextPositionsUpdated = false;
        }
    }

    get turn() {
        return this._turn;
    }

    set turn(newTurn){
        this._turn = newTurn;
    }

    get whitepawn() {
        return this.board.pawns[0];
    }

    get blackpawn() {
        return this.board.pawns[1];
    }

    get pawnIndexOfTurn() {
        return this.turn % 2;
    }

    get pawnIndexOfNotTurn() {
        return (this.turn + 1) % 2;
    }

    get pawnOfTurn() {
        return this.board.pawns[this.pawnIndexOfTurn];
    }

    get pawnOfNotTurn() {
        return this.board.pawns[this.pawnIndexOfNotTurn];
    }

    get validNextPositions() {
        if(this._validNextPositionsUpdated === true) {
            return this._validNextPositions;
        }

        this._validNextPositionsUpdated = true;

        set2DArrayEveryElementToValue(this._validNextPositions, false);

        //Set Valid Position Towards

        return this._validNextPositions;

    }

    _set_validNextPositionsToward(mainMove, subMove1, subMove2) {
        
    }

    isValidNextMove(currentPosition, pawnMoveTuple){
        // Check Can Move based on Walls  and board size
        // Assumes openWays is updated correctly
    }

    isOpenWay(currentRow, currentCol, pawnMoveTuple){

    }

    movePawn(row, col, needCheck = false){

    }

    placeHorizontalWall(row, col, needCheck = false) {

        // No Validation Happening Atm

        this._openWays.upDown[row][col] = false;
        this._openWays.upDown[row][col + 1] = false;
        this.validNextWalls.vertical[row][col] = false;
        this.validNextWalls.horizontal[row][col] = false;
        if (col > 0) {
            this.validNextWalls.horizontal[row][col-1] = false;
        }
        if (col < 7) {
            this.validNextWalls.horizontal[row][col+1] = false;
        }

        this.board.walls.horizontal[row][col] = true;

        this.pawnOfTurn.numberofWalls--;
        this.turn++;

    }

    placeVecticalWall(row, col, needCheck = false) {
        
    }

    _existPathsToGoalLines() {
        return (this._existPathToGoalLineFor(this.pawnOfTurn) && this._existPathToGoalLineFor(this.pawnOfNotTurn));
    }

    _existPathToGoalLineFor(pawn){
        return true;
    }


}
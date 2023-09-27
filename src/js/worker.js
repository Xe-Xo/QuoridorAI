"use strict"

importScripts('model.js');


onmessage = function(event){
    const game = Game.clone(event.data.game);
    if (game.winner === null) {
        const ai = new AI();
        const move = ai.chooseNextMove(game);
        postMessage(move);
    }
}
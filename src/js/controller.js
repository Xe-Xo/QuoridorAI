
"use strict"

class Controller {
    constructor(){
        this.game = null;
        this.gameHistory = null;
        this.gameHistoryTrashCan = null;
        this.view = new View(this);
        this.worker = null;
    }

    setNewWorker(){
        if(this.worker !== null){
            this.worker.terminate();
        
        }

        this.worker = new Worker('js/worker.js');
        const onMessageFunc = function(event){
            const data = event.data;
            if(typeof(data) == "number") {
                this.view.adjustProgressBar(data * 100);
            } else {
                const move = data;
                this.doMove(move);
            }
        }
        this.worker.onmessage = onMessageFunc.bind(this);
        this.worker.onerror = function(error) {
            console.log('Worker error: ' + error.message + '\n');
            throw error;
        }
    }


    startNewGame(){
        this.setNewWorker();
        let game = Game();
        this.game = game;
        this.gameHistory = []
        this.gameHistoryTrashCan = [];

        this.gameHistory.push(Game.clone(this.game));
        this.view.game = this.game;
        this.view.render();
    }

    doMove(move){
        if(this.game.doMove(move, true)){
            this.gameHistory.push(Game.clone(this.game));
            this.gameHistoryTrashCan = [];
            this.view.render();
        } else {
            console.log("Roh Oh Move Invalid")
        }
    }

    undo(){
        this.setNewWorker();
        this.gameHistoryTrashCan.push(this.gameHistory.pop());
        let game = this.gameHistory.pop();
        while(!game.pawnOfTurn.isHumanPlayer){
            this.gameHistoryTrashCan.push(game);
            game = this.gameHistory.pop(); // this pops last game state
        }

        this.game = game;
        this.gameHistory.push(Game.clone(this.game));
        this.view.game = this.game;
        this.view.render();
    }

    redo(){
        this.game = this.gameHistoryTrashCan.pop();
        this.gameHistory.push(Game.clone(this.game));
        this.view.game = this.game;
        this.view.render();
    }

    aiDo(){
        this.worker.postMessage({game: this.game})
    }

    
}

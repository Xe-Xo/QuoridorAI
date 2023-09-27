
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


}

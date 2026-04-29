const states = {
    STANDING: 0,
    WALKING: 1,
    JUMPING: 2,
}

class State {
    constructor(state){
        this.state = state;

    }
}

export class Standing extends State {
     constructor(player){
        super('STANDING');
        this.player = player;
     }
     enter(){

     }
     handleInput(input){

     }
}
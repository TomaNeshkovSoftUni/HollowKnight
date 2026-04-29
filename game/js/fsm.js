const states = {
    STANDING: 0,
    WALKING: 1,
    JUMPING: 2,
    FALLING: 3
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
        this.player.maxFrame = 0;
        this.player.frameY = 0;
     }
     handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.WALKING)
        }
        else if(input.includes('z')){
            this.player.setState(states.JUMPING)
        }
     }
}

export class Walking extends State {
     constructor(player){
        super('RUNNING');
        this.player = player;
     }
     enter(){
        this.player.maxFrame = 7;
        this.player.frameY = 0;
     }
     handleInput(input){
        if (input.length === 0){
            this.player.setState(states.STANDING)
        }
        else if(input.includes('z')){
            this.player.setState(states.JUMPING)
        }
     }
}

export class Jumping extends State {
     constructor(player){
        super('JUMPING');
        this.player = player;
     }
     enter(){
        if(this.player.onGround()){
            this.player.vy -= 25;
        }
        this.player.frameY = 9;
        this.player.frameX = 0;
        this.player.maxFrame = 6;
     }
     handleInput(input){
        if (this.player.vy > this.player.weight){
            this.player.setState(states.FALLING)
        }
     }
}

export class Falling extends State {
     constructor(player){
        super('FALLING');
        this.player = player;
     }
     enter(){
        this.player.frameY = 9;
        this.player.frameX = 4;
        this.player.maxFrame = 12;
     }
     handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.STANDING)
        }
     }
}
import { Standing } from "./fsm";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 728 / 9;
        this.height = 81;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById("knightWalk")
        this.frameX = 0;
        this.frameY = 0;
        this.weight = 1;
        this.vy = 0;
        this.speed = 0;
        this.maxSpeed = 2;
        this.states = [new Standing(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input){
        this.x += this.speed
        if(input.includes('ArrowRight')){
            this.speed = this.maxSpeed
        }
        else if(input.includes('ArrowLeft')){
            this.speed = this.speed = -this.maxSpeed
        }
        else{
            this.speed = 0
        }

        if(this.x < 0){
            this.x = 0
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width
        }

        this.y += this.vy;

        if(input.includes('c') && this.onGround()){
            this.vy -= 15;
        }
        this.y += this.vy
        
        if(!this.onGround()){
            this.vy += this.weight
        }
        else{
            this.vy = 0;
        }
    }

    draw(context){

        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    onGround(){
        return this.y >= this.game.height - this.height; 
    }
}

export class InputHandler{
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            
            if(
                (e.key === 'ArrowDown' 
                || e.key === 'ArrowUp'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowRight'
                || e.key === 'c'
            ) && this.keys.indexOf(e.key) === -1){

                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
        });

        window.addEventListener('keyup', e => {
            
            if(e.key === 'ArrowDown' 
                || e.key === 'ArrowUp'
                || e.key === 'ArrowUp'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowRight'
                || e.key === 'c'
            ){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(e.key, this.keys);
        });
    }
}
import { Standing, Walking, Jumping, Falling } from "./fsm.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 2048 / 16;
        this.height = 128;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById("player")
        this.frameX = 0;
        this.frameY = 0;
        this.weight = 1;
        this.vy = 0;
        this.maxFrame = 7;
        this.fps = 12;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 5;
        this.states = [new Standing(this), new Walking(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime){
        this.currentState.handleInput(input)

        this.x += this.speed
        if(input.includes('ArrowRight')){
            this.speed = this.maxSpeed
        }
        else if(input.includes('ArrowLeft')){
            this.speed = -this.maxSpeed;
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
        
        if(!this.onGround()){
            this.vy += this.weight
        }
        else{
            this.vy = 0;
        }

        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;

            if(this.frameX < this.maxFrame){
                this.frameX++
            }
            else
            {
                this.frameX = 0
            }
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context){
        context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
        );
    }

    onGround(){
        return this.y >= this.game.height - this.height; 
    }

    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
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
                || e.key === 'z'
            ) && this.keys.indexOf(e.key) === -1){

                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
        });

        window.addEventListener('keyup', e => {
            
            if(e.key === 'ArrowDown' 
                || e.key === 'ArrowUp'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowRight'
                || e.key === 'z'
            ){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(e.key, this.keys);
        });
    }
}
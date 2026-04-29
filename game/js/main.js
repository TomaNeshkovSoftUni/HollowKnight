import { Player } from "./player.js";
import { InputHandler } from "./fsm.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d')
    canvas.width = 1280;
    canvas.height = 720;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();
        }

        update(){
            this.player.update(this.input.keys);
        }

        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height); 
    console.log(game)

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
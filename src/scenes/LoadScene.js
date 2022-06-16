import { CST } from "../CST.js";
export default class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    preload() {
        this.load.image("wall","../dist/assets/images/wall.jpg");
        this.load.image("Door","../dist/assets/images/door.png");
        this.load.image("DoorOpen","../dist/assets/images/door2.png");

        this.load.image("platform", "../dist/assets/images/platform.png");
        this.load.image("boden", "../dist/assets/images/boden2.png");


        this.load.image("ground1", "../dist/assets/images/Ground1.png");
        this.load.image("ground2", "../dist/assets/images/Ground2.png");
        this.load.image("ground3", "../dist/assets/images/Ground3.png");

        this.load.image("star", "../dist/assets/images/star.png");
        this.load.image("bomb", "../dist/assets/images/bomb.png");

        this.load.spritesheet("dude", "../dist/assets/sprites/dude.png",{
            frameWidth: 32,
            frameHeight: 48
        });
        //Loading Bar
        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent) =>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent)
        })
        this.load.on("complete", () =>{
            console.log("geladen")
        })
    }
    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}
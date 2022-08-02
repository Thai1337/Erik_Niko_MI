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
        this.load.audio("pling", "../dist/assets/audio/Blop-Mark_DiAngelo-79054334.mp3");
        this.load.audio("gettingHit", "../dist/assets/audio/Sharp Punch.mp3");
        this.load.audio("death", "../dist/assets/audio/Pain.mp3");
        this.load.audio("laserSound", "../dist/assets/audio/Laser_Machine_Gun1.mp3");
        this.load.audio("backgroundMusic", "../dist/assets/audio/Platformer Theme.mp3");
        this.load.audio("mainMenuBackgroundMusic", "../dist/assets/audio/HoliznaCC0 - NPC Theme.mp3");
        this.load.audio("backgroundMusic2", "../dist/assets/audio/HoliznaCC0 - ICE temple.mp3");
        this.load.audio("backgroundMusic3", "../dist/assets/audio/Komiku - Boss 6 Swoop attack.mp3");




        //this.load.image("laser", "../dist/assets/images/Laser.png");
        this.load.image("wall", "../dist/assets/images/wall.png");
        this.load.image("Door", "../dist/assets/images/door.png");
        this.load.image("DoorOpen", "../dist/assets/images/Door_Schrift.png");

        this.load.image("boden", "../dist/assets/images/boden2.png");
        this.load.image("background", "../dist/assets/images/background.png");

        this.load.image("ground1", "../dist/assets/images/Ground1.png");
        this.load.image("ground2", "../dist/assets/images/Ground2.png");
        this.load.image("ground3", "../dist/assets/images/Ground3.png");
        //this.load.image("laser", "../dist/assets/images/Laser.png");
        this.load.image("laser1", "../dist/assets/images/Laser.png");
        this.load.image("heart", "../dist/assets/images/heart.png");

        this.load.spritesheet("portalAnim", "../dist/assets/sprites/potalAnimCUT.png", {
            frameWidth: 83/3,
            frameHeight: 32
        });
        this.load.spritesheet("doorAnim", "../dist/assets/sprites/DoorAnim.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("diamant", "../dist/assets/sprites/Diamant.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("hebel", "../dist/assets/sprites/Hebel.png", {
            frameWidth: 64,
            frameHeight: 64
        });


        this.load.spritesheet("guyRun", "../dist/assets/sprites/Gunner_Yellow_Run.png",{
            frameWidth: 48,
            frameHeight: 38
        });

        this.load.spritesheet("guyStanding", "../dist/assets/sprites/Gunner_Yellow_Standing.png", {
            frameWidth: 48,
            frameHeight: 38
        });



        //this.load.spritesheet("dude", "../dist/assets/sprites/dude.png",{
        //    frameWidth: 96,
        //    frameHeight: 144
        //});

        this.load.spritesheet("robot", "../dist/assets/sprites/Robots.png",{
            frameWidth: 24,
            frameHeight: 32
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
import { CST } from "../CST.js";
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAMEOVER
        })
    }

    create() {
        //this.sounds.stopAll();
        this.background = this.add.tileSprite(0, 0 , 1920,1080,"background").setOrigin(0).setScrollFactor(0);
        this.Text=this.add.image(1920/2,1080/2,"gameOver");
        this.Text.setInteractive();
        this.Text.on("pointerup",()=>{
            window.location.reload();
        })
    }

}
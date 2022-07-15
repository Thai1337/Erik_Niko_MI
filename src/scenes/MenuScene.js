import { CST } from "../CST.js";
import eventsCenter from '../events/EventsCenter.js'
export default class MenuScene extends Phaser.Scene {
    counter = 1;
    label;
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {

    }
    preload() {

    }
    create() {
        this.add.image(0, 0, "background").setOrigin(0)
        this.add.image(0, 0, "wall").setOrigin(0)
        this.playDoor = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 * 1.56, "Door");
        this.playDoor.setScale(15)
        let playDoorOpen = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 * 1.56, "DoorOpen");
        playDoorOpen.setScale(15)
        playDoorOpen.setVisible(false);
        this.playDoor.setInteractive();

        this.playDoor.on("pointerover", () => {
            playDoorOpen.setVisible(true);
        })
        this.playDoor.on("pointerout", () => {
            //console.log("OUT")
            playDoorOpen.setVisible(false);
        })
        this.playDoor.on("pointerup", () => {
            //console.log("OPEN THE GATES")
            if(this.counter === 1) {
                this.scene.start(CST.SCENES.ROOM);
            }else if(this.counter === 2) {
                this.scene.stop(CST.SCENES.ROOM);
                this.scene.start(CST.SCENES.ROOM2);

            }else if(this.counter === 3) {
                this.scene.start(CST.SCENES.ROOM3);
            }
        })





        eventsCenter.on('update-count', this.updateCount, this);

        this.label = this.add.text(200,400, 'Level: ' + this.counter,{font:"''"});
        this.label.setFontSize(40);
    }

    updateCount(count) {
        this.counter++;

        console.log('Counter: ' + this.counter);

    }

}
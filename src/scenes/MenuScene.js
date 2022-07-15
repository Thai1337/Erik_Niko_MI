import { CST } from "../CST.js";
import eventsCenter from '../events/EventsCenter.js'
export default class MenuScene extends Phaser.Scene {
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
        let playDoor = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 * 1.56, "Door");
        playDoor.setScale(15)
        let playDoorOpen = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 * 1.56, "DoorOpen");
        playDoorOpen.setScale(15)
        playDoorOpen.setVisible(false);
        playDoor.setInteractive();

        playDoor.on("pointerover", () => {
            playDoorOpen.setVisible(true);
        })
        playDoor.on("pointerout", () => {
            console.log("OUT")
            playDoorOpen.setVisible(false);
        })
        playDoor.on("pointerup", () => {
            console.log("OPEN THE GATES")
            this.scene.start(CST.SCENES.ROOM);
        })
        this.counter = 0;
        eventsCenter.on('update-count', this.updateCount, this)

        this.text = this.add.text(200,400,this.counter,{font:"''"})
        this.text.setFontSize(40)
    }

    updateCount() {
        ++this.counter;
    }

}
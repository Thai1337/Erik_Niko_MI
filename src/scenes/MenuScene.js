import { CST } from "../CST.js";
import eventsCenter from '../events/EventsCenter.js'
export default class MenuScene extends Phaser.Scene {

    counter = 1;
    label;
    click = 0;
    startLeben = 5;
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
                this.scene.start(CST.SCENES.ROOM,{leben: this.startLeben});
            }else if(this.counter === 2) {
                this.scene.stop(CST.SCENES.ROOM);
                this.scene.start(CST.SCENES.ROOM2,{leben: this.leben});
                //eventsCenter.emit('lebenZuRaum2', this.leben);
                console.log("wird gestartet")

            }else if(this.counter === 3) {
                this.scene.stop(CST.SCENES.ROOM2);
                this.scene.start(CST.SCENES.ROOM3,{leben: this.leben});
            }
        })



        if (this.counter === 1) {
            this.heart1 = this.add.image(1500,475,"heart");
            this.heart2 = this.add.image(1550,475,"heart");
            this.heart3 = this.add.image(1600,475,"heart");
            this.heart4 =this.add.image(1650,475,"heart");
            this.heart5 =this.add.image(1700,475,"heart");

            this.heart1.setVisible(true)
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);
            this.heart4.setVisible(true);
            this.heart5.setVisible(true);

            this.difficulty = this.add.text(1490, 400, "Schwierigkeit",{fontFamily:'dirtyoldtown',fontSize:40})
            this.difficulty.setInteractive();
            this.difficulty.on("pointerup",()=>{
                this.click++
                if (this.click === 1){
                    this.heart4.setVisible(false)
                    this.heart5.setVisible(false);
                    this.startLeben = 3;
                }
                if (this.click === 2){
                    this.heart2.setVisible(false);
                    this.heart3.setVisible(false);
                    this.startLeben = 1;
                }
                if (this.click === 3){
                    this.startLeben = 5;
                    this.heart1.setVisible(true)
                    this.heart2.setVisible(true);
                    this.heart3.setVisible(true);
                    this.heart4.setVisible(true);
                    this.heart5.setVisible(true);
                    this.click = 0
                }

            })

        }



        eventsCenter.on('update-count', this.updateCount, this);

        eventsCenter.on('update-heart', this.updateLeben, this);

        this.label = this.add.text(200,400, 'LEVEL: ' + this.counter,{fontFamily:'dirtyoldtown',fontSize:40});
    }

    updateCount(count) {
        this.counter = count;
        console.log('Counter: ' + this.counter);
    }

    updateLeben(leben) {
        console.log("YYYYYYYYYYYYYYYYYYYYYY",leben);
        this.leben = leben;
        eventsCenter.emit('lebenZuRaum2', leben);
    }

}
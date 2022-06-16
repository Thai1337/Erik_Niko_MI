import { CST } from "../CST.js";
export default class RoomScene extends Phaser.Scene {



    constructor() {
        super({
            key: CST.SCENES.ROOM
        })
        this.cursors = null;
        this.player = null;
    }



    init() {

    }

    preload() {

    }
    create() {

        //let platforms  = this.physics.add.staticGroup();

        //platforms.create(0, 1080, 'boden').setScale(10).refreshBody();

        this.ground = this.add.tileSprite(0,window.innerHeight -286 ,window.innerWidth,100,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.ground,true);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(100, 450, "dude");

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);





        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });



        this.physics.add.collider(this.player, this.ground);
    }

    update ()
    {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

}
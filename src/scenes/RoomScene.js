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
        this.add.image(0, 0, "background").setOrigin(0)

        this.ground = this.add.tileSprite(0, 1045 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.ground,true);

        this.leftwall = this.add.tileSprite(0,  0, 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.leftwall,true);

        this.rightwall = this.add.tileSprite(1888, 0 , 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.rightwall,true);

        this.roof = this.add.tileSprite(0, 0 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.roof,true);

        this.cursors = this.input.keyboard.createCursorKeys();



        this.player = this.physics.add.sprite(100, 800, "dude");


        this.player.setBounce(0.3);
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
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);
    }

    update ()
    {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160*2);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160*2);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0*2);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330*1.5);
        }
    }

}
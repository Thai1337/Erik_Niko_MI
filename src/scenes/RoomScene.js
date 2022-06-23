import { CST } from "../CST.js";
export default class RoomScene extends Phaser.Scene {



    constructor() {
        super({
            key: CST.SCENES.ROOM
        })
        this.cursors = null;
        this.player = null;
        this.robots = null;
    }



    init() {

    }

    preload() {

    }
    create() {

        //let platforms  = this.physics.add.staticGroup();

        //platforms.create(0, 1080, 'boden').setScale(10).refreshBody();

        // background
        this.add.image(0, 0, "background").setOrigin(0)

        // raum
        this.ground = this.add.tileSprite(0, 1045 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.ground,true);

        this.leftwall = this.add.tileSprite(0,  0, 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.leftwall,true);

        this.rightwall = this.add.tileSprite(1888, 0 , 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.rightwall,true);

        this.roof = this.add.tileSprite(0, 0 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.roof,true);
        // platforms

        this.platfrom1 = this.add.tileSprite(100, 800 , 192,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom1, true)

        this.platfrom2 = this.add.tileSprite(800-32, 600 , 320+64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom2, true)

        this.platfrom3 = this.add.tileSprite(860, 400 , 192,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom3, true)

        this.platfrom4 = this.add.tileSprite(1400, 800 , 480,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom4, true)

        this.platfrom5 = this.add.tileSprite(32, 364 , 288,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom5, true)

        this.platfrom6 = this.add.tileSprite(1500, 500 , 256,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom6, true)

        this.box = this.add.tileSprite(864, 630 , 192,416,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.box, true)

        this.vplatfrom8 = this.add.tileSprite(960+128+64, 32, 32,540+32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.vplatfrom8, true)



        //
        this.cursors = this.input.keyboard.createCursorKeys();



        this.player = this.physics.add.sprite(100, 800, "guyRun");
        //this.player = this.physics.add.sprite(100, 800, "guyStanding");


        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2)



        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('guyRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        }
        );

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'guyStanding', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create(
            {
            key: 'right',
            frames: this.anims.generateFrameNumbers('guyRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
            });

        // Plattformen<
        this.physics.add.collider(this.player, this.platfrom1);
        this.physics.add.collider(this.player, this.platfrom2);
        this.physics.add.collider(this.player, this.platfrom3);
        this.physics.add.collider(this.player, this.platfrom4);
        this.physics.add.collider(this.player, this.platfrom5);
        this.physics.add.collider(this.player, this.platfrom6);
        this.physics.add.collider(this.player, this.box);
        this.physics.add.collider(this.player, this.vplatfrom8);


        // Wände
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);

        this.robots = this.physics.add.group();
        this.physics.add.collider(this.player, this.robots, this.hitRobot, null, this);


        // spawnt Robots
        this.spawnRobot(this.player, "robot");


    }

    update ()
    {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160*3);

            this.player.anims.play('left', true);
            this.player.flipX=true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160*3);

            this.player.anims.play('right', true);
            this.player.flipX=false;
        }
        else
        {
            this.player.setVelocityX(0*2);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330*3.5);
        }
    }

    spawnRobot(player, robot){
            robot = this.robots.create(800, 100, 'robot');
            robot.setBounce(1);
            robot.setCollideWorldBounds(true);
            robot.setVelocity(Phaser.Math.Between(-200, 200), 20);
            robot.setScale(5)
    }

    hitRobot (player, robot)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        console.log("HIT")
    }

}
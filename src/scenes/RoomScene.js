import { CST } from "../CST.js";
import LaserGroup from "../group/LaserGroup.js";
import eventsCenter from '../events/EventsCenter.js'
export default class RoomScene extends Phaser.Scene {



    constructor() {
        super({
            key: CST.SCENES.ROOM
        })
        this.cursors = null;
        this.player = null;
        //this.Objective = true;
        this.robotarray = [];
        this.collider3 = [];
        this.laserGroup = null;

    }



    init() {

    }

    preload() {
        this.load.image("laser", "../dist/assets/images/Laser.png");
    }
    create() {
        this.count = 0

        this.laserGroup = new LaserGroup(this);
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

        this.platfrom1 = this.add.tileSprite(100, 800 , 192+32,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom1, true)

        this.platfrom2 = this.add.tileSprite(800-32, 600 , 320+64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom2, true)

        this.platfrom3 = this.add.tileSprite(860, 400 , 192,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom3, true)

        this.platfrom4 = this.add.tileSprite(1400, 800 , 480,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom4, true)

        this.platfrom5 = this.add.tileSprite(32, 364 , 288+64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom5, true)

        this.platfrom6 = this.add.tileSprite(1500, 500 , 256,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom6, true)

        this.box = this.add.tileSprite(864, 630 , 192,416,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.box, true)

        this.vplatfrom8 = this.add.tileSprite(960+128+64, 32, 32,540+32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.vplatfrom8, true)

        //this.hebel = this.physics.add.sprite(100, 200, "hebel");
        //this.diamant.enableBody(true, true);
        this.diamant = this.physics.add.sprite(1840, 900, "diamant").setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //RoomScene.physics.startSystem(Phaser.Physics.P2JS);

        this.player = this.physics.add.sprite(100,800 , "guyRun");
        this.player.setSize(12,38)
        this.player.setOffset(16,3)
        //player.body.clearShapes();
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

        this.anims.create({
            key: 'gegnerAnim',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'animHebel',
            frames: this.anims.generateFrameNumbers('hebel', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'doorAnim',
            frames: this.anims.generateFrameNumbers('doorAnim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'diamant',
            frames: this.anims.generateFrameNumbers('diamant', { start: 0, end: 0}),
            frameRate: 10,
            repeat: 0
        });



        // Plattformen<
        this.physics.add.collider(this.player, this.platfrom1);
        this.physics.add.collider(this.player, this.platfrom2);
        this.physics.add.collider(this.player, this.platfrom3);
        this.physics.add.collider(this.player, this.platfrom4);
        this.physics.add.collider(this.player, this.platfrom5);
        this.physics.add.collider(this.player, this.platfrom6);
        this.collider = this.physics.add.collider(this.player, this.box);
        this.physics.add.collider(this.player, this.vplatfrom8);




        // Wände
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);

        this.robots = this.physics.add.group();

        //Diamant
        this.collider5 =this.physics.add.collider(this.player, this.diamant, this.hitDiamant, null, this);
        this.physics.add.collider(this.diamant, this.ground);
        this.physics.add.collider(this.diamant, this.rightwall);


        // spawnt Robots
        this.spawnRobot(this.player, "robot");
        this.spawnRobot(this.player, "robot");
        this.spawnHebel(this.player, "hebel");
        this.spawnDoor(this.player, "doorAnim");
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160*3);

            this.player.anims.play('left', true);
            this.player.flipX=true;

            this.laserGroup.fireDirection(true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160*3);

            this.player.anims.play('right', true);
            this.player.flipX=false;

            this.laserGroup.fireDirection(false);
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

        if (this.spaceBar.isDown) {
            console.log("Space bar is down");
            this.shootLaser();
        }
    }

    spawnRobot(player, robot){
            //robot = this.robots.create(800, 100, 'robot');
            robot = this.physics.add.sprite(1600, 450, 'robot');
            robot.setSize(12,20)
            robot.setOffset(5,15)
            robot.setBounce(1);
            robot.setCollideWorldBounds(true);
            robot.setVelocity(Phaser.Math.Between(0, 400), 20);
            robot.setScale(4)

            this.physics.add.overlap(this.laserGroup, robot, this.hitStars, null, this );

            this.physics.add.collider(robot, this.platfrom1);
            this.physics.add.collider(robot, this.platfrom2);
            this.physics.add.collider(robot, this.platfrom3);
            this.physics.add.collider(robot, this.platfrom4);
            this.physics.add.collider(robot, this.platfrom5);
            this.physics.add.collider(robot, this.platfrom6);

            let colliderTest = this.physics.add.collider(robot, this.box);

            this.collider3.push(colliderTest);
            this.physics.add.collider(robot, this.vplatfrom8);

            this.physics.add.collider(robot, this.ground);
            this.physics.add.collider(robot, this.leftwall);
            this.physics.add.collider(robot, this.rightwall);
            this.physics.add.collider(robot, this.roof);


            this.robotarray.push(robot);
            robot.anims.play('gegnerAnim',true);

        this.physics.add.collider(this.player, robot, this.hitRobot, null, this);

        this.physics.add.overlap(this.laserGroup, robot, this.shootRobot, null, this);


        this.physics.add.overlap(this.laserGroup, this.platfrom1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom2, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom3, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom4, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom5, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom6, this.shootWall, null, this);

        this.physics.add.overlap(this.laserGroup, this.vplatfrom8, this.shootWall, null, this);

        this.collider6 = this.physics.add.overlap(this.laserGroup, this.box, this.shootWall, null, this);
        console.log(this.collider6);

        this.physics.add.overlap(this.laserGroup, this.ground, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.leftwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.rightwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);



    }

    hitRobot (player, robot)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        console.log("HIT")
    }

    shootRobot (laser, robot) {
        console.log("Treffer");

        robot.disableBody(true, true);

        laser.disableBody(true, true);
        laser.setActive(false);
        laser.setVisible(false);

        //laser.destroy(true);
    }

    shootWall(laser, wall) {
        console.log(" Wand");

        wall.disableBody(true, true);
        wall.setActive(false);
        wall.setVisible(false);

        //wall.destroy(true);
    }

    spawnHebel(player,hebel) {
        hebel = this.physics.add.staticSprite(100, 330, "hebel");
        this.physics.add.collider(hebel, this.platfrom5);
        this.physics.add.collider(hebel, this.leftwall);

         this.collider1 =this.physics.add.collider(this.player, hebel, this.hitHebel,null, this);
    }

    hitHebel(player, hebel){
        this.collider1.active = false;
        this.collider.active = false;
        this.box.destroy(true);
        console.log("Collider 6 off")

        for (let i = 0; i < this.robotarray.length; i++) {
            this.collider3[i].active = false;
            //console.log(this.collider3[i]);
        }

        this.box.visible = false;
        hebel.anims.play('animHebel', true)
    }



    spawnDoor(player,doorAnim) {
        doorAnim = this.physics.add.staticSprite(1630, 440, "doorAnim");
        doorAnim.setSize(32*4,32*4)
        doorAnim.setScale(4)
        this.physics.add.collider(doorAnim, this.platfrom6);
        this.physics.add.collider(doorAnim, this.platfrom4);
        this.physics.add.collider(doorAnim, this.rightwall);
        this.physics.add.collider(doorAnim, this.ground);

        this.colliderPlayerDoor4 = this.physics.add.collider(this.player, doorAnim, this.hitDoor,null, this);




    }

    hitDoor(player, doorAnim){
        doorAnim.setPosition(1630,440)
        if(this.colliderPlayerDiamond5 == true) {
            //this.colliderPlayerDoor4.active = false;
            doorAnim.anims.play('doorAnim', true)
            //Pause
            ++this.count
            eventsCenter.emit('update-count', this.count)
            this.scene.start(CST.SCENES.MENU);
        }
        //if(this.Objective = true){
           // door.anims.play('doorAnim', true)
        //}
        }
    hitDiamant(){
        console.log("HIT DIAMND");
        this.diamant.visible = false;
        this.colliderPlayerDiamond5 = true;
    }

    shootLaser(){
        this.laserGroup.fireLaser(this.player.x, this.player.y);

    }
}
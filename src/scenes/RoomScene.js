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
        this.allcollider = [];
        this.laserGroup = null;

    }



    init(data) {
        this.leben = data.leben
        console.log("INIT IST DA" + this.leben);
    }

    preload() {

    }
    create() {
        this.sound.play("backgroundMusic",{volume:0.05});


        this.count = 2;
        console.log(this.count);

        eventsCenter.emit('update-count', this.count);


        //let platforms  = this.physics.add.staticGroup();

        //platforms.create(0, 1080, 'boden').setScale(10).refreshBody();

        // background
        this.background = this.add.tileSprite(0, 0 , 1920,1080,"background").setOrigin(0).setScrollFactor(0);
        //this.add.existing(this.background,true);
        //this.add.image(0, 0, "background").setOrigin(0)

        //herzen
        this.herz1 = this.add.image(40,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz2 = this.add.image(80,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz3 = this.add.image(120,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz4 = this.add.image(160,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz5 = this.add.image(200,50, "heart").setOrigin(0).setScrollFactor(0);
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

        this.platfrom1 = this.add.tileSprite(100, 800 , 192+32,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom1, true)

        this.platfrom2 = this.add.tileSprite(800-32, 600 , 320+64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom2, true)



        this.laserGroup = new LaserGroup(this);



        this.platfrom3 = this.add.tileSprite(860, 400 , 192,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom3, true)

        this.platfrom4 = this.add.tileSprite(1400, 800 , 480,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom4, true)

        this.platfrom5 = this.add.tileSprite(32, 364 , 288+64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom5, true)

        this.platfrom6 = this.add.tileSprite(1500, 500 , 256,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platfrom6, true)

        this.box = this.add.tileSprite(864, 630 , 192,416,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.box, true)

        this.vplatfrom8 = this.add.tileSprite(960+128+64, 32, 32,540+32,"ground1").setOrigin(0).setScrollFactor(0);
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
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 7 }),
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

        this.objective = this.add.text(1400,50, 'Objective: pull the Lever',{fontFamily:'dirtyoldtown',fontSize:25})
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
            //console.log("Space bar is down");
            this.shootLaser();
        }
        switch (this.leben) {
            case 4:
                this.herz5.setVisible(false);
                break;
            case 3:
                this.herz5.setVisible(false);
                this.herz4.setVisible(false);
                break;
            case 2:
                this.herz5.setVisible(false);
                this.herz4.setVisible(false);
                this.herz3.setVisible(false);
                break;
            case 1:
                this.herz5.setVisible(false);
                this.herz4.setVisible(false);
                this.herz3.setVisible(false);
                this.herz2.setVisible(false);
                break;
            case 0:
                this.herz5.setVisible(false);
                this.herz4.setVisible(false);
                this.herz3.setVisible(false);
                this.herz2.setVisible(false);
                this.herz1.setVisible(false);
                break;
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

        this.colliderPlayerRobot7 = this.physics.add.collider(this.player, robot, this.hitRobot, null, this);

        this.allcollider.push(this.colliderPlayerRobot7);

        this.physics.add.overlap(this.laserGroup, robot, this.shootRobot, null, this);


        this.physics.add.overlap(this.laserGroup, this.platfrom1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom2, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom3, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom4, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom5, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platfrom6, this.shootWall, null, this);

        this.physics.add.overlap(this.laserGroup, this.vplatfrom8, this.shootWall, null, this);

        this.collider6 = this.physics.add.overlap(this.laserGroup, this.box, this.shootWall, null, this);
        //console.log(this.collider6);

        this.physics.add.overlap(this.laserGroup, this.ground, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.leftwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.rightwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);



    }

    hitRobot (player, robot) {
        if(this.leben <= 1 ){
            this.sound.play("death", {volume: 0.5});
            this.herz1.setVisible(false);
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.scene.start(CST.SCENES.GAMEOVER);
                },
                loop: false
            });
        }else {
            this.sound.play("gettingHit", {volume: 0.5});
            console.log("HIIHIHHIHIHIIHIHHIHI");

            for (let i = 0; i < this.allcollider.length; i++) {
                this.allcollider[i].active = false;
            }
            player.setTint(0x0088FF);
            console.log(this.leben);                    --this.leben;

            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    for (let i = 0; i < this.allcollider.length; i++) {
                        this.allcollider[i].active = true;
                    }
                    player.setTint(0xffffff);
                },
                loop: false
            });
            console.log(this.leben)
        }
        //console.log("HIT")
    }
    shootRobot (laser, robot) {
        //console.log("Treffer");

        robot.disableBody(true, true);

        laser.disableBody(true, true);
        laser.setActive(false);
        laser.setVisible(false);

        //laser.destroy(true);
    }

    shootWall(laser, wall) {
        //console.log(" Wand");

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
        this.sound.play("pling");
        this.collider1.active = false;
        this.collider.active = false;
        this.box.destroy(true);
        //console.log("Collider 6 off")

        for (let i = 0; i < this.robotarray.length; i++) {
            this.collider3[i].active = false;
            //console.log(this.collider3[i]);
        }

        this.box.visible = false;
        hebel.anims.play('animHebel', true)
        this.objective.setText("Objective: collect the diamond");
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
            this.time.addEvent({
                delay: 400,
                callback: ()=>{
                    eventsCenter.emit('update-heart', this.leben);
                    this.sound.play("pling");
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.MENU);
                },
                loop: false
            });
        }
        //if(this.Objective = true){
           // door.anims.play('doorAnim', true)
        //}
        }
    hitDiamant(){
        this.sound.play("pling");
        //console.log("HIT DIAMND");
        this.diamant.visible = false;
        this.colliderPlayerDiamond5 = true;
        this.objective.setText("Objective: get through the door");
    }

    shootLaser(){
        this.laserGroup.fireLaser(this.player.x, this.player.y);
    }
}
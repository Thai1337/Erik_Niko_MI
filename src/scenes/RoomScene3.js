import { CST } from "../CST.js";
import LaserGroup from "../group/LaserGroup.js";
import eventsCenter from "../events/EventsCenter.js";
export default class RoomScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.ROOM3
        })
        this.robotarray = [];
        this.bossarray = [];
        this.cursors = null;
        this.player = null;
        this.allcollider = [];
        this.bossTod = false;
        this.zeit = 0;
        console.log("dsfsafdsaf");
        console.log(this.zeit)
    }

    init (data) {
        this.leben = data.leben
        console.log("INIT IST DA" + this.leben);
    }
    preload() {

    }
    create() {
        this.sound.stopAll();
        this.sound.play("backgroundMusic3", {volume: 0.05});

        this.background = this.add.tileSprite(0, 0 , 1920,1080,"background").setOrigin(0).setScrollFactor(0);
        this.laserGroup = new LaserGroup(this);
        //herzen
        this.herz1 = this.add.image(40,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz2 = this.add.image(80,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz3 = this.add.image(120,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz4 = this.add.image(160,50, "heart").setOrigin(0).setScrollFactor(0);
        this.herz5 = this.add.image(200,50, "heart").setOrigin(0).setScrollFactor(0);
        //Room
        this.ground = this.add.tileSprite(0, 1045 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.ground,true);

        this.leftwall = this.add.tileSprite(0,  0, 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.leftwall,true);

        this.rightwall = this.add.tileSprite(1888, 0 , 32,1080,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.rightwall,true);

        this.roof = this.add.tileSprite(0, 0 , 1920,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.roof,true);
        //Platforms
        this.platformUnterDoor = this.add.tileSprite(32, 320 , 1920-64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformUnterDoor, true)

        this.platformTreppe0 = this.add.tileSprite(256, 896 , 256-64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe0, true)

        this.platformTreppe1 = this.add.tileSprite(256*3-64, 736 , 256-64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe1, true)

        this.platformTreppe2 = this.add.tileSprite(256*5-128, 608 , 256-64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe2, true)

        this.platformTreppe3 = this.add.tileSprite(256*6-64, 512 , 256-64,32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe3, true)

        this.platformVorKorridor = this.add.tileSprite(256*6+128, 320+128+64 , 32,640-32,"ground1").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformVorKorridor, true)
        this.ziel = this.platformDoor = this.add.tileSprite(256*6-64+7*32, 512-128-32 , 32,+128+32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformDoor, true)
        //input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //player
        this.player = this.physics.add.sprite(100,800 , "guyRun");
        this.player.setSize(12,38)
        this.player.setOffset(16,3)
        //player.body.clearShapes();
        //this.player = this.physics.add.sprite(100, 800, "guyStanding");


        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2)

        //Animationen
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
            key: 'gegnerAnim3',
            frames: this.anims.generateFrameNumbers('robot', { start: 48, end: 48+7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'doorAnim',
            frames: this.anims.generateFrameNumbers('doorAnim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'gegnerAnim2',
            frames: this.anims.generateFrameNumbers('robot', { start: 7, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'portalAnim',
            frames: this.anims.generateFrameNumbers('portalAnim', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.platformUnterDoor);
        this.physics.add.collider(this.player, this.platformTreppe0);
        this.physics.add.collider(this.player, this.platformTreppe1);
        this.physics.add.collider(this.player, this.platformTreppe2);
        this.physics.add.collider(this.player, this.platformTreppe3);
        this.physics.add.collider(this.player, this.platformVorKorridor);
        this.physics.add.collider(this.player, this.platformDoor);
        //raum
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);

        this.spawnDoor(this.player, "doorAnim");
        this.spawnPortal(this.player,"portalAnim","portalAnim");
        this.spawnBoss(this.player, "robot", 200, 100);


        this.objective = this.add.text(1200,50, 'Objective: Kill the Mastermind',{fontFamily:'dirtyoldtown',fontSize:25})

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
            this.shootLaser(this.player.flipX);
        }
        for (let i = 0; i < this.robotarray.length; i++) {

            if (this.player.x < this.robotarray[i].x) {
                //this.robotarray[i].x -= 1.5;
                this.robotarray[i].setVelocityX(-Phaser.Math.Between(0, 300));
            } else {
                this.robotarray[i].setVelocityX(Phaser.Math.Between(0, 300));
                //this.robotarray[i].x += 1.5;
            }
            if (this.player.y < this.robotarray[i].y) {
                this.robotarray[i].setVelocityY(-Phaser.Math.Between(0, 300));
            } else {
                this.robotarray[i].setVelocityY(Phaser.Math.Between(0, 300));
                //this.robotarray[i].x += 1.5;
            }
        }

        for (let i = 0; i < this.bossarray.length; i++) {

            if (this.player.x < this.bossarray[i].x) {
                //this.robotarray[i].x -= 1.5;
                this.bossarray[i].setVelocityX(-Phaser.Math.Between(0, 300));
            } else {
                this.bossarray[i].setVelocityX(Phaser.Math.Between(0, 300));
                //this.robotarray[i].x += 1.5;
            }
        }
            if(this.zeit == 500) {
                if (this.bossTod == false) {
                    this.spawnRobot(this.player, this.robot, this.bossarray[0].x, this.bossarray[0].y)
                    this.zeit = 0
                }
            }
            console.log(this.zeit)
            this.zeit += 1
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

        /*this.physics.add.overlap(this.laserGroup, this.platfrom1, this.shootWall, null, this);
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
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);*/

    }
    spawnDoor(player,doorAnim) {
        doorAnim = this.physics.add.staticSprite(1920-256-32, 440-128-56, "doorAnim");
        doorAnim.setSize(32*4,32*4)
        doorAnim.setScale(4)
        this.colliderPlayerDoor4 = this.physics.add.collider(this.player, doorAnim, this.hitDoor,null, this);
    }

    hitDoor(player, doorAnim){
        //doorAnim.setPosition(992-64, 440-128-56)
        if(true) {
            //this.colliderPlayerDoor4.active = false;
            doorAnim.anims.play('doorAnim', true)
            this.time.addEvent({
                delay: 400,
                callback: ()=>{
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.VICTORY);
                },
                loop: false
            });
            //Pause
        }
        //if(this.Objective = true){
        // door.anims.play('doorAnim', true)
        //}
    }

    spawnPortal(player,portalAnim,portalAnim2) {
        portalAnim = this.physics.add.staticSprite(1920-128, 950, "portalAnim");
        portalAnim.anims.play("portalAnim",true)
        portalAnim.setSize(32*4,32*4)
        portalAnim.setScale(4)

        this.colliderPlayerPortal = this.physics.add.collider(this.player, portalAnim, this.hitPortal,null, this);
    }

    hitPortal(player, portalAnim,portalAnim2){
        this.objective.setText("Objective: go through the Door");
        portalAnim.setPosition(1920-128, 950)
            console.log("HITP")

        player.x = 100
        player.y = 100
        //if(this.Objective = true){
        // door.anims.play('doorAnim', true)
        //}
    }
    shootLaser(){
        this.laserGroup.fireLaser(this.player.x, this.player.y);
    }
    spawnBoss(player, boss){

        //robot = this.robots.create(800, 100, 'robot');
        boss = this.physics.add.sprite(1600, 450, 'robot');
        boss.setSize(12,20)
        boss.setOffset(5,15)
        //robot.setBounce(1);
        boss.setCollideWorldBounds(true);
        //robot.setVelocity(Phaser.Math.Between(0, 400), 20);
        boss.setScale(5);
        boss.y = 400;
        boss.body.setAllowGravity(false);

        this.physics.add.overlap(this.laserGroup, boss, this.hitStars, null, this );

        this.physics.add.collider(boss, this.platformVorKorridor);
        this.physics.add.collider(boss, this.platformTreppe0);
        this.physics.add.collider(boss, this.platformTreppe1);
        this.physics.add.collider(boss, this.platformTreppe2);
        this.physics.add.collider(boss, this.platformTreppe3);
        this.physics.add.collider(boss, this.platformUnterDoor);
        this.physics.add.collider(boss,this.platformDoor)

        this.physics.add.collider(boss, this.ground);
        this.physics.add.collider(boss, this.leftwall);
        this.physics.add.collider(boss, this.rightwall);
        this.physics.add.collider(boss, this.roof);


        this.bossarray.push(boss);
        boss.anims.play('gegnerAnim3',true);

        this.colliderPlayerRobot7 = this.physics.add.collider(this.player, boss, this.hitBoss, null, this);

        this.allcollider.push(this.colliderPlayerRobot7);

        this.physics.add.overlap(this.laserGroup, boss, this.shootBoss, null, this);


        this.physics.add.overlap(this.laserGroup, this.platformTreppe0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe2, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe3, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformUnterDoor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformVorKorridor, this.shootWall, null, this);

        this.physics.add.overlap(this.laserGroup, this.ground, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.leftwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.rightwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);



    }
    spawnRobot(player, robot,x,y){
        robot = this.physics.add.sprite(x, y, 'robot');

        robot.setSize(12,20)
        robot.setOffset(5,15)
        robot.setBounce(1);
        robot.setCollideWorldBounds(true);
        robot.setVelocity(Phaser.Math.Between(0, 400), 20);
        robot.setScale(4)

        this.physics.add.overlap(this.laserGroup, robot, this.hitStars, null, this );

        this.physics.add.collider(robot, this.platformVorKorridor);
        this.physics.add.collider(robot, this.platformUnterDoor);
        this.physics.add.collider(robot, this.platformTreppe0);
        this.physics.add.collider(robot, this.platformTreppe1);
        this.physics.add.collider(robot, this.platformTreppe2);
        this.physics.add.collider(robot, this.platformTreppe3);
        this.physics.add.collider(robot,this.platformDoor)

        this.physics.add.collider(robot, this.ground);
        this.physics.add.collider(robot, this.leftwall);
        this.physics.add.collider(robot, this.rightwall);
        this.physics.add.collider(robot, this.roof);


        this.robotarray.push(robot);
        robot.anims.play('gegnerAnim2',true);

        this.colliderPlayerRobot7 = this.physics.add.collider(this.player, robot, this.hitRobot, null, this);

        this.allcollider.push(this.colliderPlayerRobot7);

        this.physics.add.overlap(this.laserGroup, robot, this.shootRobot, null, this);


        this.physics.add.overlap(this.laserGroup, this.platformTreppe0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe2, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformTreppe3, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformUnterDoor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformVorKorridor, this.shootWall, null, this);

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
    hitBoss (player, boss) {
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
    shootBoss(laser, boss) {
        //console.log("Treffer");

        this.objective.setText("Objective: go through the Portal");

        boss.disableBody(true, true);

        laser.disableBody(true, true);
        laser.setActive(false);
        laser.setVisible(false);
        this.bossTod = true;
        this.ziel.destroy(true)

        //laser.destroy(true);
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

}
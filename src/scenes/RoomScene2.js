import { CST } from "../CST.js";
import LaserGroup from "../group/LaserGroup.js";
import eventsCenter from "../events/EventsCenter.js";
export default class RoomScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.ROOM2
        })
        this.cursors = null;
        this.player = null;
        //console.log("dsfsafdsaf");
        //this.Objective = true;
        this.robotarray = [];
        this.allcollider = [];
        this.laserGroup = null;
    }
    init (data) {
        this.leben = data.leben
        console.log("INIT IST DA" + this.leben);
    }
    preload() {

    }
    create() {
        this.sound.stopAll();
        this.sound.play("backgroundMusic2", {volume: 0.05});


        this.count = 3;
        this.killCount = 0;
        //console.log(this.count);
        eventsCenter.emit('update-count', this.count);
        //eventsCenter.on('lebenZuRaum2', this.getLeben, this);
        this.add.image(0, 0, "background").setOrigin(0)
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
        this.platformUnterDoor = this.add.tileSprite(32, 320 , 640*2+128+32,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformUnterDoor, true)

        this.platformVorKorridor = this.add.tileSprite(640*2+128+32, 320 , 32,640-64,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformVorKorridor, true)

        this.platformZzRechts0 = this.add.tileSprite(1920-320/2-32, 800 , 320/2,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformZzRechts0, true)

        this.platformZzLinks0 = this.add.tileSprite(1920-640+128+64, 640 , 320/2,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformZzLinks0, true)

        this.platformZzRechts1 = this.add.tileSprite(1920-320/2-32, 640-128-32, 320/2,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformZzRechts1, true)

        this.platformZzLinks1 = this.add.tileSprite(1920-640+128+64, 320 , 320/2,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformZzLinks1, true)

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
            key: 'gegnerAnim',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'doorAnim',
            frames: this.anims.generateFrameNumbers('doorAnim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.physics.add.collider(this.player, this.platformUnterDoor);
        this.physics.add.collider(this.player, this.platformVorKorridor);
        this.physics.add.collider(this.player, this.platformZzRechts0);
        this.physics.add.collider(this.player, this.platformZzLinks0);
        this.physics.add.collider(this.player, this.platformZzRechts1);
        this.physics.add.collider(this.player, this.platformZzLinks1);

        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);

        this.spawnDoor(this.player, "doorAnim");

        this.spawnRobot(this.player, "robot", 1400, 600);
        this.spawnRobot(this.player, "robot", 1200, 650);
        this.spawnRobot(this.player, "robot", 1000, 500);


        this.spawnRobot(this.player, "robot", 200, 100);


        this.objective = this.add.text(1400,50, 'Objective: Kill ' + this.killCount + " of 4",{fontFamily:'dirtyoldtown',fontSize:25})

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

        for (let i = 0; i < this.robotarray.length; i++) {

            if(this.player.x < this.robotarray[i].x) {
                //this.robotarray[i].x -= 1.5;
                this.robotarray[i].setVelocityX(-Phaser.Math.Between(0, 300));
            }else {
                this.robotarray[i].setVelocityX(Phaser.Math.Between(0, 300));
                //this.robotarray[i].x += 1.5;
            }
            if (this.player.y < this.robotarray[i].y){
                this.robotarray[i].setVelocityY(-Phaser.Math.Between(0, 300));
            }
            else {
                this.robotarray[i].setVelocityY(Phaser.Math.Between(0, 300));
                //this.robotarray[i].x += 1.5;
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

            /*if(this.player.y < this.robotarray[i].y) {
                //this.robotarray[i].y -= 2;
            }
            if(this.player.y > this.robotarray[i].y){
                //this.robotarray[i].y += 1;
            }*/


            //const rotation = Phaser.Math.Angle.Between(this.robotarray[i].x, this.robotarray[i].y, this.player.x , this.player.y);

            //this.robotarray[i].setRotation(rotation);
            //console.log(this.collider3[i]);
        }


        /*this.physics.add.overlap(this.laserGroup, this.platformUnterDoor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformVorKorridor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzRechts0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzLinks0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzRechts1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzLinks1, this.shootWall, null, this);*/

        //this.physics.add.overlap(this.laserGroup, this.vplatfrom8, this.shootWall, null, this);

        //this.collider6 = this.physics.add.overlap(this.laserGroup, this.box, this.shootWall, null, this);
        //console.log(this.collider6);

        /*this.physics.add.overlap(this.laserGroup, this.ground, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.leftwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.rightwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);
        */
    }


    spawnRobot(player, robot, xSpawn, ySpawn){
        //robot = this.robots.create(800, 100, 'robot');
        robot = this.physics.add.sprite(xSpawn, ySpawn, 'robot');
        robot.setSize(12,20)
        robot.setOffset(5,15)
        robot.setBounce(1);
        robot.setCollideWorldBounds(true);
        robot.setVelocity(Phaser.Math.Between(0, 400), 20);
        robot.setScale(4)

        this.physics.add.overlap(this.laserGroup, robot, this.hitStars, null, this );

        this.physics.add.collider(robot, this.platformUnterDoor);
        this.physics.add.collider(robot, this.platformVorKorridor);
        this.physics.add.collider(robot, this.platformZzRechts0);
        this.physics.add.collider(robot, this.platformZzLinks0);
        this.physics.add.collider(robot, this.platformZzRechts1);
        this.physics.add.collider(robot, this.platformZzLinks1);

        let colliderTest = this.physics.add.collider(robot, this.box);


        //this.physics.add.collider(robot, this.vplatfrom8);

        this.collider1 = this.physics.add.collider(robot, this.ground);
        this.physics.add.collider(robot, this.leftwall);
        this.physics.add.collider(robot, this.rightwall);
        this.physics.add.collider(robot, this.roof);


        this.robotarray.push(robot);
        robot.anims.play('gegnerAnim',true);

        this.collider2 =this.physics.add.collider(this.player, robot, this.hitRobot, null, this);

        this.allcollider.push(this.collider2);

        this.physics.add.overlap(this.laserGroup, robot, this.shootRobot, null, this);


        this.physics.add.overlap(this.laserGroup, this.platformUnterDoor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformVorKorridor, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzRechts0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzLinks0, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzRechts1, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.platformZzLinks1, this.shootWall, null, this);

        //this.physics.add.overlap(this.laserGroup, this.vplatfrom8, this.shootWall, null, this);

        //this.collider6 = this.physics.add.overlap(this.laserGroup, this.box, this.shootWall, null, this);
        //console.log(this.collider6);

        this.physics.add.overlap(this.laserGroup, this.ground, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.leftwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.rightwall, this.shootWall, null, this);
        this.physics.add.overlap(this.laserGroup, this.roof, this.shootWall, null, this);



    }


    spawnDoor(player,doorAnim) {
        doorAnim = this.physics.add.staticSprite(128, 440-128-56, "doorAnim");
        doorAnim.setSize(32*4,32*4)
        doorAnim.setScale(4)
        this.colliderPlayerDoor4 = this.physics.add.collider(this.player, doorAnim, this.hitDoor,null, this);




    }

    hitDoor(player, doorAnim){
        doorAnim.setPosition(128, 440-128-56)
        if(this.killCount === 4) {
            //this.colliderPlayerDoor4.active = false;
            doorAnim.anims.play('doorAnim', true)
            this.time.addEvent({
                delay: 500,
                callback: ()=>{
                    eventsCenter.emit('update-heart', this.leben);
                    this.sound.play("pling");
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.MENU,);
                },
                loop: false
            });
            //Pause
        }
        //if(this.Objective = true){
        // door.anims.play('doorAnim', true)
        //}
    }
    shootLaser(leftShot){
        this.laserGroup.fireLaser(this.player.x, this.player.y);
    }

    hitRobot (player, robot) {
    if(this.leben <= 1 ){
        this.sound.play("death", {volume: 0.5});
        this.herz1.setVisible(false);
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
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

        this.killCount++;
        this.objective.setText('Objective: Kill ' + this.killCount + " of 4");

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
    }/*
    getLeben(leben) {
        console.log("ZZZZZZZZZZZZZZZZ"+leben);
        this.leben = leben;
    }
*/
}
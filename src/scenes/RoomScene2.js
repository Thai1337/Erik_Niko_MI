import { CST } from "../CST.js";
import LaserGroup from "../group/LaserGroup.js";
export default class RoomScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.ROOM2
        })
        this.cursors = null;
        this.player = null;
        //console.log("dsfsafdsaf");
    }
    init() {

    }
    preload() {

    }
    create() {
        this.laserGroup = new LaserGroup(this);
        this.add.image(0, 0, "background").setOrigin(0)
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
        /*
        this.anims.create({
            key: 'gegnerAnim',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
         */

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
    spawnDoor(player,doorAnim) {
        doorAnim = this.physics.add.staticSprite(128, 440-128-56, "doorAnim");
        doorAnim.setSize(32*4,32*4)
        doorAnim.setScale(4)
        this.colliderPlayerDoor4 = this.physics.add.collider(this.player, doorAnim, this.hitDoor,null, this);




    }

    hitDoor(player, doorAnim){
        doorAnim.setPosition(128, 440-128-56)
        if(this.colliderPlayerDiamond5 == true) {
            //this.colliderPlayerDoor4.active = false;
            doorAnim.anims.play('doorAnim', true)
            //Pause
            this.scene.start(CST.SCENES.MENU);
        }
        //if(this.Objective = true){
        // door.anims.play('doorAnim', true)
        //}
    }
    shootLaser(leftShot){
        this.laserGroup.fireLaser(this.player.x, this.player.y);
    }

}
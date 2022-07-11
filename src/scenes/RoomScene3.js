import { CST } from "../CST.js";
import LaserGroup from "../group/LaserGroup.js";
export default class RoomScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.ROOM3
        })
        this.cursors = null;
        this.player = null;
        console.log("dsfsafdsaf");
    }

    init() {

    }
    preload() {

    }
    create() {
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
        this.platformUnterDoor = this.add.tileSprite(32, 320 , 1920-64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformUnterDoor, true)

        this.platformTreppe0 = this.add.tileSprite(256, 896 , 256-64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe0, true)

        this.platformTreppe1 = this.add.tileSprite(256*3-64, 736 , 256-64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe1, true)

        this.platformTreppe2 = this.add.tileSprite(256*5-128, 608 , 256-64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe2, true)

        this.platformTreppe3 = this.add.tileSprite(256*6-64, 512 , 256-64,32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformTreppe3, true)

        this.platformVorKorridor = this.add.tileSprite(256*6+128, 320+128+64 , 32,640-32,"ground3").setOrigin(0).setScrollFactor(0);
        this.physics.add.existing(this.platformVorKorridor, true)

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
        //raum
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.leftwall);
        this.physics.add.collider(this.player, this.rightwall);
        this.physics.add.collider(this.player, this.roof);

        this.spawnDoor(this.player, "doorAnim");
        this.spawnPortal(this.player,"portalAnim","portalAnim");
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

        if (this.spaceBar.isDown) {
            console.log("Space bar is down");
            this.shootLaser(this.player.flipX);
        }

    }
    spawnDoor(player,doorAnim) {
        doorAnim = this.physics.add.staticSprite(1920-256-32, 440-128-56, "doorAnim");
        doorAnim.setSize(32*4,32*4)
        doorAnim.setScale(4)
        this.colliderPlayerDoor4 = this.physics.add.collider(this.player, doorAnim, this.hitDoor,null, this);
    }

    hitDoor(player, doorAnim){
        //doorAnim.setPosition(992-64, 440-128-56)
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

    spawnPortal(player,portalAnim,portalAnim2) {
        portalAnim = this.physics.add.staticSprite(1920-128, 950, "portalAnim");
        portalAnim.anims.play("portalAnim",true)
        portalAnim.setSize(32*4,32*4)
        portalAnim.setScale(4)

        this.colliderPlayerPortal = this.physics.add.collider(this.player, portalAnim, this.hitPortal,null, this);
    }

    hitPortal(player, portalAnim,portalAnim2){
        portalAnim.setPosition(1920-128, 950)
            console.log("HITP")

        player.x = 100
        player.y = 100
        //if(this.Objective = true){
        // door.anims.play('doorAnim', true)
        //}
    }

}
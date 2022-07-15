export default class LaserGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        // Call the super constructor, passing in a world and a scene
        super(scene.physics.world, scene);
        // Initialize the group
        //this._leftShot = false;
        this.createMultiple({
            // This is the class we create just below
            frameQuantity: 30, // Create 30 instances in the pool
            active: false,
            visible: false,
            key: 'laser',
            classType: Laser,
        })
    }
    fireLaser(x, y) {
        // Get the first available sprite in the group
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y);
        }
    }

    fireDirection(shootLeft) {

        //const laser = this.getFirstDead(false);

        for (let i = 0; i < 300; i++) {
            const laser = this.getFirstNth(i, false, false);
            if(laser){
                laser.leftShot = shootLeft;
            }
        }



    }

}


class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
        scene.add.existing(this);
        this.setDepth(10);
        this.setScale(4)
        this.shootLeft = false;
    }

    set leftShot(value) {
        this._leftShot = value;
    }

    /*preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }*/

    fire(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.enableBody();

        this.body.reset(x, y);
        this.body.setAllowGravity(false);

        if(this._leftShot) {
            console.log("LINKS SSSSS");
            this.setVelocityX(-900);
        }else{
            console.log("RECHTS SSSSS");
            this.setVelocityX(900);
        }

    }
}
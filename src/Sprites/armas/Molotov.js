class Molotov extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x , y) {
        /*
        super ({
            ...config,
        }
        */

        super(scene, x, y, 'molotov');
    }

    animation () {
        this.rotation += 0.1
    }

    fire (velocidad, dano, enemigos) {

        this.body.reset(this.scene.userContainer.x +20, this.scene.userContainer.y)
        this.setScale(0.1);

        this.setActive(true)
        this.setVisible(true)
        // console.log("Tiro cuchillo")

        if (!(this.scene.direction['horizontal'] === 0 && this.scene.direction['vertical'] === 0)) {
            this.setVelocityX(this.scene.direction['horizontal'] * velocidad);
            this.setVelocityY(this.scene.direction['vertical'] * velocidad);
        } else {
            this.setVelocityX(1 * velocidad);
            this.setVelocityY(0 * velocidad);
        }

        this.scene.physics.add.overlap(this, enemigos,(self, enemy)=>{
            enemy.recibirDano(dano, this.scene.addGems, this.scene)
            self.setActive(false);
            self.setVisible(false);
            this.scene.physics.world.disable(self);
        })
        this.setCollideWorldBounds(true);

        // Turning this on will allow you to listen to the 'worldbounds' event
        this.body.onWorldBounds = true;

        // 'worldbounds' event listener
        this.body.world.on('worldbounds', function(body) {
        // Check if the body's game object is the sprite you are listening for
        if (body.gameObject === this) {
            // Stop physics and render updates for this object
            this.setActive(false);
            this.setVisible(false);
        }
        }, this);
    }

}
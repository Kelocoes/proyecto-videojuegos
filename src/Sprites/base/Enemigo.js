class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.posx, config.posy, config.key);

        // Añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // vida
        this.maxHP = config.maxHP;
        this.hp = this.maxHP;

        // velocidad
        this.velocidad = config.velocidad
    }

    // getters
    getVelocidad () {
        return this.velocidad;
    }

    // setters

    setVelocidad (vel) {
        this.velocidad = vel;

    }

    // funciones de muerte o ataque ...
}
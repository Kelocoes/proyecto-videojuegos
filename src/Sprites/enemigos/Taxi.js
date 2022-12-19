class Taxi extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.posx, config.posy, config.key);

        // Añade al objeto "Enemigo" las fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // config - vida
        this.maxHP = 50;
        this.hp = this.maxHP;

        // config-velocidad
        this.velocidad = 50;

        // propiedades - tamaño, respecto al png

        this.body.setSize(80, 42.2);

        this.setScale(0.1);
    }

    // getters
    getVelocidad () {
        return this.velocidad;
    }

    // setters

    setVelocidad (vel) {
        this.velocidad = vel;

    }
    // funciones de atacar y recibir daño...
}
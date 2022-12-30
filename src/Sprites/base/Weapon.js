class Weapon extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.posx, config.posy, config.key);

        // añade fisicas de la escena
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        // El jugador no ha conseguido el arma
        this.status = config.status;

        // velocidad del arma
        this.velocidad = config.velocidad;
        this.spawningVel = config.spawningVel;

        // dano del arma
        this.dano = config.dano;
    }

    // getters
    getDano () {
        return this.dano;
    }

    getStatus () {
        return this.status;
    }

    getVelocidad () {
        return this.velocidad;
    }

    getSpawningVel () {
        return this.spawningVel;
    }

    getX () {
        return config.posx;
    }

    getY () {
        return config.posy;
    }

    // setters

    setStatus (value) {
        this.status = value;
    }

    setVelocidad (value) {
        this.velocidad = value;
    }

    setSpawningVel (value) {
        this.spawningVel = value;

    }

}
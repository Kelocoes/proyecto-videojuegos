class WeaponGroup extends Phaser.Physics.Arcade.Group{
    constructor(config) {
        super(
            config.scene.physics.world,
            config.scene
            );
        // añade fisicas de la escena

        this.scene = config.scene
        this.posx = config.posx
        this.posy = config.posy
        this.key = config.key
        
        // El jugador no ha conseguido el arma
        this.status = config.status;

        // velocidad del arma
        this.velocidad = config.velocidad;
        this.spawningVel = config.spawningVel;

        // dano del arma
        this.dano = config.dano;

        this.enemigos = config.enemigos

        // this.scene.physics.world.enable(this);
        // this.scene.add.existing(this);

        this.createMultiple({
            frameQuantity: 1,
            key: this.key,
            active: false,
            visible: false,
            classType: config.weaponType
        });
    }

    fire () {
        if(this.children !== undefined ){
            const weapon = this.getFirstDead(true);
            if (weapon) {
                weapon.fire(this.velocidad, this.dano, this.enemigos)
                this.scene.physics.world.enable(weapon);
                this.scene.time.addEvent({ delay: this.spawningVel, callback: this.fire, callbackScope: this });
            }   
        }
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
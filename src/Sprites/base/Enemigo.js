class Enemigo extends Phaser.Physics.Arcade.Sprite {
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

        //Daño
        this.dano =config.dano
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
    getDano(){
        return this.dano;
    }

    recibirDano(dano){
        this.hp -= dano
        if(this.hp<=0){
            this.destroy()
        } 
    }
}
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
    // retorna el dano del enemigo
    getDano(){
        return this.dano;
    }

    // recibe el dano
    recibirDano(dano, funcionGema, self){
        this.dmg_animation() // realiza la animacion del daño

        this.hp -= dano
        if(this.hp<=0){
            funcionGema(this.body.position.x, this.body.position.y, self)
            this.destroy()
        }
    }

    dmg_animation() {
        const startColor  = Phaser.Display.Color.ValueToColor(0xffffff) // blanco
        const endColor = Phaser.Display.Color.ValueToColor(0xff0000) // rojo
        config.scene[2].tweens.addCounter({
            from: 0,
            to: 100,
            duration: 100,
            repeat: 2,
            yoyo: true,
            onUpdate: tween => {
                const value = tween.getValue()
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    startColor,
                    endColor,
                    100,
                    value
                )

                const color = Phaser.Display.Color.GetColor(
                    colorObject.r,
                    colorObject.g,
                    colorObject.b,
                )
                this.setTint(color)
            }
        })

    }

    turn_around(pla_posx) {
        if (pla_posx <= this.body.position.x) {
            this.setFlipX(false)
        } else {
            this.setFlipX(true)
        }
    }
}
class Taxi extends Enemigo {
    constructor (config) {
        super ({
            ...config,
            maxHP: 50,
            velocidad: 100,
            dano: 0.1
        })

        this.body.setSize(200, 200);
        this.setScale(0.1);
    }

    // funciones de atacar y recibir daño...

}
class Taxi extends Enemigo {
    constructor (config) {
        super ({
            ...config,
            maxHP: 50,
            velocidad: 50,
        })

        this.body.setSize(80, 42.2);
        this.setScale(0.1);
    }

    // funciones de atacar y recibir daño...
}
class Taxi extends Enemigo {
    constructor (config) {
        super ({
            ...config,
            maxHP: 70,
            velocidad: 200,
            dano: 0.3
        })

        this.body.setSize(200, 200);
        this.setScale(0.1);
    }
}
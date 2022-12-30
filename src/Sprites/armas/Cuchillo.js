class Cuchillo extends Weapon {
    constructor (config) {
        super ({
            ...config,
            dano: 25,
            status: true,
            velocidad: 400,
            spawningVel: 1000
        })

        this.setScale(0.1);
    }
}
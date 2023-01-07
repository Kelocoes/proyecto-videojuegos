class Ganar extends Phaser.Scene {
    constructor () {
        super({key: 'ganar'});
        this.bg = undefined;
    }

    preload() {
        this.load.image('bgEnd', 'assets/img/scene/perder.png');
    }

    create () {
        this.bg = this.add.image(400, 300, 'bgEnd');
        this.title = this.add.text(80,150, "¡Has ganado!", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(100)
        this.add.text(350,330, "Victoria camarada", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(20)
    } 


}
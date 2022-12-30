class Ganar extends Phaser.Scene {
    constructor () {
        super({key: 'ganar'});
        this.bg = undefined;
    }

    preload() {
        this.load.image('bgEnd', 'assets/img/scene/ganar.png');
    }

    create () {
        this.bg = this.add.image(400, 300, 'bgEnd');
        this.title = this.add.text(100,150, "¡Has ganado!", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(100)
    } 


}
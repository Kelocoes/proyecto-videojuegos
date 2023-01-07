class Perder extends Phaser.Scene {
    constructor () {
        super({key: 'perder'});
        this.bg = undefined;
    }

    preload() {
        this.load.image('fotoperder', 'assets/img/scene/ganar.png');
    }

    create () {
        this.bg = this.add.image(400, 300, 'fotoperder');
        this.title = this.add.text(70,150, "¡Has perdido!", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(100)
        this.add.text(350,330, "Cali ha conservado la paz", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(20)
    } 
}
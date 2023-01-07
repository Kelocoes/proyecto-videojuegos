class Init extends Phaser.Scene {
    constructor () {
        super({key: 'init'});
    }

    preload() {
    }

    create () {
        this.add.text(3000,3000, "", { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(20)

        this.pass()
    } 

    pass () {
        this.scene.start('menu')
    }


}
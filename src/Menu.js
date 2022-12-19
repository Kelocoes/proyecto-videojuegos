class Menu extends Phaser.Scene {

    contructor () {
        this.bg = undefined;
        this.button = undefined;
        this.title = undefined;
    }

    preload () {
        this.load.image('fondoMenu','assets/img/scene/fondoMenu.jpg')
        this.load.image('playButton', 'assets/img/scene/playButton.png')
    }

    create () {
        this.bg = this.add.image(400,300,'fondoMenu')

        this.title = this.add.text(200,100, "Cali Survivors", { fontFamily : 'pixelicWar', fill: '#00000'}).setFontSize(70)


        this.button = this.add.image(400,300, 'playButton')
        this.button.setScale(0.3)
        this.button.setInteractive()
        this.button.on('pointerdown', this.start)
        // this.button.on('pointerover',this.over);

    }

    over () {
        console.log("Si estoy encima")
    }

    start() {
        // console.log("Si funciona")
        this.scene.start('juego')
    }

    exit(){

    }
}
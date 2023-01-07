class Inventario extends Phaser.Scene {
    constructor () {
        super({key: 'inventario'});
        this.book = undefined
        this.graphics = undefined
        this.zones = []
    }


    preload() {
        this.load.image('book', 'assets/img/scene/Book.png')
    }

    create (data) {
        self = this
        this.book = this.add.image(400, 350, 'book');
        this.book.setScale(0.85)

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0x000000);


        for (let i = 0; i < data.objetos.length; i++) {
            if (data.objetos[i].length !== 0) {
                this.add.text(310,160 + i * 70, data.objetos[i][data.objetos[i].length - 1].title, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(25)
                this.add.text(310,185 + i * 70, data.objetos[i][data.objetos[i].length - 1].description, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(15)
                this.zones.push(this.add.zone(300, 160 + i * 70, 220, 50).setOrigin(0).setName({ id : data.objetos[i][data.objetos[i].length - 1].id, pos: i}).setRectangleDropZone( 220, 50))
                this.graphics.strokeRect(this.zones[i].x , this.zones[i].y , this.zones[i].input.hitArea.width, this.zones[i].input.hitArea.height)
            }
        }

        this.input.keyboard.on('keydown-ESC', function (event) {
            self.scene.resume('juego')
            data.scene.musica.resume()
            self.scene.remove('inventario')
        });
    }   



}
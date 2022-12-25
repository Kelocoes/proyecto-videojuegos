class Inventario extends Phaser.Scene {
    constructor () {
        super({key: 'inventario'});
        this.bg = undefined
        this.graphics = undefined
        this.zones = []
    }


    preload() {
        this.load.image('bg', 'assets/img/scene/selectionbg.png')
    }

    create (data) {
        self = this
        this.bg = this.add.image(400, 300, 'bg');
        this.bg.setScale(0.5)

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xffffff);


        for (let i = 0; i < data.objetos.length; i++) {
            if (data.objetos[i].length !== 0) {
                this.add.text(250,150 + i * 70, data.objetos[i][0].title, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(25)
                this.add.text(250,185 + i * 70, data.objetos[i][0].description, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(15)
                this.zones.push(this.add.zone(245, 150 + i * 70, 270, 60).setOrigin(0).setName({ id : data.objetos[i][0].id, pos: i}).setRectangleDropZone( 270, 60))
                this.graphics.strokeRect(this.zones[i].x , this.zones[i].y , this.zones[i].input.hitArea.width, this.zones[i].input.hitArea.height)
            }
        }
    }   



}
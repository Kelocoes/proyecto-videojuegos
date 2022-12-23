class SeleccionObjeto extends Phaser.Scene {
    constructor () {
        super({key: 'seleccion'});
        this.bg = undefined
        this.objects = undefined
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

        this.random()

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            console.log(gameObject.name)
            data.objetos.push(gameObject.name)
            self.scene.resume('juego')
            self.scene.remove('seleccion')
        });

        this.input.on('gameobjectover', function (pointer, gameObject) {
            self.graphics.lineStyle(2, 0x0000000);
            self.graphics.strokeRect(self.zones[gameObject.name.pos].x , self.zones[gameObject.name.pos].y , self.zones[gameObject.name.pos].input.hitArea.width, self.zones[gameObject.name.pos].input.hitArea.height)
        });

        this.input.on('gameobjectout', function (pointer, gameObject) {
            self.graphics.lineStyle(2, 0xffffff);
            self.graphics.strokeRect(self.zones[gameObject.name.pos].x , self.zones[gameObject.name.pos].y , self.zones[gameObject.name.pos].input.hitArea.width, self.zones[gameObject.name.pos].input.hitArea.height)
        });
    } 

    random() {

        this.objetos = [
            {  
                levelMax: 5,
                title: 'Arma1',
                description: 'Desc1',
            }, 
            {  
                levelMax: 4,
                title: 'Arma2',
                description: 'Desc2',
            },
            {  
                levelMax: 3,
                title: 'Arma3',
                description: 'Desc3',
            }
        ]

        this.objetos.sort( () => Math.random() - 0.5)

        for (let i = 0; i < this.objetos.length; i++) {
            this.add.text(250,150 + i * 70, this.objetos[i].title, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(25)
            this.add.text(250,185 + i * 70, this.objetos[i].description, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(15)
            this.zones.push(this.add.zone(245, 150 + i * 70, 270, 60).setOrigin(0).setName({ objetos : this.objetos[i], pos: i}).setInteractive().setRectangleDropZone( 270, 60))
            this.graphics.strokeRect(this.zones[i].x , this.zones[i].y , this.zones[i].input.hitArea.width, this.zones[i].input.hitArea.height)
        }
    }
}
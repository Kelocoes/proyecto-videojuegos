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

        // console.log(data)
        this.random(data)

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            // console.log(gameObject.name)
            for(let i=0; i< data.scene.weapons.length ; i++) {
                if (data.scene.weapons[i].length !== 0 ) {
                    data.scene.weapons[i].destroy()
                }
            }
            data.instancia.updateObjetosJugador(gameObject.name)
            data.scene.cargaDeObjetos()
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

    random(data) {

        this.objetos = data.instancia.objetos

        this.objetos.sort( () => Math.random() - 0.5)

        var cantObjetos;
        if (this.objetos.length > 3) {
            cantObjetos = 3
        } else {
            cantObjetos = this.objetos.length
        }

        for (let i = 0; i < cantObjetos; i++) {
            this.add.text(250,150 + i * 70, this.objetos[i][0].title, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(25)
            this.add.text(250,185 + i * 70, this.objetos[i][0].description, { fontFamily : 'neuepixelsans', fill: '#000000'}).setFontSize(15)
            this.zones.push(this.add.zone(245, 150 + i * 70, 270, 60).setOrigin(0).setName({ id : this.objetos[i][0].id, pos: i}).setInteractive().setRectangleDropZone( 270, 60))
            this.graphics.strokeRect(this.zones[i].x , this.zones[i].y , this.zones[i].input.hitArea.width, this.zones[i].input.hitArea.height)
        }
    }


}
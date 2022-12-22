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


class Juego extends Phaser.Scene {
    
    constructor () {
        super({key: 'juego'});
        this.bd = undefined;
        this.timeText = undefined;
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.worldSizeWidth = 2000;
        this.worldSizeHeigth = 2000;
        this.objetos = [];
    }


    preload () {
        this.load.image('piso', 'assets/img/scene/floorTile2.png');
        this.load.spritesheet('user','assets/img/player/Capuchirri.png',{frameWidth: 128,frameHeight:130,endFrame:1})
        this.load.image('bag', 'assets/img/scene/bag.png')
    }

    create () {
        //Se crea la camara con posicion x, y, width y height bounds
        this.cameras.main.setBounds(0, 0, this.worldSizeWidth, this.worldSizeHeigth);
        //Se crea los bordes del mundo x, y, width y height
        this.physics.world.setBounds(0, 0, this.worldSizeWidth, this.worldSizeHeigth)

        //Se pone en el centro del mundo el personaje
        this.bg = this.add.tileSprite(this.worldSizeWidth/2, this.worldSizeHeigth/2, this.worldSizeWidth, this.worldSizeHeigth, 'piso');
        //Se agrega el jugador a las fisicas del juego
        this.player = this.physics.add.sprite(this.worldSizeWidth/2, this.worldSizeHeigth/2, 'user')
        this.player.setScale(0.4)

        this.anims.create({
            key: 'mover',
            frames: this.anims.generateFrameNumbers('user'),
            frameRate: 6,
            repeat: -1,
        });

        this.player.play('mover');
        //Se agregan colisiones con el borde del mundo
        this.player.setCollideWorldBounds(true);
        //Se sigue al personaje con la camara
        this.cameras.main.startFollow(this.player);

        this.time.addEvent({ delay: 1000, callback:this.addTime, callbackScope: this, loop: true });

        this.cursors = this.input.keyboard.createCursorKeys();
        //Se asigna scrollFactor 0 para no mover el texto con la camara
        this.timeText = this.add.text(20,20, this.gameTime, { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(45).setScrollFactor(0);


        this.buttonH = this.add.image(770,570, 'bag').setScrollFactor(0)
        this.buttonH.setScale(0.1)
        this.buttonH.setInteractive()
        this.buttonH.on('pointerdown', () => this.lista())
    } 

    update () {
        this.movementKeys()

    }

    lista () {
        console.log(this.objetos)

    }

    movementKeys () {
        //Se realizan movimientos del personaje por medio de velocidades ya que hace parte de las fisicas
        //Se mueve como un vector
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.setFlipX(true);

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.setFlipX(false);
        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-300);

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);

        }
    }

    addTime(){

        this.gameTimeSec += 1;
        // console.log(this.gameTimeSec)
        if (this.gameTimeSec > 59) {
            this.gameTimeSec = 0
            this.gameTimeMin += 1
            //this.scene.pause('juego')
            //this.scene.launch('seleccion')
        } else if (this.gameTimeSec === 3) {
            this.scene.pause('juego')
            this.scene.add('seleccion', SeleccionObjeto, true, { objetos : this.objetos });
        } 

        this.timeText.setText(this.gameTimeMin +' : '+ this.gameTimeSec)


    }

}
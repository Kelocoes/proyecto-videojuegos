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
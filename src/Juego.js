
class Juego extends Phaser.Scene {

    constructor () {
        super({key: 'juego'});
        this.bd = undefined;
        this.timeText = undefined;
        this.levelNumber = undefined
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.worldSizeWidth = 2000;
        this.worldSizeHeigth = 2000;

        //Contenedor del jugador y su barra de vida
        this.userContainer = undefined;
        //Se inicializa la barra de vida 
        this.healthBar =undefined;
        this.healthBarX =  undefined;
        this.healthBarY =  undefined;
        this.healthValue = 100;
        this.p = 76 / 100;
        //Enemigo de prueba 
        this.enemy = undefined 

        //Exp variables
        this.gems = 0
        this.level = 1
        this.levelResistance = 10
        this.exp = undefined
        this.objetos = [];
        this.enemigos = undefined;
    }


    preload () {
        this.load.image('gem','assets/img/scene/diamond.png')
        this.load.image('piso', 'assets/img/scene/floorTile2.png');
        this.load.spritesheet('user','assets/img/player/Capuchirri.png',{frameWidth: 128,frameHeight:130,endFrame:1})
        this.load.image('bag', 'assets/img/scene/bag.png')
        this.load.image('taxi', 'assets/img/player/taxi.png');
    }

    create () {
        //Se crea la camara con posicion x, y, width y height bounds
        this.cameras.main.setBounds(0, 0, this.worldSizeWidth, this.worldSizeHeigth);
        //Se crea los bordes del mundo x, y, width y height
        this.physics.world.setBounds(0, 0, this.worldSizeWidth, this.worldSizeHeigth)

        //Se pone en el centro del mundo el personaje
        this.bg = this.add.tileSprite(this.worldSizeWidth/2, this.worldSizeHeigth/2, this.worldSizeWidth, this.worldSizeHeigth, 'piso');

        //Se agrega el jugador - La posición 0,0 corresponde con la posición del jugador dentro del contenedor
        this.player = this.add.sprite(0, 0, 'user')
        this.player.setScale(0.4)
        
        //Se agrega enemigo de prueba 
        this.enemy = this.physics.add.sprite(this.worldSizeWidth/2+100, this.worldSizeWidth/2, 'user')
        this.enemy.setScale(0.5)

        //Se crea la barra de vida del jugador
        //Crea un objeto graphics para dibujar la barra 
        this.healthBar = new Phaser.GameObjects.Graphics(this);
        //Posición de la barra respecto al jugador
        this.healthBarX = this.player.x - 38
        this.healthBarY = this.player.y + 35
        this.drawHB(); 
        this.add.existing(this.healthBar);
        
    
        //Se crea el contenedor y se adicionan el usuario y la barra de vida dentro de él
        this.userContainer = this.add.container(this.worldSizeWidth/2,this.worldSizeWidth/2);
        this.userContainer.setSize(30, 30);


        this.userContainer.add(this.player)
        this.userContainer.add(this.healthBar)
        
        //Se le agrega la fisica 
        this.physics.add.existing(this.userContainer);
        this.userContainer.body.setCollideWorldBounds(true);


        this.anims.create({
            key: 'mover',
            frames: this.anims.generateFrameNumbers('user'),
            frameRate: 6,
            repeat: -1,
        });

        this.player.play('mover');

        //Se sigue al personaje con la camara
        this.cameras.main.startFollow(this.userContainer);

        this.time.addEvent({ delay: 1000, callback:this.addTime, callbackScope: this, loop: true });

        this.cursors = this.input.keyboard.createCursorKeys();
        //Se asigna scrollFactor 0 para no mover el texto con la camara
        this.timeText = this.add.text(20,20, this.gameTime, { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(45).setScrollFactor(0);

        //Revisa si el jugador y el enemigo se superponen. Dado el caso, resta puntos de vida.
        this.physics.add.overlap(this.userContainer, this.enemy,()=>{ console.log("auch"); this.decreaseHB(0.1)}, null, this  )


        this.levelNumber = this.add.text(720,20, this.level, { fontFamily : 'pixelicWar', fill: '#1944c9'}).setFontSize(45).setScrollFactor(0);
        this.exp = new expBar(this,450,33,this.levelResistance, this.gems)
        
        this.addGems(950,950)
        this.addGems(900,900)
        this.addGems(850,850)
        this.addGems(800,800)
        this.addGems(750,750)
        this.addGems(700,700)
        this.addGems(600,600)
        this.addGems(650,650)
        this.addGems(500,500)
        this.addGems(550,550)

        this.addGems(1950,1950)
        this.addGems(1900,1900)
        this.addGems(1850,1850)
        this.addGems(1800,1800)
        this.addGems(1750,1750)
        this.addGems(1700,1700)
        this.addGems(1600,1600)
        this.addGems(1650,1650)
        this.addGems(1500,1500)
        this.addGems(1550,1550)
        this.addGems(1450,1450)
        
        this.buttonH = this.add.image(770,570, 'bag').setScrollFactor(0)
        this.buttonH.setScale(0.1)
        this.buttonH.setInteractive()
        this.buttonH.on('pointerdown', () => this.lista())

        this.enemigos = this.physics.add.group()
        // Spawn de enemigo: Taxi:
        for (let i = 0; i < 5; i++) {
            let taxi = new Taxi({scene: this, posx: 1000+ (i*100), posy: 1000+ (i*100), key: 'taxi'})
            this.enemigos.add(taxi);
        }

        this.physics.add.collider(this.enemigos, this.enemigos);
        this.physics.add.collider(this.userContainer, this.enemigos);
        
        this.objetosInstancia = new Objetos() 
    } 

    update () {
        this.movementKeys()
        this.enemigosSigue()
        this.levelUp()
    }

    enemigosSigue () {
        for (let i = 0; i < this.enemigos.getChildren().length; i++) {
            this.physics.moveToObject(this.enemigos.getChildren()[i], this.userContainer, this.enemigos.getChildren()[i].getVelocidad());

            // console.log(this.enemigos.getChildren()[i], this.enemigos.getChildren()[i].getVelocidad(), 'POR QUE NO FUNCIONAAA');
        }
    }

    lista () {
        console.log(this.objetos)

    }

    movementKeys () {
        //Se realizan movimientos del personaje por medio de velocidades ya que hace parte de las fisicas
        //Se mueve como un vector

        this.userContainer.body.setVelocity(0)
        

        if (this.cursors.left.isDown) {
            this.player.setFlipX(true);
            this.userContainer.body.velocity.x =-300;
            
       
        } else if (this.cursors.right.isDown) {
            this.player.setFlipX(false);
            this.userContainer.body.velocity.x =300;
        }

        if (this.cursors.up.isDown){
            this.userContainer.body.velocity.y =-300;
            

        } else if (this.cursors.down.isDown) {
            this.userContainer.body.velocity.y =300;

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
        }

        this.timeText.setText(this.gameTimeMin +' : '+ this.gameTimeSec)
    }

    addGems(x,y){

        var gem = this.physics.add.sprite(x,y,'gem')
        this.physics.add.overlap(this.userContainer,gem,()=>{this.catchGem(gem)}, null,this )
        gem.setScale(0.15)

    }

    catchGem(gem){
        gem.destroy()
        this.gems = this.gems + 1

        this.exp.updateBar(this.gems, this.levelResistance)
    }

    levelUp(){
        if(this.gems === this.levelResistance){

            this.gems = 0
            this.levelResistance = Math.ceil(this.levelResistance + this.levelResistance*0.05)
            this.level = this.level + 1
            this.levelNumber.setText(this.level)

            this.exp.updateBar(this.gems, this.levelResistance)

            console.log(this.gems,this.levelResistance,this.level)

            this.scene.pause('juego')
            this.scene.add('seleccion', SeleccionObjeto, true, { instancia : this.objetosInstancia,  });

        }
    }

    decreaseHB (amount)
    {
        this.healthValue -= amount;

        if (this.healthValue < 0)
        {
            this.healthValue = 0;
        }

        this.drawHB();

        return (this.healthValue === 0);
    }

    drawHB ()
    { 
        this.healthBar.clear();

        //  BG
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(this.healthBarX, this.healthBarY, 80, 12);

        //  Health

        this.healthBar.fillStyle(0xffffff);
        this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, 76, 8);

        if (this.healthValue < 30)
        {
            this.healthBar.fillStyle(0xff0000);
        }
        else
        {
            this.healthBar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.healthValue);

        this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, d, 8);
    }

}



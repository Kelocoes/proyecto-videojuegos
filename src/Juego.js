
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


        //Exp variables
        this.gems = 0
        this.level = 1
        this.levelResistance = 10
        this.exp = undefined
        this.objetos = [];

        // Variables de direccion: -1-> arriba, izquierda || 1 -> derecha, abajo || 0 -> No se ha tocado del boton
        this.direction = {'vertical' : 0, 'horizontal': 0}
        this.directionLog = undefined;

        // grupo de enemigos
        this.enemigos = undefined;

        // grupo de armas en el juego
        this.weapons = [];

        this.weaponsListInstances = [,Cuchillo, Papabomba, Molotov]

    }


    preload () {
        this.load.image('gem','assets/img/scene/diamond.png')
        this.load.image('piso', 'assets/img/scene/floorTile2.png')
        this.load.spritesheet('user','assets/img/player/Capuchirri.png',{frameWidth: 128,frameHeight:130,endFrame:1})
        this.load.image('bag', 'assets/img/scene/bag.png')
        this.load.image('taxi', 'assets/img/player/taxi.png')
        this.load.image('cuchillo', 'assets/img/weapons/knife.png')
        this.load.image('papabomba', 'assets/img/weapons/papabomba.png')
        this.load.image('molotov', 'assets/img/weapons/molotov.png')
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
        //this.enemy = this.physics.add.sprite(this.worldSizeWidth/2+100, this.worldSizeWidth/2, 'user')
        // this.enemy.setScale(0.5)

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


        this.addGems(950,950,this)
        this.addGems(900,900, this)
        this.addGems(850,850, this)
        this.addGems(800,800, this)
        this.addGems(750,750, this)
        this.addGems(700,700, this)
        this.addGems(600,600, this)
        this.addGems(650,650, this)
        this.addGems(500,500, this)
        this.addGems(550,550, this)

        this.addGems(1950,1950, this)
        this.addGems(1900,1900, this)
        this.addGems(1850,1850, this)
        this.addGems(1800,1800, this)
        this.addGems(1750,1750, this)
        this.addGems(1700,1700, this)
        this.addGems(1600,1600, this)
        this.addGems(1650,1650, this)
        this.addGems(1500,1500, this)
        this.addGems(1550,1550, this)
        this.addGems(1450,1450, this)

        this.buttonH = this.add.image(770,570, 'bag').setScrollFactor(0)
        this.buttonH.setScale(0.1)
        this.buttonH.setInteractive()
        this.buttonH.on('pointerdown', () => this.lista())

        
        this.enemigos = this.physics.add.group()
        
        // Spawn de enemigo: Taxi: Aqui deberian spawnearse todos los enemigos
        for (let i = 0; i < 5; i++) {
            let taxi = new Taxi({scene: this, posx: 1000+ (i*100), posy: 1000+ (i*100), key: 'taxi'})
            this.enemigos.add(taxi);
        }
        

        //Revisa si el jugador y el enemigo se superponen. Dado el caso, resta puntos de vida.
        this.physics.add.overlap(this.userContainer, this.enemigos,(userContainer,enemy)=>{ console.log("auch"); this.decreaseHB(enemy.getDano())}, null, this  )

        // Colliders:
        this.physics.add.collider(this.enemigos, this.enemigos);
        this.physics.add.collider(this.userContainer, this.enemigos);
        //Se adiciona el arma de prueba del jugador
        // this.weapon = this.add.sprite(this.player.x + 30, this.player.y, 'cuchillo')
        // this.weapon.setScale(0.1)
        // this.userContainer.add(this.weapon)

        this.objetosInstancia = new Objetos() 
        this.objetosInstancia.updateObjetosJugador({ id : 1})
        this.cargaDeObjetos()


        this.timeText = this.add.text(20,20, this.gameTime, { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(45).setScrollFactor(0);

        this.levelNumber = this.add.text(720,20, this.level, { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(45).setScrollFactor(0);
        this.exp = new expBar(this,450,33,this.levelResistance, this.gems)
        // Creacion de arma (s)
        //this.aparecerCuchillo()

    } 

    update () {
        this.movementKeys()
        this.enemigosSigue()
        this.levelUp()
        // this.animacionesArmas()

    }
    
    cargaDeObjetos(){
        this.weapons = []
        for (let i = 0; i < this.objetosInstancia.objetosJugador.length; i ++) {
            this.weapons.push([])
            if (this.objetosInstancia.objetosJugador[i].length !== 0) {
                this.weapons[i] = new WeaponGroup({
                    scene: this, 
                    posx: this.userContainer.x + 20, 
                    posy: this.userContainer.y, 
                    key: this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].name, 
                    dano: this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].dano, 
                    status: this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].status, 
                    velocidad: this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].velocidad, 
                    spawningVel: this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].spawningVel,
                    enemigos: this.enemigos, 
                    weaponType: this.weaponsListInstances[this.objetosInstancia.objetosJugador[i][this.objetosInstancia.objetosJugador[i].length - 1].id]})
                this.weapons[i].fire()
            }
        }
        
        
    }


    animacionesArmas() {
        for (let i = 0; i < this.weapons.getChildren().length; i++) {
            this.weapons.getChildren()[i].animation()
        }
    }

    enemigosSigue () {
        for (let i = 0; i < this.enemigos.getChildren().length; i++) {
            this.physics.moveToObject(this.enemigos.getChildren()[i], this.userContainer, this.enemigos.getChildren()[i].getVelocidad());

            this.enemigos.getChildren()[i].turn_around(this.userContainer.x)
            // console.log(this.enemigos.getChildren()[i], this.enemigos.getChildren()[i].getVelocidad(), 'POR QUE NO FUNCIONAAA');
        }
    }

    lista () {
        console.log(this.objetosInstancia.objetosJugador)
        this.scene.pause('juego')
        this.scene.add('inventario', Inventario, true, { objetos : this.objetosInstancia.objetosJugador });
    }

    movementKeys () {
        //Se realizan movimientos del personaje por medio de velocidades ya que hace parte de las fisicas
        //Se mueve como un vector

        this.userContainer.body.setVelocity(0)

        if(this.directionLog === 'down' || this.directionLog === 'up') {
            this.direction['horizontal'] = 0
        } else {
            this.direction['vertical'] = 0
        }

        if (this.cursors.left.isDown) {
            this.player.setFlipX(true);
            this.userContainer.body.velocity.x =-300;
            this.direction['horizontal'] = -1
            this.directionLog = 'left'
            

        } else if (this.cursors.right.isDown) {
            this.player.setFlipX(false);
            this.userContainer.body.velocity.x =300;
            this.direction['horizontal'] = 1
            this.directionLog = 'right'
        }

        if (this.cursors.up.isDown){
            this.userContainer.body.velocity.y =-300;
            this.direction['vertical'] = -1
            this.directionLog = 'up'


        } else if (this.cursors.down.isDown) {
            this.userContainer.body.velocity.y =300;
            this.direction['vertical'] = 1
            this.directionLog = 'down'
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

        } else if (this.gameTimeMin > 5) {
            this.scene.start('ganar')
        }

        this.timeText.setText(this.gameTimeMin +' : '+ this.gameTimeSec)
    }

    addGems(x,y, self){

        var gem = self.physics.add.sprite(x,y,'gem')
        self.physics.add.overlap(self.userContainer,gem,()=>{self.catchGem(gem)}, null,self )
        gem.setScale(0.10)

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
            this.scene.add('seleccion', SeleccionObjeto, true, { instancia : this.objetosInstancia, scene: this});

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
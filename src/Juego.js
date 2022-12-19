
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

        //Exp variables
        this.gems = 0
        this.level = 1
        this.levelResistance = 10
        this.exp = undefined
        
    }

    preload () {
        this.load.image('gem','assets/img/scene/diamond.png')
        this.load.image('piso', 'assets/img/scene/floor.png')
        this.load.spritesheet('user','assets/img/player/Capuchirri.png',{frameWidth: 128,frameHeight:131,endFrame:1})
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
        this.player.setScale(0.5)

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
        
        
    } 

    update () {
        this.movementKeys()
        this.levelUp()

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
        }
        this.timeText.setText(this.gameTimeMin +' : '+ this.gameTimeSec)


    }

    addGems(x,y){

        var gem = this.physics.add.sprite(x,y,'gem')
        this.physics.add.overlap(this.player,gem,()=>{this.catchGem(gem)}, null,this )
        gem.setScale(0.15)

    }

    catchGem(gem){
        gem.destroy()
        this.gems = this.gems + 1

        this.exp.updateBar(this.gems, this.levelResistance)
        console.log(this.gems)
    }

    levelUp(){
        if(this.gems === this.levelResistance){

            this.gems = 0
            this.levelResistance = Math.ceil(this.levelResistance + this.levelResistance*0.05)
            this.level = this.level + 1
            this.levelNumber.setText(this.level)

            this.exp.updateBar(this.gems, this.levelResistance)

            console.log(this.gems,this.levelResistance,this.level)

        }
    }

}
class Juego extends Phaser.Scene {
    
    constructor () {
        super({key: 'juego'});
        this.bd = undefined;
        this.timeText = undefined;
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
        this.worldSizeWidth = 2000;
        this.worldSizeHeigth = 2000;
       
        this.userContainer = undefined;

        //Se inicializa la barra de vida 
        
        this.healthBar =undefined;
        this.healthBarX =  this.worldSizeWidth/2;
        this.healthBarY =  this.worldSizeWidth/2;
        this.healthValue = 100;
        this.p = 76 / 100;

        //Enemigo de prueba 
        this.enemy = undefined 
        this.rectangle  = undefined
    }

    preload () {
        this.load.image('piso', 'assets/img/scene/floor.png');
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
        //Se agrega la barra de vida del jugador 
        this.healthBar = new Phaser.GameObjects.Graphics(this);
        this.drawHB();
        this.add.existing(this.healthBar);
        this.physics.add.existing(this.healthBar);
        this.healthBar.body.setCollideWorldBounds(true);
        //this.healthBar.body.onWorldBounds = true;
        //this.healthBar.body.allowGravity = false;

        //Se crea el contenedor y se adicionan el usuario y la barra de vida dentro de él
        // this.userContainer = this.add.container(0, 0);
        // this.userContainer.add(this.player, 0, 0)
        // this.userContainer.add(this.healthBar , 0, 0)
        
        // this.userContainer.setSize(65, 65);

        // this.physics.world.enable(this.userContainer);
        //this.physics.add.existing(this.userContainer);
        //this.userContainer.body.setCollideWorldBounds(true);

        //this.userContainer.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

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
        
    } 

    update () {
        this.movementKeys()

    }

    movementKeys () {
        //Se realizan movimientos del personaje por medio de velocidades ya que hace parte de las fisicas
        //Se mueve como un vector
        this.player.setVelocity(0);
        this.healthBar.body.setVelocity(0);
        //this.userContainer.body.setVelocity(0)
       
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.setFlipX(true);
            this.healthBar.moveTo(this.player.x, this.player.y);
            //this.rectangle.setVelocityX(-300);
            //this.userContainer.body.velocity.x =-300;
            
       
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.setFlipX(false);
            this.healthBar.body.setVelocityX(300);
            //this.userContainer.body.velocity.x =300;
        }

        if (this.cursors.up.isDown){
            this.healthBar.body.setVelocityY(-300);
            this.player.setVelocityY(-300);
            //this.userContainer.body.velocity.y =-300;
            

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
            this.healthBar.body.setVelocityY(300);
            //this.userContainer.body.velocity.y =300;

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

    decreaseHB (amount)
    {
        this.healthValue -= amount;

        if (this.healthValue < 0)
        {
            this.healthValue = 0;
        }

        this.draw();

        return (this.healthValue === 0);
    }

    drawHB ()
    { 
        //this.healthBar.clear();

        //  BG
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(this.healthBarX, this.healthBarY, 80, 16);

        //  Health

        this.healthBar.fillStyle(0xffffff);
        this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, 76, 12);

        if (this.healthValue < 30)
        {
            this.healthBar.fillStyle(0xff0000);
        }
        else
        {
            this.healthBar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.healthValue);

        this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, d, 12);
    }

    // damage (amount)
    // {
    //     if (this.hp.decrease(amount))
    //     {
    //         this.alive = false;

    //         this.play(this.color + 'Dead');

    //         (this.color === 'blue') ? bluesAlive-- : greensAlive--;
    //     }
    // }

    // fire ()
    // {
    //     var target = (this.color === 'blue') ? getGreen() : getBlue();

    //     if (target && this.alive)
    //     {
    //         this.play(this.color + 'Attack');

    //         var offset = (this.color === 'blue') ? 20 : -20;
    //         var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

    //         this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

    //         this.scene.tweens.add({
    //             targets: this.missile,
    //             x: targetX,
    //             ease: 'Linear',
    //             duration: 500,
    //             onComplete: function (tween, targets) {
    //                 targets[0].setVisible(false);
    //             }
    //         });

    //         target.damage(Phaser.Math.Between(2, 8));

    //         this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
    //     }
    // }

}



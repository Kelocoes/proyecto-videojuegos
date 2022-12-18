class Juego extends Phaser.Scene {
    constructor () {
        super({key: 'juego'});
        this.bd = undefined;
        this.cursors = undefined;
        this.timeText = undefined;
        this.time = 0;  
        this.gameTimeSec = 0;
        this.gameTimeMin = 0;
    }

    preload() {
        this.load.image('piso', 'assets/img/scene/floorTile1.png');
        this.load.spritesheet('user','assets/img/player/Capuchirri.png',{frameWidth: 128,frameHeight:131,endFrame:1})
    }

    create () {
       
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'piso');
        this.player = this.add.sprite(400, 300, 'user')
        this.player.setScale(0.5)

        this.anims.create({
            key: 'mover',
            frames: this.anims.generateFrameNumbers('user'),
            frameRate: 10,
            repeat: -1,
        });
        this.player.play('mover');

        this.time = this.time.addEvent({ delay: 1000, callback:this.addTime, callbackScope: this, loop: true });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.timeText = this.add.text(20,20, this.gameTime, { fontFamily : 'pixelicWar', fill: '#ffffff'}).setFontSize(45)
    } 

    update(){
        this.movementKeys()

        //this.addTime(time)
        
    }

    movementKeys () {
        if (this.cursors.left.isDown) {
            
            this.bg.tilePositionX -= 8
            this.player.flipX = true
            


        } else if(this.cursors.right.isDown) {
            
            this.bg.tilePositionX += 8
            this.player.flipX = false

        }
        
        if (this.cursors.up.isDown){

            this.bg.tilePositionY -= 8

        }else if(this.cursors.down.isDown){
            
            this.bg.tilePositionY += 8
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

}
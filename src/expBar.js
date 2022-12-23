class expBar {
    constructor(scene,x,y,levelResistance,gems){
        this.x = x
        this.y = y
        this.levelResistance = levelResistance 
        this.gems = gems
        this.bar = new Phaser.GameObjects.Graphics(scene)

        this.draw()

        scene.add.existing(this.bar)
    }
    increase(amount){
        this.gems = this.gems + amount

        if (this.levelResistance <= this.gems){

            this.gems = this.gems + 1
            this.levelResistance = Math.ceil(this.levelResistance + this.levelResistance*0.05)
        }
        this.draw()
    }

    updateBar(gems,levelResistance){
        this.gems = gems
        this.levelResistance = levelResistance
        this.draw()
    }

    draw(){

        this.bar.clear()
        this.bar.setScrollFactor(0)

        //BG 

        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 250, 40);

        //  Health

        this.bar.fillStyle(0x1944c9);
        this.bar.fillRect(this.x, this.y, 250*(this.gems/this.levelResistance), 40);


    }

}
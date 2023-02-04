import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys'
import GameScene from '../scenes/GameScene';
var speedx=100;
var life = 3;
var zyc=true;
export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            AssetsKeys.fish
        );
        scene.physics.add.existing(this);
        scene.add.existing(this);

        
        this.speedy = 300;
        
        this.walkingAnim = scene.tweens.add({
            targets: this,
            rotation: { from: -0.05, to: 0.05 },
            duration: 350,
            repeat: -1,
            yoyo: true
        });

    }
    update(cursors)
    {this.body.velocity.x = speedx;
        if(speedx==0){
            this.body.velocity.x = speedx;
            this.body.velocity.y = speedx;
        }
        if(speedx==-500){
            speedx+=1;
            setTimeout(() => speedx=100, 600)
            
        }
        if (life <= 0) {
            this.destroy();
            return;
        }
        if (cursors.left.isDown && speedx>=100){
            speedx=speedx-1;
            this.body.velocity.x = speedx;
            
        } 
        else if (cursors.right.isDown && speedx<=500) {
            this.body.velocity.x = speedx;
            speedx=speedx+2;
        } 

        if (cursors.up.isDown) this.body.velocity.y = -this.speedy;
        else if (cursors.down.isDown) this.body.velocity.y = this.speedy;
        else this.body.velocity.y = 0;
        if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
            this.walkingAnim.pause();
        } else {
            this.walkingAnim.resume();
        }
        
    } 
    hit(){if(zyc==true){
        speedx= -500;
      life=life-1;}
        zyc=false;
        setTimeout(() => zyc=true, 500)
      
      return; 
    }
    konie(){
        speedx=100;
        life = 3;
        zyc=true;
       return; 
   }

    
}
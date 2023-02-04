import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class YouLostScene extends Phaser.Scene{

    constructor(){
        super('youLostScene');
    }

    
    preload(){

        
    }

    create() {
        const width=this.scale.width
        const height=this.scale.height

        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);


        var credits = 'YOU LOST'

        this.add.text( 100, 100, credits,  { fontSize: '26px', fontFamily: "Comic Sans MS" })

        const buttonBack = this.add.image(  width/15, height/15.5, 'buttonB').setName('buttonBack');
        
        buttonBack.setInteractive();
        buttonBack.on('pointerover', () => buttonBack.setTint(0x89dddb) );
        buttonBack.on('pointerout', () => buttonBack.clearTint() );
        buttonBack.on('pointerup', () => this.backToMenu() );

        


      
      }

      backToMenu(){
        eventsCenter.emit('play-bubble');
        this.scene.stop('gameScene');
        this.scene.run('menuScene');
        this.scene.stop();
      }


}


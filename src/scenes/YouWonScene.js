import Phaser from "phaser"
import eventsCenter from "./EventsCenter";
import GameScene from "./GameScene";

export default class YouWonScene extends Phaser.Scene{

    constructor(){
        super('youWonScene');
    }

    
    preload(){

        
    }

    create() {
        const width=this.scale.width
        const height=this.scale.height

        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);


        var credits = 'YOU WON'

        this.add.text( width/2, 200, credits,  { fontSize: '30px', fontFamily: "Comic Sans MS" })

        const buttonRestart = this.add.image( width/2, height/2, 'buttonRS');
        const buttonMenu = this.add.image( width/2, height/2+110, 'buttonM');

        const buttons = [
            buttonRestart,
            buttonMenu
        ];
 

        buttons.forEach( thisbutton => thisbutton.setInteractive() );
        buttons.forEach( thisbutton => thisbutton.on('pointerover', () => this.eventButtonHoverState(thisbutton) ));
        buttons.forEach( thisbutton => thisbutton.on('pointerout', () => this.eventButtonRestState(thisbutton) ));

        buttonRestart.on('pointerup', () => this.backToGame() );
        buttonMenu.on('pointerup', () => this.backToMenu() );
        


      
      }

      eventButtonHoverState(thisbutton){
        thisbutton.setTint(0x89dddb);
      }
 
      eventButtonRestState(thisbutton){
        thisbutton.clearTint();
      }

      backToGame(){
        eventsCenter.emit('play-bubble');
        this.scene.stop('gameScene');
        this.scene.start('gameScene');
        

      }

      backToMenu(){
        eventsCenter.emit('play-bubble');
        this.scene.stop('gameScene');
        this.scene.run('menuScene');
        this.scene.stop();
      }


}

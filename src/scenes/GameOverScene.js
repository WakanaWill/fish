import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

var yourTime;
var yourDistance;

export default class GameOverScene extends Phaser.Scene{

    constructor(){
        super('gameOverScene');
    }

    
    preload(){

    }

    create() {
      const width=this.scale.width
      const height=this.scale.height

      const buttonRestart = this.add.image( width/2, height/2+190, 'buttonRS');
      const buttonMenu = this.add.image( width/2, height/2+380, 'buttonM');

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


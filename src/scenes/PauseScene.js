import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class PauseScene extends Phaser.Scene{

    constructor(){
        super('pauseScene');
    }

    
    preload(){

        
    }

    create() {
        const width=this.scale.width 
        const height=this.scale.height
        
        this.add.image(0,0, 'bgTint').setOrigin(0,0);
 
        this.input.keyboard.on('keydown-P', () => this.backToGame() )

        const buttonBack = this.add.image( width/2, height/2, 'buttonB');
        const buttonMenu = this.add.image( width/2, height/2+190, 'buttonM');
        const buttonOptions = this.add.image( width/2, height/2+190+190, 'buttonO');

        const buttons = [
            buttonBack,
            buttonMenu,
            buttonOptions
        ];

        buttons.forEach( thisbutton => thisbutton.setInteractive() );
        buttons.forEach( thisbutton => thisbutton.on('pointerover', () => this.eventButtonHoverState(thisbutton) ));
        buttons.forEach( thisbutton => thisbutton.on('pointerout', () => this.eventButtonRestState(thisbutton) ));

        buttonBack.on('pointerup', () => this.backToGame() );
        buttonMenu.on('pointerup', () => this.backToMenu() );
        buttonOptions.on('pointerup', () => this.openOptions(buttonOptions) );
  


    }

      eventButtonHoverState(thisbutton){
        thisbutton.setTint(0x89dddb);
      }

      eventButtonRestState(thisbutton){
        thisbutton.clearTint();
      }

      backToMenu(){
        eventsCenter.emit('play-bubble');
        this.scene.stop('gameScene');
        this.scene.start('menuScene');
      }

      backToGame(){
        eventsCenter.emit('play-bubble');
        this.scene.resume('gameScene');
        this.scene.stop();
      }

      openOptions(buttonOptions){
        eventsCenter.emit('play-bubble');
        this.scene.run('optionsScene');
        buttonOptions.clearTint();
        this.scene.sleep();
      }




}
import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class MenuScene extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    

    preload(){
        /*
        this.load.image('bg', '/images/bg.png');
        this.load.image('bg1', '/images/bg1.png');
        this.load.image('bg2', '/images/bg2.png');
        this.load.image('bg3', '/images/bg3.png');
        this.load.image('bg4', '/images/bg4.png');
        this.load.image('bg5', '/images/bg5.png');

        this.load.image('buttonS', '/images/buttonStart.png');
        this.load.image('buttonC', '/images/buttonCredits.png');
        this.load.image('buttonB', '/images/buttonBack.png');

        this.load.audio('menuMusic', '/images/Drowning.mp3');
        */
        
        
    }

    create() {
        const width=this.scale.width
        const height=this.scale.height

        this.add.image(0, 0, 'bg').setOrigin(0,0);
        this.add.image(0, 0, 'bg1').setOrigin(0,0);
        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);
        this.add.image(0, 0, 'bg4').setOrigin(0,0);
        this.add.image(0, 0, 'bg5').setOrigin(0,0);

        var bubbleSound = this.sound.add('bubble');


        const buttonStart = this.add.image( width/2, height/2, 'buttonS');
        const buttonOptions = this.add.image( width/2, height/2+110, 'buttonO');
        const buttonCredits = this.add.image( width/2, height/2+220, 'buttonC');
        

        const buttons = [
            buttonStart,
            buttonOptions,
            buttonCredits
        ];

        buttons.forEach( thisbutton => thisbutton.setInteractive() );

        buttons.forEach( thisbutton => thisbutton.on('pointerover', () => this.eventButtonHoverState(thisbutton) ));
        buttons.forEach( thisbutton => thisbutton.on('pointerout', () => this.eventButtonRestState(thisbutton) ));
        buttonStart.on('pointerup', () => this.eventPlayGame() )
        buttonCredits.on('pointerup', () => this.eventCredits() )
        buttonOptions.on('pointerup', () => this.openOptions() )


        if(!this.scene.isActive('musicScene')){
          this.scene.launch('musicScene');
        }
        
        //var music = this.sound.add('menuMusic', {loop: true})
        //music.play();

      }

      eventButtonHoverState(thisbutton){
        thisbutton.setTint(0x89dddb);
      }
 
      eventButtonRestState(thisbutton){
        thisbutton.clearTint();
      }

      eventPlayGame(){
        eventsCenter.emit('play-bubble');
        this.scene.start('gameScene');
      }

      eventCredits(){
        eventsCenter.emit('play-bubble');
        this.scene.launch('creditsScene')
        this.scene.sleep();
      }

      openOptions(){
        eventsCenter.emit('play-bubble');
        this.scene.run('optionsScene');
        this.scene.sleep();
      }


}


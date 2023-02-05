import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class MenuScene extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    

    preload(){
        
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
        const buttonOptions = this.add.image( width/2, height/2+190, 'buttonO');
        const buttonCredits = this.add.image( width/2, height/2+190*2, 'buttonC');

        var title = 'FISH\nHOMECOMING'

        this.add.text( width/2+4, height/4.4+4, title,  { fontSize: '130px', fontFamily: "Comic Sans MS", color: '#72b7b7', align: 'center'}).setOrigin(0.5, 0.5);
        this.add.text( width/2, height/4.4, title,  { fontSize: '130px', fontFamily: "Comic Sans MS", color: '#fff', align: 'center'}).setOrigin(0.5, 0.5);

        var fishL = this.add.image( width/2-300, height/6.5, 'fish');
        var fishR = this.add.image( width/2+300, height/6.5, 'fish');

        fishL.angle = 15;
        fishR.angle = -15;
        fishL.flipX = true;

        

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


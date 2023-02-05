import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class CreditsScene extends Phaser.Scene{

    constructor(){
        super('creditsScene');
    }

    
    preload(){

        
    }

    create() {
        const width=this.scale.width
        const height=this.scale.height

        this.add.image(0, 0, 'bg').setOrigin(0,0);
        this.add.image(0, 0, 'bg1').setOrigin(0,0);
        this.add.image(width, 0, 'end1').setOrigin(1,0);
        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);
        this.add.image(width, 0, 'end2').setOrigin(1,0);
        this.add.image(0, 0, 'bg4').setOrigin(0,0);
        this.add.image(0, 0, 'bg5').setOrigin(0,0);
        this.add.image(width, 0, 'end3').setOrigin(1,0);
        this.add.image(width, 0, 'end4').setOrigin(1,0);
        this.add.image(width, 0, 'end5').setOrigin(1,0);
        this.add.image(width, 0, 'end6').setOrigin(1,0); 
        this.add.image(width, 0, 'end7').setOrigin(1,0);
        this.add.image(width, 0, 'end8').setOrigin(1,0);

        
        
        
        

        var credits = 'code: Łukasz Para,\n         Magdalena Sładczyk,\n         Bartosz Piwowarczyk\n\nart:   Magdalena Sładczyk\n\nbg music by ItsWatR from Pixabay\nbubble sound by Ranner from Pixabay\nhit sound by worthahep88 from freesound'

        //this.add.text( width/8+2, height/7+2, credits,  { fontSize: '50px', fontFamily: "Comic Sans MS", color: '#72b7b7'})
        this.add.text( width/8, height/7, credits,  { fontSize: '50px', fontFamily: "Comic Sans MS" }).setShadow(2,2,'#72b7b7');

        const buttonBack = this.add.image(  width/9.8, height/1.1, 'buttonB').setName('buttonBack');
        
        buttonBack.setInteractive();
        buttonBack.on('pointerover', () => buttonBack.setTint(0x89dddb) );
        buttonBack.on('pointerout', () => buttonBack.clearTint() );
        buttonBack.on('pointerup', () => this.backToMenu() );


      
      }

      backToMenu(){
        eventsCenter.emit('play-bubble');
        this.scene.wake('menuScene');
        this.scene.stop();
      }





}


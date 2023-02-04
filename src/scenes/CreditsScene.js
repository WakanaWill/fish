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
        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);
        this.add.image(0, 0, 'bg4').setOrigin(0,0);
        this.add.image(0, 0, 'bg5').setOrigin(0,0);

        var credits = 'code: Łukasz Para,\n         Bartosz Piwowarczyk,\n         Magdalena Sładczyk\n\nart:   Magdalena Sładczyk\n\nbg music by ItsWatR from Pixabay\nbubble sound by Ranner from Pixabay'

        this.add.text( width/8, height/7, credits,  { fontSize: '50px', fontFamily: "Comic Sans MS" })

        const buttonBack = this.add.image(  width/15, height/1.07, 'buttonB').setName('buttonBack');
        
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


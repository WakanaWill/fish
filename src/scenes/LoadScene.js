import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class LoadScene extends Phaser.Scene{

    constructor(){
        super('loadScene');
    }


    preload(){
        this.load.image('bgTint', '/images/bgTint.png');
        this.load.image('bg', '/images/bg.png');
        this.load.image('bg1', '/images/bg1.png');
        this.load.image('bg2', '/images/bg2.png');
        this.load.image('bg3', '/images/bg3.png');
        this.load.image('bg4', '/images/bg4.png');
        this.load.image('bg5', '/images/bg5.png');
        this.load.image('bg1a', '/images/bg1a.png');
        this.load.image('bg2a', '/images/bg2a.png');
        this.load.image('bg3a', '/images/bg3a.png');
        this.load.image('bg4a', '/images/bg4a.png');
        this.load.image('bg5a', '/images/bg5a.png');
        this.load.image('fish', '/images/fish.png');
        this.load.image('sG0', '/images/stal7.png');
        this.load.image('sG1', '/images/stal8.png');
        this.load.image('sG2', '/images/stal9.png');
        this.load.image('sG3', '/images/stal10.png');
        this.load.image('sG4', '/images/stal11.png');
        this.load.image('sG5', '/images/stal0.png');
        this.load.image('sD0', '/images/stal2.png');
        this.load.image('sD1', '/images/stal4.png');
        this.load.image('sD2', '/images/stal6.png');
        this.load.image('sD3', '/images/stal3.png');
        this.load.image('sD4', '/images/stal5.png');
        this.load.image('sD5', '/images/stal1.png');



        this.load.image('end', '/images/end.png');  
        this.load.image('end1', '/images/end1.png');
        this.load.image('end2', '/images/end2.png');
        this.load.image('end3', '/images/end2a.png');
        this.load.image('end4', '/images/end2af.png');
        this.load.image('end5', '/images/end2b.png');
        this.load.image('end6', '/images/end2bf.png');
        this.load.image('end7', '/images/end2c.png');
        this.load.image('end8', '/images/end3.png');



        this.load.image('serce', '/images/heart.png');
        this.load.image('meta', '/images/tort.png');

        this.load.image('buttonB', '/images/buttonBack.png');
        this.load.image('buttonC', '/images/buttonCredits.png');
        this.load.image('buttonM', '/images/buttonMenu.png');
        this.load.image('buttonO', '/images/buttonOptions.png');
        this.load.image('buttonRS', '/images/buttonRestart.png');
        this.load.image('buttonRe', '/images/buttonReturn.png');
        this.load.image('buttonS', '/images/buttonStart.png');
        
        

        this.load.image('play', '/images/buttonPlay.png')

        this.load.audio('menuMusic', '/sound/watr-fluid-quiet.mp3');
        this.load.audio('bubble', '/sound/bubbleSound.mp3')
        this.load.audio('hurt', '/sound/hit.mp3')

        this.load.spritesheet('volume', '/images/volumeLevels.png', { frameWidth: 206, frameHeight: 164});
        this.load.image('plus', '/images/buttonPlus.png');
        this.load.image('minus', '/images/buttonMinus.png')
 


    }

    create(){
        const width=this.scale.width
        const height=this.scale.height
        const start = this.add.image( width/2, height/2, 'play');
        

        start.setInteractive()
        start.on('pointerover', () => this.eventButtonHoverState(start))
        start.on('pointerout', () => this.eventButtonRestState(start))

        start.on('pointerup', () => this.eventPlay() );
        

    }

    eventButtonHoverState(thisbutton){
        thisbutton.setTint(0x89dddb);
    }

    eventButtonRestState(thisbutton){
      thisbutton.clearTint();
    }

    eventPlay(){
        eventsCenter.emit('play-bubble');
        this.scene.start('menuScene')
    }


}
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
        var yourTime = 0;
        var yourDistance = 0;

        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);


        var credits = 'YOU WON'

        this.add.text( width/2, 200, credits,  { fontSize: '30px', fontFamily: "Comic Sans MS" })

        const buttonRestart = this.add.image( width/2, height/2, 'buttonRS');
        const buttonMenu = this.add.image( width/2, height/2+190, 'buttonM');

        const buttons = [
            buttonRestart,
            buttonMenu
        ];
 

        buttons.forEach( thisbutton => thisbutton.setInteractive() );
        buttons.forEach( thisbutton => thisbutton.on('pointerover', () => this.eventButtonHoverState(thisbutton) ));
        buttons.forEach( thisbutton => thisbutton.on('pointerout', () => this.eventButtonRestState(thisbutton) ));

        buttonRestart.on('pointerup', () => this.backToGame() );
        buttonMenu.on('pointerup', () => this.backToMenu() );
        
        // @ts-ignore
        eventsCenter.on('emit-time', time => yourTime = time, this)

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            // @ts-ignore
            eventsCenter.off('emit-time', time => yourTime = time, this);
        })

        // @ts-ignore
        eventsCenter.on('emit-distance', distance => yourDistance = distance, this)

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            // @ts-ignore
            eventsCenter.off('emit-distance', distance => yourDistance = distance, this);
        })


      
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

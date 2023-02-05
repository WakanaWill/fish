import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

var yourTime;
var yourDistance;

export default class YouLostScene extends Phaser.Scene{

    constructor(){
        super('youLostScene');
    }

    
    preload(){

        
    }

    create() {
      const width=this.scale.width
      const height=this.scale.height
      var yourTime = 0;
      var yourDistance = 0;


      var credits = 'YOU LOST'

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
      eventsCenter.once('emit-time', time => this.test(time), this);

      this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
          // @ts-ignore
          eventsCenter.off('emit-time', time => this.test(time), this);
      })

      // @ts-ignore
      eventsCenter.once('emit-distance', distance => this.test(distance), this)

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

    test(time){
      yourTime = time;
      console.log(yourTime);

    }

    backToMenu(){
      eventsCenter.emit('play-bubble');
      this.scene.stop('gameScene');
      this.scene.run('menuScene');
      this.scene.stop();
    }



}


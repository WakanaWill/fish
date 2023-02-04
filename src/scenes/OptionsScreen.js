import Phaser from "phaser"
import eventsCenter from "./EventsCenter";



export default class OptionsScene extends Phaser.Scene{

    constructor(){
        super('optionsScene');
    }
    

    preload(){
    
    }

    create() {
        const width = this.scale.width
        const height = this.scale.height

        this.add.image(0, 0, 'bg').setOrigin(0,0);
        this.add.image(0, 0, 'bg1').setOrigin(0,0);
        this.add.image(0, 0, 'bg2').setOrigin(0,0);
        this.add.image(0, 0, 'bg3').setOrigin(0,0);

        const buttonBack = this.add.image( width/9.8, height/1.1, 'buttonB');
        const buttonPlus = this.add.image( width/1.6, height/2, 'plus');
        const buttonMinus = this.add.image( width/2.6, height/2, 'minus');
        var volumeIcon = this.physics.add.sprite( width/2, height/2, 'volume', 4);

        this.add.text( width/4+2, height/3.3+2, 'Music volume',  { fontSize: '40px', fontFamily: "Comic Sans MS", color: '#72b7b7'});
        this.add.text( width/4, height/3.3, 'Music volume',  { fontSize: '40px', fontFamily: "Comic Sans MS" });

        this.anims.create({
          key: '0',
          frames: this.anims.generateFrameNumbers('volume', { start: 0, end: 0 }),
          frameRate: 1,
          repeat: -1
        });

        this.anims.create({
          key: '1',
          frames: this.anims.generateFrameNumbers('volume', { start: 1, end: 1 }),
          frameRate: 1,
          repeat: -1
        });

        this.anims.create({
          key: '2',
          frames: this.anims.generateFrameNumbers('volume', { start: 2, end: 2 }),
          frameRate: 1,
          repeat: -1
        });

        this.anims.create({
          key: '3',
          frames: this.anims.generateFrameNumbers('volume', { start: 3, end: 3 }),
          frameRate: 1,
          repeat: -1
        });

        this.anims.create({
          key: '4',
          frames: this.anims.generateFrameNumbers('volume', { start: 4, end: 4 }),
          frameRate: 1,
          repeat: -1
        });



        const buttons = [
            buttonBack,
            buttonMinus,
            buttonPlus
        ];

        var volume = 1;

        buttons.forEach( thisbutton => thisbutton.setInteractive() );
        buttons.forEach( thisbutton => thisbutton.on('pointerover', () => this.eventButtonHoverState(thisbutton) ));
        buttons.forEach( thisbutton => thisbutton.on('pointerout', () => this.eventButtonRestState(thisbutton) ));

        buttonBack.on('pointerup', () => this.backToPause() );
        buttonMinus.on('pointerup', () => this.volumeDown(volume) );
        buttonPlus.on('pointerup', () => this.volumeUp(volume) );


        eventsCenter.on('volume-change-back', function (newVolume){
          volume = newVolume;
          this.changeVolumeIcon(volumeIcon, volume)
        }, this)

        

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
          eventsCenter.off('volume-change-back', newVolume => volume = newVolume, this);
        })





    }

      changeVolumeIcon(volumeIcon, volume){
        if(volume == 0){
          volumeIcon.anims.play('0');
        }else if(volume < 0.4){
          volumeIcon.anims.play('1');
        }else if(volume < 0.7){
          volumeIcon.anims.play('2');
        }else if(volume < 0.9){
          volumeIcon.anims.play('3');
        }else if(volume <= 1){
          volumeIcon.anims.play('4');
        }
        
      }

      isVolumeValid(volume){
        if(volume > 1){
          return 1
        }else if (volume < 0){
          return 0
        }else{
          return volume
        }
      }

      volumeUp(volume){
        eventsCenter.emit('play-bubble');
        volume = this.isVolumeValid(volume + 0.25)
        eventsCenter.emit('volume-change', volume)
      }

      volumeDown(volume){
        eventsCenter.emit('play-bubble');
        volume = this.isVolumeValid(volume - 0.25)
        eventsCenter.emit('volume-change', volume)
      }

      
      eventButtonHoverState(thisbutton){
        thisbutton.setTint(0x89dddb);
      }

      eventButtonRestState(thisbutton){
        thisbutton.clearTint();
      }

      backToPause(){
        eventsCenter.emit('play-bubble');
        if(this.scene.isSleeping('pauseScene')){
            this.scene.wake('pauseScene');
            this.scene.sleep();
        }else{
            this.scene.wake('menuScene');
            this.scene.sleep();
        }
        
      }

}


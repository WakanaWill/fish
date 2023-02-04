import Phaser from "phaser"
import eventsCenter from "./EventsCenter";

export default class MusicScene extends Phaser.Scene{


    constructor(){
        super('musicScene');
    }


    create() {

        var music = this.sound.add('menuMusic', {loop: true})
        music.play();

        // @ts-ignore
        var volume = music.volume;
        // @ts-ignore
        music.setVolume(1);

        var bubbleSound = this.sound.add('bubble');
        var hurtSound = this.sound.add('hurt');

        this.input.keyboard.on('keydown-M', () => this.eventPause(music) )

        eventsCenter.on('volume-change', newVolume => this.volumeChange(newVolume, music), this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('volume-change', newVolume => this.volumeChange(newVolume, music), this);
        })

        // @ts-ignore
        eventsCenter.on('play-bubble', () => this.playbubble(music.volume, bubbleSound), this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            // @ts-ignore
            eventsCenter.off('play-bubble', () => this.playbubble(music.volume, bubbleSound), this);
        })

        // @ts-ignore
        eventsCenter.on('play-Hurt', () => this.playHurt(music.volume, hurtSound), this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            // @ts-ignore
            eventsCenter.off('play-Hurt', () => this.playHurt(music.volume, hurtSound), this);
        })


    }

    playbubble(volume, bubble){
        bubble.play({volume: volume})
    }

    playHurt(volume, hurt){
        hurt.play({volume: volume})
    }

    eventPause(music){
        if(music.isPlaying){
            music.pause()
        }else{
            music.resume()
        }
    }

    volumeChange(newVolume, music){
        music.setVolume(newVolume);
        eventsCenter.emit('volume-change-back', music.volume)
        console.log(music.volume)

    }
      

}
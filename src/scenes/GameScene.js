import Phaser from "phaser"
import eventsCenter from "./EventsCenter";
import gracz from '../objects/Player.js'
import wall from '../objects/Obstacle.js'
import meta from'../objects/Meta.js'

var timer = true;
var time = 0.0;
var text;
var image;
var image2;
var image3;
var hpile = 3;
var koliz = true;
var kon=true;
var lose=false;
/**
 * 
 * @param {number} count 
 * @param {Phaser.Scene} scene
 * @param {string} texture 
 * @param {number} scrollFactro 
 */
const createbg = (count, scene, texture, scrollFactro) => {
    let x = 0;
    for (let i = 0; i < count; ++i) {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0, 1)
            .setScrollFactor(scrollFactro)

        x += m.width
    }
}


export default class GameScene extends Phaser.Scene{

    constructor(){
        super('gameScene');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    preload(){

    }

    create(){
        this.input.keyboard.on('keydown-P', () => this.eventPause() );

        const width = this.scale.width
        const height = this.scale.height
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScrollFactor(0);
        createbg(2,this, 'bg1', 0.25)
        createbg(2,this, 'bg2', 0.5)
        createbg(2,this, 'bg3', 0.5)
        createbg(2,this, 'bg4', 1)
        createbg(2,this, 'bg5', 1)
        
        // Utworzenie gracza.
        this.player = new gracz(this);
        this.player.setOrigin(0, 0);
        this.player.setPosition(width / 2, height / 2);
        this.player.setBounce(0);

        this.player.setCollideWorldBounds(true);
        // @ts-ignore
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 2 * width, height));
        // Uruchomienie śledzenia.
        this.cameras.main.setBounds(0, 0, 40800, 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-width/2.2, 0);

        this.finish = new meta(this);
        this.finish.setPosition(2000, 500);
        this.wall = new wall(this);
        this.wall.setPosition(1400, 100);
  
        // @ts-ignore
        text = this.add.text(width / 15, height / 15, 'time:0', { fontFamily: 'Arial', fontSize: 40, color: '#00ff00' }).setScrollFactor(0);
        
        image = this.add.image(0, 0, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image2 = this.add.image(25, 0, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image3 = this.add.image(50, 0, 'serce').setOrigin(0, 0).setScrollFactor(0);

        this.input.keyboard.on('keydown-L', () => this.eventYouLost() );
    }

    update() {
        if (this.player.active) this.player.update(this.cursors);
        if (koliz == true) {
            koliz = false
            this.physics.add.overlap(this.player, this.wall, this.player.hit);
            this.physics.add.overlap(this.player, this.wall, this.hp);
        }
        if(kon==false){
            this.eventYouWon();
        }
        if (timer == true) {
            timer = false
            this.time.delayedCall(1000, this.onEvent, null, this);
        }
        if(kon=true){
            this.physics.add.overlap(this.player, this.finish, this.player.konie);
        this.physics.add.overlap(this.player, this.finish, this.koniec);
        }
        if(lose==true){
            this.eventYouLost();
        }
    }
    onEvent() {
        timer = true
        time += 1
        text.setText('time:' + time);
    }
    hp() {
        setTimeout(() =>  timer = true, 500)
        if(hpile==3){
            setTimeout(() => image3.destroy(), 500)
            setTimeout(() => image3 = null, 500)
        }else if(hpile==2){
           setTimeout(() => image2.destroy(), 500)
           setTimeout(() => image2 = null, 500)
        }else{
           setTimeout(() => image.destroy(), 500)
          setTimeout(() => image = null, 500)
          lose=true;

        }setTimeout(() => hpile-=1, 500)
    }

    koniec(){
        kon=false
    }

    eventPause(){
        eventsCenter.emit('play-bubble');
        this.scene.launch('pauseScene')
        this.scene.pause();
    }

    eventYouWon(){
        this.player.konie;
        this.scene.launch('youWonScene');
        //here emits
        //give time
        this.scene.stop();
    }

    eventYouLost(){
        this.player.konie;
        this.scene.launch('youLostScene');
        //here emits
        this.scene.pause();
    }

}
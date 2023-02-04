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
var win=false;
var colision;
var lose=false;
var distance=0;
var txtdistance;
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
         distance=0;
         timer = true;
         colision=false;
         time = 0;
         hpile = 3;
         koliz = true;
         win=false;
         lose=false;
        this.input.keyboard.on('keydown-P', () => this.eventPause() );

        const width = this.scale.width
        const height = this.scale.height
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScrollFactor(0);
        createbg(2,this, 'bg1', 0.25)
        createbg(4,this, 'bg2', 0.5)
        createbg(4,this, 'bg3', 0.5)
        createbg(8,this, 'bg4', 1)
        createbg(8,this, 'bg5', 1)
        
        // Utworzenie gracza.
        this.player = new gracz(this);
        this.player.setOrigin(0.65, 0.5);
        this.player.setPosition(width / 2, height / 2);
        this.player.setBounce(0);

        this.player.setCollideWorldBounds(true);
        // @ts-ignore
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 8 * width, height));
        // Uruchomienie śledzenia.
        this.cameras.main.setBounds(0, 0, 40800, 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-width/3, 0);

        this.finish = new meta(this);
        this.finish.setPosition(2000, 500);
        this.wall = new wall(this);
        this.wall.setPosition(1400, 100);
  
        // @ts-ignore
        text = this.add.text(40, 90, 'time: 0', { fontSize: 46, fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0);
        // @ts-ignore
        txtdistance = this.add.text(40, 30, 'distance: 0', { fontSize: 46, fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0);

        image = this.add.image(40, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image2 = this.add.image(75+60, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image3 = this.add.image(150+80, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);

        this.input.keyboard.on('keydown-L', () => this.eventYouLost() );
    }

    update() {
        if (this.player.active) this.player.update(this.cursors);
        if (koliz == true) {
            koliz = false
            this.physics.add.overlap(this.player, this.wall, this.player.hit);
            this.physics.add.overlap(this.player, this.wall, this.hp);
        }
        if(win==true){
            this.eventYouWon();
        }
            if(lose==true){
                this.eventYouLost();
        }
        if (timer == true) {
            timer = false
            this.time.delayedCall(1000, this.onEvent, null, this);
        }
        if(win==false){
        this.physics.add.overlap(this.player, this.finish, this.koniec);
        }
        const width = this.scale.width
        distance=Math.round((this.player.x-(width / 2))/(width/11))
        txtdistance.setText('distance: ' + distance);
    }
    onEvent() {
        timer = true
        time += 1
        text.setText('time: ' + time);
    }
    hp() {
        eventsCenter.emit('play-Hurt');
        colision=true;
        if(hpile==3){
            image3.destroy()
            image3 = null
        }else if(hpile==2){
            image2.destroy()
         image2 = null
        }else{
            image.destroy()
            image = null
            lose=true;
        }
        hpile-=1
        setTimeout(() =>  colision = false, 500)
    }
    koniec(){
        win=true
    }

    eventPause(){
        eventsCenter.emit('play-bubble');
        this.scene.launch('pauseScene')
        this.scene.pause();
    }

    eventYouWon(){
        this.scene.launch('youWonScene');
        eventsCenter.emit('emit-time', time);
        //eventsCenter.emit('emit-distance', distance);
        this.scene.stop();
    }

    eventYouLost(){
        this.scene.launch('youLostScene');
        eventsCenter.emit('emit-time', time);
        //eventsCenter.emit('emit-distance', distance);
        this.scene.pause();
    }

}
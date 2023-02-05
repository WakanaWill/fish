import Phaser from "phaser"
import eventsCenter from "./EventsCenter";
import gracz from '../objects/Player.js'
import Meta from'../objects/Meta.js'

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
var text2;
var txtdistance2;
var txtwin;
var txtlose; 
var endGameTint;
var textUnderWon;
var textUnderLose;
/**
 * 
 * @param {number} count 
 * @param {Phaser.Scene} scene
 * @param {string} texture 
 * @param {number} scrollFactro 
 */
const createbg = (count, scene, texture, scrollFactro) => {
    let x = 0;
    let TYPE='';
    let value;
    for (let i = 0; i < count; ++i) {
        value = Phaser.Math.Between(0, 1);
        if(value==0)TYPE='a';
        if(value==1)TYPE='';
        const m = scene.add.image(x, scene.scale.height, texture+TYPE)
            .setOrigin(0, 1)
            .setScrollFactor(scrollFactro)
        x += m.width
    }
}
/**
 * 
 * @param {number} count 
 * @param {Phaser.GameObjects} GameObjects
 *  @param {Phaser.Scene} scene
 */
const createob = (count, GameObjects,scene) => {
    const width = scene.scale.width
        const height = scene.scale.height
    let multi=1;
    let multi2=0;
    let value
    for (let i = 0; i < count; ++i) {
        value = Phaser.Math.Between(0, 5);
        // @ts-ignore
        GameObjects.create(width*multi, 0, 'sG'+value);
        // @ts-ignore
        GameObjects.create(width*multi, height, 'sD'+value);
        multi=multi+0.5-multi2;
        multi2+=0.005;
        
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
        createbg(7,this, 'bg1', 0.25)
        createbg(13,this, 'bg2', 0.5)
        createbg(13,this, 'bg3', 0.5)
        createbg(24,this, 'bg4', 0.9)
        createbg(24,this, 'bg5', 0.9)
        // Utworzenie przeskud.
        this.platforms = this.physics.add.staticGroup();
        // @ts-ignore
        createob(65,this.platforms,this)
     
        //meta
        this.finish = new Meta(this);
        this.finish.setPosition(24 * width-width/6, height/2);

        // Utworzenie gracza.
        this.player = new gracz(this);
        this.player.setOrigin(0.65, 0.5);
        this.player.setPosition(width / 2, height / 2);
        this.player.setBounce(0);
        this.player.setSize(width / 25, height / 25)
        this.player.setCollideWorldBounds(true);
        

        // @ts-ignore
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 24 * width, height));
        // Uruchomienie śledzenia.
        this.cameras.main.setBounds(0, 0, 24 * width, 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-width/3, 0);

        image = this.add.image(40, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image2 = this.add.image(75+60, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);
        image3 = this.add.image(150+80, height - 100, 'serce').setOrigin(0, 0).setScrollFactor(0);

        endGameTint = this.add.image(0,0,'bgTint').setOrigin(0,0).setScrollFactor(0);
        endGameTint.visible = false;
        
         //texts and timers
         text = this.add.text(40, 90, 'time: 0', { fontSize: '46px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setShadow(2,2,'#72b7b7');
         txtdistance = this.add.text(40, 30, 'distance: 0', { fontSize: '46px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setShadow(2,2,'#72b7b7');
         text2 = this.add.text(width/2, height/2.5+height/18, 'time: 0', { fontSize: '52px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(3,3,'#72b7b7');
         txtdistance2 = this.add.text(width/2, height/2.5, 'distance: 0', { fontSize: '52px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(3,3,'#72b7b7');
         txtwin = this.add.text(width/2, height/5-20, 'YOU WIN', { fontSize: '100px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(4,4,'#72b7b7');
         textUnderWon = this.add.text(width/2, height/5+60, 'your kids are happy to see you :D', { fontSize: '36px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(2,2,'#72b7b7');
         txtlose = this.add.text(width/2, height/5-20, 'YOU LOST', { fontSize: '100px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(4,4,'#72b7b7');
         textUnderLose = this.add.text(width/2, height/5+60, 'your kids miss you', { fontSize: '36px', fontFamily: "Comic Sans MS", color: '#fff'}).setScrollFactor(0).setOrigin(0.5, 0.5).setShadow(2,2,'#72b7b7');
         
         text.visible = true;
         txtdistance.visible = true;
         text2.visible = false;
         txtdistance2.visible = false;
         txtwin.visible = false;
         textUnderWon.visible = false;
         txtlose.visible = false;
         textUnderLose.visible = false;

         


        this.input.keyboard.on('keydown-L', () => this.eventYouLost() );
    }

    update() {
        if (this.player.active) this.player.update(this.cursors);
       
        if (koliz == true) {
            koliz = false
            this.physics.add.overlap(this.player, this.platforms, this.player.hit);
            this.physics.add.overlap(this.player, this.platforms, this.hp);
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
        txtdistance2.setText('distance: ' + distance);
    }
    onEvent() {
        timer = true
        time += 1
        text.setText('time: ' + time);
        text2.setText('time: ' + time);
    }
    hp() {
        if(colision==false){
            eventsCenter.emit('play-Hurt');
        if(hpile==1){
            image.destroy()
            image = null
            lose=true;
        }else if(hpile==2){
            image2.destroy()
         image2 = null
        }else{
            image3.destroy()
            image3 = null
        }
        hpile-=1
    }
        colision=true;
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
        for(;hpile>0;hpile--){
        if(hpile==1){
            image.destroy()
            image = null
        }else if(hpile==2){
            image2.destroy()
         image2 = null
        }else{
            image3.destroy()
            image3 = null
        }}
        text.visible = false;
        txtdistance.visible = false;
        text2.visible=true;
        txtwin.visible=true;
        textUnderWon.visible = true;
        this.scene.launch('gameOverScene');
        this.scene.pause();
    }

    eventYouLost(){
        endGameTint.visible = true;
        text.visible = false;
        txtdistance.visible = false;
        text2.visible=true;
        txtdistance2.visible=true;
        txtlose.visible=true;
        textUnderLose.visible = true;
        this.scene.launch('gameOverScene');
        this.scene.pause();
    }

}
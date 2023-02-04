import GameScene from "./scenes/GameScene";
import MenuScene from "./scenes/MenuScene";
import CreditsScene from "./scenes/CreditsScene";
import LoadScene from "./scenes/LoadScene";
import PauseScene from "./scenes/pauseScene";
import OptionsScene from "./scenes/OptionsScreen";
import MusicScene from "./scenes/MusicScene";
import YouLostScene from "./scenes/YouLostScene";
import YouWonScene from "./scenes/YouWonScene";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{
                y: 0
            },
        }
    },
    scene: [
        LoadScene,
        MenuScene,
        GameScene,
        CreditsScene,
        PauseScene,
        OptionsScene,
        MusicScene,
        YouLostScene,
        YouWonScene
    ]

});
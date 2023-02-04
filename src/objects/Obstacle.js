import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys'

export default class Obstacle extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene)
    {
        super(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            AssetsKeys.stal11
            
        );
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
    update(cursors)
    {
        
    }
}
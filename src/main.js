import LoadScene from "./scenes/LoadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import RoomScene from "./scenes/RoomScene.js";
import RoomScene2 from "./scenes/RoomScene2.js";
import RoomScene3 from "./scenes/RoomScene3.js";
let game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        scene:[
            LoadScene, MenuScene, RoomScene, RoomScene2, RoomScene3
        ],
        render:{
                pixelArt: true
        }
    ,physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 2000},
                    debug: false
                }
        }
});


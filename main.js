// Define a cena de pré-carregamento
class Main extends Phaser.Scene {
    constructor() {
        super('Main');
        this.cenaAtual = 'teste';
    }
    // inicia a cena preLoad, onde vão ser carregados todos assets do jogo
    create() {
        this.scene.start('preLoad');
    };
};

window.onload =  function(){
// Configurações do jogo
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: "77ddf5",
    physics: {
        default: "arcade",
        arcade: {
            gravity:{y:450},  //gravidade 0 no eixo y (player não cai)
            debug: false,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,},
    scene: [Main, Scene00, Scene01, Scene02, Scene03, SceneQuiz, SceneAcerto, SceneErro, SceneGameOver, SceneChangePlayer, SceneTutorial, SceneHUD, SceneLink, SceneFim, preLoad, moeda]
};

// Inicia o jogo
const game  = new Phaser.Game(config);
}


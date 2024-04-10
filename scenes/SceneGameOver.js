class SceneGameOver extends Phaser.Scene{
    constructor(){
        super({key: "SceneGameOver"}, 'preLoad');
    };

    pressBotao(image){
        let bnt = this.add.image(450, 450, image).setScale(0.8);
        bnt.setInteractive({ useHandCursor: true });

        bnt.on('pointerover', () => {
            bnt.setScale(0.85);
        })

        bnt.on('pointerout', () => {
            bnt.setScale(0.8);
        })

        bnt.on('pointerdown', () => {
            this.scene.setVisible(true, 'SceneHUD');
            this.scene.stop('SceneGameOver')
        })
    }

    create() {
        const musicaGameover = this.sound.add('somGameOver');
        musicaGameover.setVolume(0.1)
        musicaGameover.play();

        this.scene.setVisible(false, 'SceneHUD');

        this.add.image(0,0, 'bgGameOver').setOrigin(0,0);
        this.pressBotao('bntVoltar')
    }
}

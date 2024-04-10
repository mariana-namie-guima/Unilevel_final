class SceneTutorial extends Phaser.Scene{
    constructor(){
        super({key: "SceneTutorial"}, 'preLoad');
    }

    create(){
        //transicao com fade in
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.add.image(0,0,'bgTutorial').setOrigin(0,0);
        this.pressBotao('bntTutorial');
    }

    // adiciona o botão da tela inicial para começar o jogo
    pressBotao(image) {
        let bnt = this.add.image(780, 530, image).setScale(1.3).setOrigin(0.5);
        bnt.setInteractive({ useHandCursor: true });

        // o botão é aumentado quando o cursor passa sobre ele
        bnt.on('pointerover', () => {
            bnt.setScale(1.4)
        });
        // o botão volta para escala normal quando o cursor sai de cima dele
        bnt.on('pointerout', () => {
            bnt.setScale(1.3)
        });
        // quando o botão é acionado, a  transição é feita para a cena 01
        bnt.on('pointerdown', () => {
            //fade out
            this.cameras.main.fadeOut(400, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Scene01')
            })
        })
    };
}
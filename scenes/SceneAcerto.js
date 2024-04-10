var senha = ['UNI', 'OPS']

class SceneAcerto extends Phaser.Scene {
    constructor() {
        super({key: 'SceneAcerto'}, 'preLoad');
        this.counter = 2;
        this.CutSceneFinal
    }
 
    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)
        this.CutSceneFinal = this.add.video(0,0,'CutSceneFinal').setDepth(2).setOrigin(0,0);

        //lógica de pontos
        let sceneQuiz = this.scene.manager.getScene('SceneQuiz');
        let pontosTotais = sceneQuiz.pontosTotais;
        
        //confere em qual background de acerto deve mostrar
        if (this.counter == 2) {
            this.add.image(0,0,'bgAcerto1').setOrigin(0,0);
            this.add.text(450, 300, senha[0], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5).setVisible(false);
            this.add.text(450, 400, 'Pontuação: '+ pontosTotais, {fontSize: '30px', fill: '#000000'}).setOrigin(0.5);
            this.counter++
        } else if (this.counter == 3) {
            this.add.image(0,0,'bgAcerto2').setOrigin(0,0);
            this.add.text(450, 300, senha[1], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5).setVisible(false);
            this.add.text(450, 400, 'Pontuação: '+ pontosTotais, {fontSize: '30px', fill: '#000000'}).setOrigin(0.5);
            this.counter++
        }
        this.pressBotao('botaoContinuar');
    }

    
    pressBotao(image){
        let botao = this.add.image(450, 480, image).setOrigin(0.5).setScale(0.8);
        botao.setInteractive({ useHandCursor: true });

        botao.on('pointerover', () => {
            botao.setScale(0.85);
        })

        botao.on('pointerout', () => {
            botao.setScale(0.8);
        })

        //quando apertar o botão inicia um fadeout e dependendo de se o contador estiver em 3 ou 4 vai mudar para a cena 3 ou final
        botao.on('pointerdown', () => {
            // this.cameras.main.fadeOut(200, 0, 0, 0)
            // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                if (this.counter == 3){
                    this.scene.start('Scene03')
                    this.scene.stop('SceneAcerto');
                }else if (this.counter == 4) {
                    this.CutSceneFinal.play();
                    
                    setTimeout(() => {
                        this.CutSceneFinal.stop()
                        this.scene.start('SceneFim');
                    },78000)
                }
            })
        // })
    }
}

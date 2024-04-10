var bntA;
var bntB;
var bntC;
var bntD;
var virus;
var pergunta = [
    'Qual o propósito da UniOPS?', 
    'O que a sigla UniOps significa?',
    'Qual das alternativas abaixo NÃO representa uma visão da Unilever?',
    'Qual das marcas a não pertence à Unilever?',
    'Qual desses NÃO é um objetivo da Unilever',
    'O que é a Unilever Compass?'
];
var respostas = [
    'A) Transformar as operações da Unilever para garantir seu caráter inovador e sustentável\n\nB) Operar a Unilever visando o lucro\n\nC) Gerenciar as operações da Unilever para garantir uma alta no mercado\n\nD) Fazer o back e o front end dos programas da Unilever', 
    'A) Unison Operações \n\nB) Unidade de Operações Especiais \n\nC) Unilever Operation \n\nD) Unilever Tech Operations',
    'A) Ser líder global em negócios sustentáveis. \n\nB)  Ser a empresa sustentável mais lucrativa do mercado. \n\nC) Tornar "viver sustentavelmente" algo comum. \n\nD) Tornar a sustentabilidade parte do dia a dia de todos.',
    "A) Dove \n\nB) Hellmann's \n\nC) Coca-cola \n\nD) Knorr",
    'A) Melhorar a saúde do planeta \n\nB) Melhorar a saúde, confiança e bem-estar das pessoas \n\nC)Contribuir para um mundo justo e inclusivo \n\nD) Diminuir padrões de vida',
    'A) Estratégia para oferecer crescimento consistente, competitivo, lucrativo e responsável \n\nB) Um produto da Unilever\n\nC) Um curso de aperfeiçoamento dos funcionários\n\nD) Uma estratégia para aumentar o lucro '
];
var cenaAnterior = 2;
var musica = true;

class SceneQuiz extends Phaser.Scene {
    constructor() {
        super({key: 'SceneQuiz'}, 'preLoad')
        this.pontosTotais = 0;
        this.pontosGanhos = 8;
    }

    create() {
        //musica de fundo
        if (musica == true){
            this.musica(true);
            musica = false
        }

        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0);
        this.scene.setVisible(false, 'SceneHUD');

        //adiciona fundos
        this.add.image(0,0, 'bgPergunta').setOrigin(0,0);


        //adiciona botões
        bntA = this.add.image(220,490, 'bntA').setScale(0.9)
        bntB = this.add.image(400,490, 'bntB').setScale(0.9)
        bntC = this.add.image(580,490, 'bntC').setScale(0.9)
        bntD = this.add.image(760,490, 'bntD').setScale(0.9)

        //muda quiz por fase
        if (quizCounter == 0) {
            this.add.text(70, 70, pergunta[0], {fill: '#3c7e45', fontSize: '40px', wordWrap: { width: 700 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[0], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntA, bntB, bntC, bntD, 'SceneQuiz');
        } 
        else if (quizCounter == 1) {
            this.add.text(70, 70, pergunta[1], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 700 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[1], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntC, bntB, bntD, bntA, 'SceneQuiz');
        }  
        else if (quizCounter == 2) {
            this.add.text(70, 70, pergunta[2], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 700 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[2], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntB, bntD, bntC, bntA, 'SceneAcerto');
        } 
        else if (quizCounter == 3) {
            this.add.text(70, 70, pergunta[3], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 750 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[3], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntC, bntD, bntB, bntA, 'SceneQuiz');
        }
        else if (quizCounter == 4) {
            this.add.text(85, 70, pergunta[4], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 700 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[4], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntD, bntB, bntC, bntA, 'SceneQuiz');
        }
        else if (quizCounter == 5) {
            this.add.text(85, 70, pergunta[5], {fill: '#3c7e45', fontSize: '32px', wordWrap: { width: 750 }, stroke: '#3c7e45', strokeThickness: 2});
            this.add.text(170, 220, respostas[5], {fill: '#3c7e45', fontSize: '20px', wordWrap: { width: 650 }, stroke: '#3c7e45', strokeThickness: 2});
            this.responder(bntA, bntD, bntC, bntB, 'SceneAcerto');
        }

        //lógica de pontuação:
        if (this.pontosGanhos != 8){
            //ligação entre cenas
            let sceneErro = this.scene.manager.getScene('SceneErro');
            this.pontosGanhos = sceneErro.pontosGanhos;
        }
    }
    musica(estado){
        const musicaFundoQuiz = this.sound.add("SomBgQuiz", {loop: true});
        musicaFundoQuiz.setVolume(0.2);
        musicaFundoQuiz.play();
        if(estado == false){
          this.sound.stopAll()
        }
    }

    responder(bntCerto, bntErrado1, bntErrado2, bntErrado3, proximaCena) {
        //affordance dos botoes
        this.bntAffordance(bntCerto);
        this.bntAffordance(bntErrado1);
        this.bntAffordance(bntErrado2);
        this.bntAffordance(bntErrado3);

        //botao certo é apertado
        bntCerto.on('pointerdown', () => {
            this.pontosTotais += this.pontosGanhos;
            this.pontosGanhos = 8
            cenaAnterior++
            quizCounter++
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.musica(false);
                musica = true
                this.scene.stop('SceneQuiz');
                this.scene.start(proximaCena);
            })
        })

        bntErrado1.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado2.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado3.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })
    }
    

    bntAffordance(bnt) {
        bnt.setInteractive({ useHandCursor: true });
        bnt.on('pointerover', () => {
            bnt.setScale(0.95);
        })

        bnt.on('pointerout', () => {
            bnt.setScale(0.9);
        })
    }
}
var coracoes = [3];
var ponto;
var pontos = 0;
class SceneHUD extends Phaser.Scene {
    constructor() {
        super({key: "SceneHUD"}, 'preLoad', 'Scene02', 'Scene03', 'SceneGameOver', 'moeda');
    };
    //função responsavel por contabilizar as moedas coletadas
    atualizarPontos(novosPontos) {
        pontos += novosPontos;
        ponto[1].setText(pontos);
    };
    //função responsavel pelo dano
    atualizarVida(dano){
        coracoes[0] -= dano;
    };
    //função responsavel por recuperar a vida pós o gameover
    recuperarVida(){
        coracoes[0] = 3;
    };
    legendou(mensagem){
        console.log('a')
        var legenda = this.add.text(400, 575, mensagem, {font: "20px", fill:'#1E6F31',stroke: '#1E6F31', strokeThickness: 2, backgroundColor:'#C3D8D2'});
        setTimeout(() => {
            legenda.destroy()
        }, 1500);
    };
    
    create () {
        //pontos
        ponto = [
            this.add.image(775, 50, 'moeda').setScale(0.2),
            this.add.text(810, 30, pontos, { fontFamily: 'Arial', fontSize: 40, color: '#000000' })
        ];
        //vida
        coracoes.push(
            this.add.image(120, 50, '3coracao').setScale(0.15).setVisible(false),
            this.add.image(120, 50, '2coracao').setScale(0.15).setVisible(false),
            this.add.image(120, 50, '1coracao').setScale(0.15).setVisible(false)
        ); 
        this.scene.get('moeda').events.on('moedaColetada', () => this.atualizarPontos(1), this);
        this.scene.get('Scene02').events.on('dano', () => this.atualizarVida(1));
        this.scene.get('Scene02').events.on('morreu', () => this.recuperarVida(3), this);
        this.scene.get('Scene02').events.on('legenda', (receivedMensage) => {
            this.legendou(receivedMensage);
        });
        this.scene.get('Scene03').events.on('dano', () => this.atualizarVida(1));
        this.scene.get('Scene03').events.on('morreu', () => this.recuperarVida(3), this);
        this.scene.get('Scene03').events.on('legenda', (receivedMensage) => {
            this.legendou(receivedMensage);
        });
;    }

    update(){
        //condição que verifica a vida
        if (coracoes[0] == 3){
            coracoes[1].setVisible(true);
            coracoes[3].setVisible(false);
        }else if(coracoes[0] == 2){
            coracoes[1].setVisible(false);
            coracoes[2].setVisible(true);
        }else if (coracoes[0] == 1){
            coracoes[2].setVisible(false);
            coracoes[3].setVisible(true);
        } 
    }
};

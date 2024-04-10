//essa classe é responsavel por guardar a função 'coletarMoeda' utilizada na cena 2 e 3
class moeda extends Phaser.Scene {
    constructor() {
        super('moeda');
    }
    //essa função destroi a moeda, toca um som e emite o evento moeda coletada que será escutado pela SceneHUD
    coletarMoeda(moedaSprite) {
        moedaSprite.destroy();
        const coletaMoeda = this.sound.add("coletarMoeda");
        coletaMoeda.play();
        coletaMoeda.setVolume(0.1);
        this.events.emit('moedaColetada', 1);
    }
}
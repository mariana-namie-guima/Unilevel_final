var confetti;
class SceneFim extends Phaser.Scene{
    constructor(){
        super({key: 'SceneFim'}, 'preLoad')
    }

    create(){
        this.add.image(0,0,'bgAcerto').setOrigin(0,0);
        confetti = this.add.sprite(450,300,'Confetti');
        this.anims.create({
            key: 'caindo',
            frames: this.anims.generateFrameNumbers('Confetti', { start:0, end:5 }),
            frameRate: 8,
            repeat: -1
        });

        //animação dos confettis caindo
        confetti.anims.play('caindo',true);

        //musica de fundo
        const musicaFundo = this.sound.add("vitoria");
        musicaFundo.play();
        musicaFundo.setVolume(0.1);
    }
}
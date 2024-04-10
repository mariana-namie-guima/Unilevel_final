class SceneChangePlayer extends Phaser.Scene{
    constructor(){
        super({key: "SceneChangePlayer"}, 'Main');
    };
   
    create(){
        //background
        this.createParallax(4, 'bg', 0);
        this.createParallax(4, 'bgMontanha', 0.2);
        this.createParallax(4, 'bgMaquina', 0.4);
        this.createParallax(4, 'bgSorvete', 0);

        //texto sendo escrito
        this.label = this.add.text(450, 120, '', {font: "55px", fill: "#000000"}).setOrigin(0.5);
	    this.typewriteText('Escolha seu personagem!')

        //escolha das skins
        this.escolhaDoPlayer(180,'urso_azul');
        this.escolhaDoPlayer(360, 'urso_amarelo');
        this.escolhaDoPlayer(540, 'urso_rosa');
        this.escolhaDoPlayer(720, 'urso_laranja');
    }

    //função para criar a animação do texto sendo digitado
    typewriteText(text){
	    const length = text.length
	    let i = 0
	    this.time.addEvent({
		callback: () => {
			this.label.text += text[i]
			++i
		},
		repeat: length - 1,
		delay: 65
    	})
    }
    
    //função para o prallax
	createParallax(count, bg , scrollFactor) {
      	let x = 0;
      	for (let i =0; i < count; ++i) {
       	const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
        x += 900
        }
    }

    //função para criar a seleceção e criação do player
    escolhaDoPlayer(x, sprite) {
        //spawna a imagem do idle do urso
        let player = this.add.sprite(x, 350, sprite).setOrigin(0.5);

        //quando o mouse passa por cima do urso ele aumenta e quando sai ele diminui
        player.setInteractive({ useHandCursor: true });
        player.on('pointerover', () => {
            player.setScale(1.1)
        });
        player.on('pointerout', () => {
            player.setScale(1)
        });

        //quando clickar em cima de um urso cria as animações dele
        player.on('pointerdown', () => {
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers(sprite, { start: 1, end: 8 }),
                frameRate: 12,
                repeat: -1
            }),
	    this.anims.create({
                key: 'parado',
                frames: this.anims.generateFrameNumbers(sprite, { start: 0, end: 0 }),
                frameRate: 12,
                repeat: -1
            }),
		
        //mudar de cena
        this.scene.stop('SceneChangePlayer'),
        this.scene.start('SceneTutorial')
        });
    }
}
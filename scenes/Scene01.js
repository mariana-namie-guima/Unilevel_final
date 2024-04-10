var chao;
var exclamacao;
var quizCounter = 0;
var player;
var cor = 'azul';
var playernoChao = false;
var direcoes;
var chao;
var podeMudarCena = false;
var telaPiscando;
var teclaF;
var teclaE;
var spaceBar;
var somTocou = false;
var CutScene1;
window.sharedData = {cena: 'Scene02'};

class Scene01 extends Phaser.Scene{
    constructor() {
        super({ key: "Scene01" }, 'preLoad');
    }
    //função para criar as legendas
    legendas(mensagem){
        var legenda = this.add.text(400, 575, mensagem, {font: "20px", fill:'#1E6F31',stroke: '#1E6F31', strokeThickness: 2, backgroundColor:'#C3D8D2'});
        setTimeout(() => {
            legenda.destroy()
        }, 1500);
    }
    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(1800, 0, 0, 0);
        //recebe o input do teclado
        this.teclado = this.input.keyboard.createCursorKeys();
        teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Tecla E

        //adicionando as teclas WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);// Barra de Espaço
        teclaF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);//Tecla F
        
        //adicionando o backgorund
        this.add.image(450, 300, 'bg1');

        // adiciona a affordance da exclamação para ir ao computador
        exclamacao = this.physics.add.staticImage(700, 270,'exclamacao').setSize(100, 600).setScale(0.3);
        // adiciona o botão E inicialmente invisivel
        botaoE = this.add.image(720, 270,'botaoE').setScale(0.2).setVisible(false);

        // adiciona o player e sua animação de sprite sheet
        player = this.physics.add.sprite(140, 450, 'player').setSize(120, 150);
        player.setCollideWorldBounds(true);


        // adiciona a tela piscando entre a cena 01 e 02
        this.anims.create({
            key: 'piscar',
            frames: this.anims.generateFrameNumbers('telaPiscando', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        // troca a exclamação pelo botão E quando o player encosta na hitbox dela
        this.physics.add.overlap(player, exclamacao, () => {
            if (somTocou == false){
                const pop = this.sound.add("pop");
                pop.setVolume(0.5);
                pop.play();
                this.legendas('Elemento interativo');
            }
        });

        // adiciona o chão e a colisão do player
        chao = this.physics.add.staticImage(450, 575, 'chao1');
        this.physics.add.collider(player, chao, function () {
            playernoChao = true;
        });
    }
    
    //função para o affordance da interação do computador
    verificarSobreposicao() {
        const sobreposto = this.physics.overlap(player, exclamacao);
        
        //se o player estiver em cima do computador o exclamação vai desaparecer, a tecla E aparece e permite a mudança de cena
        if (sobreposto){
            exclamacao.setVisible(false);
            botaoE.setVisible(true);
            podeMudarCena = true; 
            somTocou = true
        //se o player não estiver em cima do computador o exclamação vai aparecer, a tecla E desaparecer e não permite a mudança de cena
        } else{
            exclamacao.setVisible(true);
            botaoE.setVisible(false);
            podeMudarCena = false; 
            somTocou = false;
        }
    }

    update(){
        //affordance computador
        this.verificarSobreposicao();

        //movimentação e mudança de animação dos personagens
        if(this.teclado.left.isDown || this.WASD.left.isDown){
            player.setFlipX(true);
            player.setVelocityX(-300);
            player.anims.play('andar', true);
        }else if(this.teclado.right.isDown || this.WASD.right.isDown){
            player.setFlipX(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
        }else{
            player.setVelocityX(0);
            if (player.body.velocity.y === 0) { // Garante que a animação de parar só aconteça quando não estiver pulando
                player.anims.play('parado', true);
            }
        };
        if((this.teclado.up.isDown || this.WASD.up.isDown) && playernoChao){
            player.setVelocityY(-200);
            playernoChao = false;
        };
        
        //mudando de cena quanto aperta a tecla E
        if (Phaser.Input.Keyboard.JustDown(teclaE) && podeMudarCena) {
            exclamacao.destroy();
            //cutscene é iniciada
            CutScene1 = this.add.video(450,300,'CutScene1');
            CutScene1.play();
            //dps de 1 min e 15 segundos a cutscene é deletada e começa a animação da tela buffering
            setTimeout(() => {
                CutScene1.destroy()
                telaPiscando = this.add.sprite(0, 0, 'telaPiscando').setOrigin(0, 0);
                telaPiscando.anims.play('piscar');
                //depois de 1 segundo e meio a cena 2 inicia
                setTimeout(() =>{
                    this.scene.stop('Scene01');
                    this.scene.launch('Scene02');
                    this.scene.launch('SceneHUD');
                },1500);
            },81200);   
        };
    };
};
//FASE MÃE TERRA
var player;
var vida = 3;
var troncos = [];
const posicoesTroncos = [
    { x: 400, y: 500},
    { x: 770, y: 420},
    { x: 1140, y: 490},
    { x: 1510, y: 460}
];
var besouros = [];
//guarda as posições dos besouros
const posicaoBesouros = [
    { x: 600, y: 20 }, 
    { x: 2600, y: 40 },
    { x: 3000, y: 40 },
    { x: 4000, y: 40 },
    { x: 4500, y: 40 } 
];
var cipo;
var jacare;
var grades;
var playernoChao;
var platAuxScene, platAux;
var bolachas = [];
const posicoesBolachas = [
    { x: 1720, y: 376},
    { x: 1780, y: 200},
    { x: 2100, y: 300},
    { x: 3500, y: 450},
    { x: 4950, y: 450}
];
var chaos = [];
const posicoesChaos2 = [
    { x: 460, y: 600 }, 
    { x: 2800, y: 600 },
    { x: 4250, y: 600 },
    { x: 5630, y: 600 } 
];
var moedas = [];
const posicoesMoedas2 = [
    { x: 760, y: 510 },
    { x: 1325, y: 150 },
    { x: 2095, y: 200 },
    { x: 2805, y: 500 },
    { x: 3490, y: 350 },
    { x: 4945, y: 350 }
];


class Scene03 extends Phaser.Scene {

    constructor(){ 
        super({key: "Scene03"}, 'preLoad', 'moeda');
        this.textoHacker = null;
        this.balaoDeFala = null;
        
    }

    //criação da parallax de fundo
    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }
    legendas(mensagem){
        this.events.emit('legenda',mensagem);
    }
    morreu(){
        vida -= 1;
        this.events.emit('dano');
        const som = this.sound.add('dano');
        som.setVolume(0.2);
        som.play();
        this.legendas('Tomou Dano');

        if(vida == 0){
            vida = 3;
            this.events.emit('morreu');
            player.setPosition(200, 500);
            this.scene.launch('SceneGameOver');
        }else{
            player.setPosition(200, 500);
        };
    };

    // Adição dos recursos na tela do game
    create() { 
        cenaAnterior = 'Scene03';

        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)
        this.scene.setVisible(true, 'SceneHUD');
        
        
        const width = this.scale.width;
        const height = this.scale.height;

        this.teclado = this.input.keyboard.createCursorKeys();
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // Criação de teclas personalizadas para movimentação com WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //plataforma auxiliar que faz a transição das cenas
        platAux = this.physics.add.staticImage(12500,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        
        //Adicionando background
        this.cameras.main.setBackgroundColor("#ffec9a");
        this.createParallax(6.8, 'montanhas', 0.2); 
        this.createParallax(6.8, 'colinas', 0.4);
        this.createParallax(6.8, 'arvore', 0.6);

        

        teclado = this.input.keyboard.createCursorKeys(); // carregando entrada de informações vindas to teclado

        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*6.8, 600);
        this.physics.world.setBounds(0, 0, width*6.8, 600);

        placa = this.physics.add.sprite(6000,522, 'placa').setScale(0.6);
        placa.setMaxVelocity(0);
 

        jacare = this.add.sprite(5760,507,'jacare').setScale(0.38);
        this.anims.create({
            key: 'pular2',
            frames: this.anims.generateFrameNumbers('jacare', { start:0, end:1 }),
            frameRate: 5,
            repeat: -1
        });
        grades = this.add.image(5760,507,'grades');

        //criacao do player
        player = this.physics.add.sprite(200,500,'player').setSize(100,150).setScale(0.8);
        //player = this.physics.add.sprite(5700,500,'player').setSize(100,150).setScale(0.8);

        // adiciona fundo que chama a tela de gameover quando o player cai
        fundo = this.physics.add.staticImage(1000,800,'chao2').setSize(50000,30).setScale(500,1);
        this.physics.add.collider(player,fundo, () => {
            this.morreu()
        })
        

        //configurando a câmera
        this.cameras.main.startFollow(player);
        player.setDragY(0.6);

        barreiraEsquerda = this.physics.add.staticImage(0,height/2,'').setSize(1,height+100).setVisible(false);
        this.physics.add.collider(player,barreiraEsquerda);
        
        platAuxScene = this.physics.add.staticImage(6000,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAuxScene, () =>{
            //ao tocar o portal o jogador vai para tela de quiz com um fade out que n esta funcionndo direito
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                musicaFundo.stop()
                this.scene.stop('Scene03')
                this.scene.launch('SceneQuiz')
            })
        }); 

        //adiciona chao
        posicoesChaos2.forEach(posicao => {
            const chao = this.physics.add.staticImage(posicao.x, posicao.y, 'chaomt').setSize(980, 60).setScale(1.1, 1);
            this.physics.add.collider(player, chao, () => {
                playernoChao = true;
            });
            chaos.push(chao);
        });
        

        //adiciona tronco
        posicoesTroncos.forEach(posicao => {
            const tronco = this.physics.add.staticImage(posicao.x, posicao.y, 'tronco').setSize(200,40).setScale(0.3);
            this.physics.add.collider(player, tronco, () => {
                playernoChao = true;
            });
            troncos.push(tronco);
        });

        //adiciona bolacha
        posicoesBolachas.forEach(posicao => {
            const bolacha = this.physics.add.staticImage(posicao.x, posicao.y, 'bolacha').setSize(200, 52);
            this.physics.add.collider(player, bolacha, () => {
                playernoChao = true;
            });
            bolachas.push(bolacha);
        });
        //adiciona besouro
        posicaoBesouros.forEach(posicao => {
            const besouro = this.physics.add.sprite(posicao.x, posicao.y, 'besouro').setBounce(1).setScale(1);
            besouro.setVelocityY(10); // Adicione a velocidade desejada aqui
            besouro.setPushable(false);
            this.physics.add.collider(player, besouro, () => {
                this.morreu();
            });
            this.physics.add.collider(chaos, besouro)
            besouros.push(besouro);
        });
        

        //adiciona moeda
        posicoesMoedas2.forEach(posicao => {
            moedas.push(
                this.physics.add.staticImage(posicao.x, posicao.y, 'moeda')
                    .setSize(55, 55)
                    .setScale(0.2)
            );
        });
        moedas.forEach(moeda => {
            this.physics.add.overlap(player, moeda, () => {
                this.scene.get('moeda').coletarMoeda(moeda);
                this.legendas('Coletou Moeda');
            });
        });

        cipo = this.physics.add.staticImage(1290, 280,'cipo').setSize(0,0).setScale(1);
        
        //adiciona plataformas auxiliares/invisíveis
        platAux = this.physics.add.staticImage(1300,240,'').setSize(200,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(player, platAux, () =>{
            playernoChao = true;
        }); //plataforma do cipo

        // adiciona o celular
        celular = this.physics.add.sprite(5600,500,'celular').setScale(0.5).setVisible(true);
        celular.body.setSize(500, 800, true)
        this.physics.add.overlap(player, celular, () => {
            this.mostrarBalaoDeFala();
            this.podeAbrirCelular = true
        }, null, this);

        // adiciona o botão da letra E
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      
        // adiciona o affordance da letra E
        botaoE = this.physics.add.sprite(5615, 400, 'botaoE').setScale(0.15);


        // Adiciona o balão de falas do hacker
        this.balaoDeFala = this.add.image(6050, 40, 'balaoDeFala').setOrigin(1, 0).setScale(0.3).setVisible(false);

        // Adiciona o texto dentro do balão de falas
        this.textoHacker = this.add.text(5825, 90, "O QUE?!?!?! COMO RAIOS VOCÊ CHEGOU ATÉ AQUI??? Ok, não. Tudo bem, você não vai conseguir passar dessa vez.", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setVisible(false);
        this.textoHacker.setOrigin(0.5, 0);

        //musica de fundo
        const musicaFundo = this.sound.add("SomBgMaeTerra", {loop: true});
        musicaFundo.play();
        musicaFundo.setVolume(0.075);
    };

    mostrarBalaoDeFala(){
        this.balaoDeFala.setVisible(true);
        this.textoHacker.setVisible(true);
    }

    update() {
        jacare.anims.play('pular2', true);
        // impede que as sprites sofram com a velocidade da gravidade e caiam
        celular.setMaxVelocity (0);
        botaoE.setMaxVelocity (0);
        //texto1.setMaxVelocity (0);

        //quando as duas teclas são pressionada, o player para
        if(teclado.left.isDown && teclado.right.isDown){
        
            player.setVelocityX(0);
        }
        // Lógica para movimentação com as teclas WASD ou setas
        const isMovingLeft = teclado.left.isDown || this.WASD.left.isDown;
        const isMovingRight = teclado.right.isDown || this.WASD.right.isDown;
        const isJumping = teclado.up.isDown || this.WASD.up.isDown|| this.spaceBar.isDown;

        if (isMovingLeft) {
            player.setFlip(true);
            player.setVelocityX(-300);
            player.anims.play('andar', true);
        } else if (isMovingRight) {
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('parado', true);
        }

        if (isJumping && playernoChao && player.body.touching.down) {
            player.setVelocityY(-400);
            player.anims.play('andar', true);
            playernoChao = false;
        }

        //quando chegar no celular o HUD de links aparece
        if (Phaser.Input.Keyboard.JustDown(this.teclaE) && this.podeAbrirCelular) {
            this.scene.pause('Scene03')
            this.scene.launch('SceneLink');
        } else {
            this.podeAbrirCelular = false
        }
    };
};
var moedas = [];
const posicoesMoedas1 = [
    { x: 300, y: 250 },
    { x: 1350, y: 350 },
    { x: 1450, y: 350 },
    { x: 1955, y: 350 },
    { x: 1250, y: 350 },
    { x: 2800, y: 150 },
    { x: 4305, y: 350 },
    { x: 5500, y: 180 },
    { x: 6300, y: 180 },
    { x: 7200, y: 250 },
    { x: 7600, y: 160 },
    { x: 8700, y: 400 },
    { x: 9500, y: 400 },
    { x: 13000, y: 300 },
    { x: 10700, y: 450 },
    { x: 11500, y: 400 }
];
var player;
var checkar = [200,500];
var vida = 3;
var pregadores = [];
const posicaoPregadores = [
    {x: 300, y: 350},
    {x: 2400, y: 350},
    {x: 2800, y: 250},
    {x: 3200, y: 400},
    {x: 7200, y: 350},
    {x: 7600, y: 250},
    {x: 8700, y: 500},
    {x: 9100, y: 400},
    {x: 9500, y: 500},
    {x: 9900, y: 400},
    {x: 10300, y: 400},
    {x: 10700, y: 300},
    {x: 10700, y: 550},
    {x: 11100, y: 450},
    {x: 11500, y: 500}
];
var pregador9, pregador14,pregador18;

// Array para guardar os chãos
var chaoArray = [];
// Array para as posições dos chãos
const posicoesChaos1 = [
    { x: 1000, y: 600 },
    { x: 4300, y: 600 },
    { x: 5500, y: 600 },
    { x: 5900, y: 600 },
    { x: 6300, y: 600 },
    { x: 7600, y: 600 },
    { x: 12300, y: 600 }
];
// Array para os tamanhos dos chãos
const tamanhosChaos = [
    { width: 2000, height: 30, scaleX: 8, scaleY: 1 },
    { width: 1750, height: 30, scaleX: 6.8, scaleY: 1 },
    { width: 160, height: 30, scaleX: 0.6, scaleY: 1 },
    { width: 160, height: 30, scaleX: 0.6, scaleY: 1 },
    { width: 160, height: 30, scaleX: 0.6, scaleY: 1 },
    { width: 1750, height: 30, scaleX: 6.8, scaleY: 1 },
    { width: 900, height: 30, scaleX: 3.5, scaleY: 1 }
];

var playernoChao;
var teclado; 
var bacterias = [];
const posicoesBacterias = [
    { x: 1200, y: 480 },
    { x: 3630, y: 500 },
    { x: 4400, y: 500 },
    { x: 7650, y: 500 },
    { x: 7800, y: 500 },
    { x: 7800, y: 500 }
];
var maquinas = [];
const posicaoMaquinas = [
    { x: 700, y: 500 },
    { x: 1955, y: 500 },
    { x: 3570, y: 500 },
    { x: 4300, y: 500 },
    { x: 4800, y: 500 },
    { x: 5100, y: 500 },
    { x: 5500, y: 500 },
    { x: 5500, y: 330 },
    { x: 5900, y: 500 },
    { x: 6300, y: 500 },
    { x: 6300, y: 330 },
    { x: 6800, y: 500 },
    { x: 8000, y: 500 }
];

var barreiraEsquerda;
var fundo;
var celular;
var omo;
var texto, texto1;
var botaoE;
var grades;
var portal;
var placa;
var checkpoint1, checkpoint11, checkpoint22, checkpoint2;
var platAux, platAux2, platAux3;
var contagemPortal = 1;
var cena = 'Scene02'

class Scene02 extends Phaser.Scene{
    
    constructor(){
        super({key: "Scene02"}, 'preLoad');
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
    
    //função relacionada a morte do player e reber dano de inimigos
    morreu(){
        vida -= 1;
        this.events.emit('dano');
        const som = this.sound.add('dano');
        som.setVolume(0.2);
        som.play();
        this.legendas('Tomou Dano');

        if(vida == 0){
            vida = 3;
            checkar = [200,500];
            this.events.emit('morreu');
            checkpoint1.setVisible(true);
            checkpoint11.setVisible(false);
            checkpoint2.setVisible(true);
            checkpoint22.setVisible(false);
            player.setPosition(checkar[0], checkar[1]);
            this.scene.launch('SceneGameOver');
        }else{
            player.setPosition(checkar[0], checkar[1]);
        };
    };

    create(){
        cenaAnterior = 'Scene02';

        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)

        this.cameras.main.setBackgroundColor("#77ddf5");
        const width = this.scale.width;
        const height = this.scale.height;

        teclado = this.input.keyboard.createCursorKeys();


        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*14, 600);
        this.physics.world.setBounds(0, 0, width*14, 600);
 
        //adicionar paralaxe
        this.createParallax(14, 'bgVaral', 0.2);
        this.createParallax(14, 'bgBolha', 0.4);
        
        //adicionando as teclas WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        placa = this.physics.add.sprite(12500,522, 'placa').setScale(0.6);
        placa.setMaxVelocity(0);

        //adiciona NPC da Omo
        omo = this.physics.add.sprite(12300,500,'omo').setScale(0.3);
        this.anims.create({
            key: 'pular',
            frames: this.anims.generateFrameNumbers('omo', { start:0, end:1 }),
            frameRate: 5,
            repeat: -1
        });
      
        grades = this.physics.add.sprite(12300, 507, 'grades').setScale(1.2);
        grades.setPushable(false);

        //criacao do player
        player = this.physics.add.sprite(checkar[0], checkar[1],'player').setSize(100,150).setScale(0.8);
        //player = this.physics.add.sprite(12200, checkar[1],'player').setSize(100,150).setScale(0.8);
        this.cameras.main.startFollow(player);

        //criação de checkpoints
        checkpoint1 = this.physics.add.staticImage(4955,500,'bandeiraCinza').setSize(100,500).setScale(0.6);
        checkpoint11 = this.physics.add.staticImage(4950,500,'bandeiraVermelha').setSize(100,500).setScale(0.6).setVisible(false);
        this.physics.add.overlap(player, checkpoint1, () =>{
            if (checkar[0] != [4955]){
                const somCheckPoint1 = this.sound.add("somCheckpoint");
                somCheckPoint1.play();
                somCheckPoint1.setVolume(0.15);
                this.legendas('Conquistou o Checkpoint');
            } else{};
                checkar = [4955,500];
                checkpoint1.setVisible(false);
                checkpoint11.setVisible(true);
        })


        checkpoint2 = this.physics.add.staticImage(8240,500,'bandeiraCinza').setSize(100,500).setScale(0.6);
        checkpoint22 = this.physics.add.staticImage(8235,500,'bandeiraVermelha').setSize(100,500).setScale(0.6).setVisible(false);
        this.physics.add.overlap(player,checkpoint2, () =>{
            if (checkar[0] != [8240]){
                const somCheckPoint1 = this.sound.add("somCheckpoint");
                somCheckPoint1.play();
                somCheckPoint1.setVolume(0.4);
                this.legendas('Conquistou o Checkpoint');  
            } else{};
                checkar = [8240,500]; 
                checkpoint2.setVisible(false);
                checkpoint22.setVisible(true);
        })

        //barreira que impede o jogador de cair no lado esquerdo do início da fase
        barreiraEsquerda = this.physics.add.staticImage(0,height/2,'').setSize(1,height+100).setVisible(false);
        this.physics.add.collider(player,barreiraEsquerda);

        //plataforma auxiliar que faz a transição das cenas
        platAux = this.physics.add.staticImage(12500,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAux, () =>{
            //ao tocar a placa o jogador vai para tela de quiz com um fade out que n esta funcionndo direito
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                musicaFundo.stop();
                this.scene.stop('Scene02');
                this.scene.launch('SceneQuiz');
            })
        });


        //adiciona bacterias
        posicoesBacterias.forEach(posicao => {
            const bacteria = this.physics.add.sprite(posicao.x, posicao.y, 'bacteria').setBounce(1).setScale(1.2).setSize(75, 75);
            bacteria.setVelocityX(50); // Adicione a velocidade desejada aqui
            bacteria.setPushable(false);
            this.physics.add.collider(player, bacteria, () => {
                this.morreu();
            });
            bacterias.push(bacteria);
        });
        // Adiciona as últimas duas bactérias com diferentes tamanhos e velocidades
        posicoesBacterias.slice(-2).forEach(posicao => {
            const bacteria = this.physics.add.sprite(posicao.x, posicao.y, 'bacteria').setBounce(1).setSize(75, 75);
            if (posicao === posicoesBacterias[posicoesBacterias.length - 2]) {
                bacteria.setScale(1.5); // Defina o tamanho maior para a penúltima bactéria
                bacteria.setVelocityX(70); // Defina a velocidade desejada para a penúltima bactéria
            } else {
                bacteria.setScale(0.8); // Defina o tamanho menor para a última bactéria
                bacteria.setVelocityX(90); // Defina a velocidade desejada para a última bactéria
            }
                bacteria.setPushable(false);
                this.physics.add.collider(player, bacteria, () => {
                this.morreu();
        });
            bacterias.push(bacteria);
});
        
        //adiciona chãos
        posicoesChaos1.forEach((posicao, index) => {
            const tamanho = tamanhosChaos[index];
            const chao = this.physics.add.staticImage(posicao.x, posicao.y, 'chao2')
                            .setSize(tamanho.width, tamanho.height)
                            .setScale(tamanho.scaleX, tamanho.scaleY);
            chaoArray.push(chao);
        
            // Adicionar colisão com o jogador
            this.physics.add.collider(player, chao, () => {
                playernoChao = true;
            });
        
            // Adicionar colisão com as bactérias
            this.physics.add.collider(bacterias, chao);
        });
        
        // adiciona fundo que chama a tela de gameover quando o player cai
        fundo = this.physics.add.staticImage(1000,800,'chao2').setSize(50000,30).setScale(500,1);
        this.physics.add.collider(player,fundo, () => {
            this.morreu()
        })


        //adiciona pregadores
        posicaoPregadores.forEach(posicao => {
            const pregador = this.physics.add.staticImage(posicao.x, posicao.y, 'pregador').setSize(220, 50).setScale(0.8);
            this.physics.add.collider(player, pregador, () => {
            playernoChao = true;
        });
            pregadores.push(pregador);
        });

        pregador9 = this.physics.add.staticImage(9500,0,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador9, () => {
            playernoChao = false;
        });


        pregador14 = this.physics.add.staticImage(10700,60,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador14, () => {
            playernoChao = false;
        });


        pregador18 = this.physics.add.staticImage(11500,100,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador18, () => {
            playernoChao = false;
        });
     

        //adiciona máquinas
        posicaoMaquinas.forEach(posicao => {
            const maquina = this.physics.add.staticImage(posicao.x, posicao.y, 'maquina').setSize(140, 170).setScale(0.5);
            this.physics.add.collider(bacterias, maquina);
            this.physics.add.collider(player, maquina, () => {
            playernoChao = true;
            
        });
            maquinas.push(maquina);
        });
       

        // adiciona o celular
        celular = this.physics.add.sprite(12050,500,'celular').setScale(0.5).setVisible(true);
        celular.body.setSize(500, 800, true)
        this.physics.add.overlap(player, celular, () => {
            this.mostrarBalaoDeFala();
            this.podeAbrirCelular = true

        }, null, this);

        //plataforma auxiliar que aciona o HUD de links pelo celular
        /*platAux3 = this.physics.add.staticImage(11900,600,'').setSize(100,600).setScale(0.3).setVisible(true);
        this.physics.add.overlap(player, platAux, () => {
            
        }); */

        // adiciona o botão da letra E
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // adiciona o primeiro texto após a tecla E ser pressionada
        //texto1 = this.physics.add.sprite(12100,200,'texto1').setScale(1, 1).setVisible(false);
        // adiciona a sprite sheet do portal para transição de telas
        //portal = this.physics.add.sprite(12500,460,'portal').setScale(0.5).setVisible(false);
        //this.anims.create({
          //  key: 'mexer',
           // frames: this.anims.generateFrameNumbers('portal', { start:0, end:2 }),
          //  frameRate: 5,
          //  repeat: -1
      //  });
        // adiciona o affordance da letra E
        botaoE = this.physics.add.sprite(12068, 400, 'botaoE').setScale(0.15);

        

        // adiciona plataforma auxiliar que torna o portal visivel 
        platAux2 = this.physics.add.staticImage(12340,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        //this.physics.add.overlap(player, platAux2, () =>{
         //   portal.setVisible (true);
      //  });

    

        // Adiciona o balão de falas do hacker
        this.balaoDeFala = this.add.image(12340, 40, 'balaoDeFala').setOrigin(1, 0).setScale(0.3).setVisible(false);


        // Adiciona o texto dentro do balão de falas
        this.textoHacker = this.add.text(12120, 90, "Não esperava que você chegasse tão longe! Deve ter sido sorte de principiante, então tente responder essa pergunta", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setVisible(false);
        this.textoHacker.setOrigin(0.5, 0);

        
        posicoesMoedas1.forEach(posicao => {
            moedas.push(
                this.physics.add.staticImage(posicao.x, posicao.y, 'moeda')
                    .setSize(55, 55)
                    .setScale(0.2)
            );
        });
        moedas.forEach(moeda => {
            this.physics.add.overlap(player, moeda, () => {
                this.scene.get('moeda').coletarMoeda(moeda);
                this.legendas('Coletou Moeda')
            });
        });

        //musica de fundo
        const musicaFundo = this.sound.add("musicaFundo", {loop: true});
        musicaFundo.play();
        musicaFundo.setVolume(0.1);
        
    };

    mostrarBalaoDeFala(){
        this.balaoDeFala.setVisible(true);
        this.textoHacker.setVisible(true);
    }
    
    update(){
        // impede que as sprites sofram com a velocidade da gravidade e caiam
        celular.setMaxVelocity(0);
        botaoE.setMaxVelocity(0);
        grades.setMaxVelocity(0);

        //adiciona NPC
        omo.anims.play('pular', true);
        omo.setMaxVelocity (0);

        
      
        //quando as duas teclas são pressionada, o player para
        if(teclado.left.isDown && teclado.right.isDown){        
            player.setVelocityX(0);
        };

        // Lógica para movimentação com as teclas WASD ou setas
        const isMovingLeft = teclado.left.isDown || this.WASD.left.isDown;
        const isMovingRight = teclado.right.isDown || this.WASD.right.isDown;
        const isJumping = teclado.up.isDown || this.WASD.up.isDown;

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
            this.scene.pause('Scene02')
            this.scene.launch('SceneLink');
        } else {
            this.podeAbrirCelular = false
        }
    };
};
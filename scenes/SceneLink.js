var links = [
    'https://docs.google.com/presentation/d/1KfRIc-24t1Gn2V-_GvxNUyW8dWXHzklF/edit#slide=id.p1', // quiz 1 e 2
    'https://www.unilever.com.br/our-company/objetivos-valores-e-principios/', // quiz 3
    'https://www.unilever.com/brands/?_gl=1*htad0f*_ga*MTQ3NTAyMjQ1NC4xNzEyMjUxMjUx*_ga_YD4H91RBTJ*MTcxMjI1MTQ1Ny4xLjEuMTcxMjI1MTUwMy4wLjAuMA', //quiz 4
    'https://docs.google.com/document/d/1CDHuwPTgXYP26ej73ycHKxUk0aSU2tMRK-TlXRh3FxU/edit', //quiz 5
    'https://www.unilever.com.br/planet-and-society/' //quiz 6
]


class SceneLink extends Phaser.Scene{
    constructor(){
        super({key: 'SceneLink'}, 'Main')
        this.fecharCelular = false
    }

    create(){
        //adiciona celular
        this.add.image(450, 300, 'celularLink').setOrigin(0.5).setScale(0.8);
        
        //adiciona link por cena
        if (quizCounter == 0) {
            this.addLink('ONIOPS', 450, 270, '25px', links[0], '#eb0000') //quiz 1 e 2
            this.addLink('Valores da Unilever', 450, 310, '25px', links[1], '#eb0000') // quiz 3
        } else if (quizCounter == 3){
            this.addLink('ONIOPS', 450, 270, '30px', links[0], '#000000') //quiz 1 e 2
            this.addLink('Valores da Unilever', 450, 310, '25px', links[1], '#000000') // quiz 3
            this.addLink('Marcas da Unilever', 450, 350, '25px', links[2], '#eb0000') // quiz 4
            this.addLink('Objetivos da Unilever', 450, 390, '25px', links[3], '#eb0000') // quiz 5
            this.addLink('Unilever Compass', 450, 430, '25px', links[4], '#eb0000') // quiz 6

        } 

        //fechar celular
        this.Voltar = this.add.text(550, 500, 'Voltar', {fontSize: '15px', color: '#000000' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        
        this.Voltar.on('pointerdown', () => {
            this.scene.stop('SceneLink');
            this.scene.resume(cenaAnterior)
        })

        this.Voltar.on('pointerover', () => {
            this.Voltar.setScale(1.05)
            this.Voltar.setColor('#ffffff')
        });

        this.Voltar.on('pointerout', () => {
            this.Voltar.setScale(1)
            this.Voltar.setColor('#000000')
        });

        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    
    update(){
        if (this.teclaE.isDown) {
            this.fecharCelular = true;
            this.fecharCel()
        } else {
            this.fecharCelular = false;
        }
        
    }
     
    fecharCel(){
        if (this.fecharCelular){
            this.Voltar.setColor('#ffffff')
            this.scene.stop('SceneLink')
            this.scene.resume(cenaAnterior)
        }
    }

    addLink(text, x, y, size, link, color){
        var linkText = this.add.text(x, y, text, {fontSize: size, color: color})
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        
        linkText.on('pointerdown', () => {
            window.open(link, '_blank');
        })

        linkText.on('pointerover', () => {
            linkText.setScale(1.05)
            linkText.setColor('#ffffff')
        });

        linkText.on('pointerout', () => {
            linkText.setScale(1)
            linkText.setColor(color)
        });
    }
}

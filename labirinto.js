const widthWindow = window.innerWidth;
const heightWindow = window.innerHeight;
const telaGame = document.querySelector('.container canvas');

window.addEventListener('load', () => {
    if (widthWindow <= 1630 && widthWindow >= 1100) {
        telaGame.style.width = (widthWindow - 25) + 'px';
        telaGame.style.height = (heightWindow - 25) + 'px';
    }
    else if (widthWindow < 1100 && widthWindow >= 900) {
        telaGame.style.width = (widthWindow - 25) + 'px';
        telaGame.style.height = (heightWindow - 25) + 'px';
    }
    else if (widthWindow < 900 && widthWindow >= 735) {
        telaGame.style.width = (widthWindow - 25) + 'px';
        telaGame.style.height = (heightWindow - 25) + 'px';
    }
})

    (function () {
        const cnv = document.querySelector('canvas');
        const ctx = cnv.getContext('2d');

        const WIDTH = cnv.width, HEIGHT = cnv.height;

        const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
        let mvLeft = mvUp = mvRight = mvDown = false;

        let chegada = [];

        let muros = [];

        let questions = [];

        const perguntas = ['Qual o artefato principal que Indiana Jones procura em "O Chamado do Destino"?', 'Qual é o nome do principal vilão no filme "O Chamado do Destino"?', 'Quem interpreta a afilhada de Indiana Jones, Helena, no filme?', 'Em que ano se passa a maior parte da história de "O Chamado do Destino"?', 'Qual evento histórico serve de pano de fundo para "O Chamado do Destino"?',
            'Que grupo de antagonistas Indiana Jones enfrenta novamente em "O Chamado do Destino"?', 'Em que local histórico se encontra parte da ação do filme?', 'Qual é a profissão de Helena Shaw, afilhada de Indiana Jones?',
            'Qual diretor assumiu a direção de "O Chamado do Destino"?', 'Qual é o papel do personagem interpretado por Antonio Banderas no filme?'];
        
        const respostas = ['c) O Dial de Arquimedes', 'b) Mads Mikkelsen como Jürgen Voller', 'b) Phoebe Waller-Bridge',
            'b) 1969', 'c) Corrida Espacial', 'b) Nazistas', 'c) Siracusa', 'b) Aventureira e mercadora de artefatos', 'b) James Mangold', 'b) Um antigo aliado de Indy'];
        
        const respostaOption = ['a) A Arca da Aliança', 'b) O Cálice Sagrado', 'c) O Dial de Arquimedes', 'd) O Coração de Shiva',
            'a) Dr. René Belloq', 'b) Mads Mikkelsen como Jürgen Voller', 'c) Irina Spalko', 'd) Walter Donovan',
            'a) Cate Blanchett', 'b) Phoebe Waller-Bridge', 'c) Karen Allen', 'd) Shia LaBeouf',
            'a) 1944', 'b) 1969', 'c) 1957', 'd) 1936',
            'a) Segunda Guerra Mundial', 'b) Guerra Fria', 'c) Corrida Espacial', 'd) Guerra do Vietnã',
            'a) Soviéticos', 'b) Nazistas', 'c) Culto de Thuggee', 'd) Aliens',
            'a) Roma', 'b) Atenas', 'c) Siracusa', 'd) Machu Picchu',
            'a) Professora universitária', 'b) Aventureira e mercadora de artefatos', 'c) Arqueóloga', 'd) Agente do governo',
            'a) Steven Spielberg', 'b) James Mangold', 'c) George Lucas', 'd) J.J. Abrams',
            'a) Vilão principal', 'b) Um antigo aliado de Indy', 'c) Um oficial militar', 'd) Um arqueólogo rival'];
            
        const tileSize = 48;
        const tileSrcSize = 96;

        let playerImg1 = new Image();
        playerImg1.src = './img/indianajones.png';

        let playerImg2 = new Image();
        playerImg2.src = './img/marionravenwood.png';

        let playerImg3 = new Image();
        playerImg3.src = './img/sallah.png';

        let img = new Image();
        img.src = './img/spriteRock.png';
        img.addEventListener('load', () => {
            requestAnimationFrame(loop, cnv);
        }, false);

        let player1 = {
            name: 'indiana jones',
            x: tileSize + 10,
            y: tileSize + 10,
            width: 31,
            height: 47.3,
            speed: 2,
            srcX: 0,
            srcY: 0,
            countAnim: 0
        };

        let player2 = {
            name: 'mari',
            x: tileSize + 10,
            y: tileSize + 340,
            width: 31,
            height: 47.3,
            speed: 2,
            srcX: 0,
            srcY: 0,
            countAnim: 0
        };

        let player3 = {
            name: 'sallah',
            x: tileSize + 10,
            y: tileSize + 670,
            width: 31,
            height: 47.3,
            speed: 2,
            srcX: 0,
            srcY: 0,
            countAnim: 0
        };

        let controlPlayer = 0;

        const players = [player1, player2, player3];

        function numberAleatorio(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a;
        }

        window.addEventListener('load', () => {
            let aleatorio = numberAleatorio(0, (players.length - 1));
            players.forEach((person, i) => {
                if (i == aleatorio) {
                    controlPlayer = person;
                }
            })
        })


        const labirinto = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 2, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        for (let linha in labirinto) {
            for (let coluna in labirinto[linha]) {
                let tile = labirinto[linha][coluna];
                if (tile === 1) {
                    let muro = {
                        x: tileSize * coluna,
                        y: tileSize * linha,
                        width: tileSize,
                        height: tileSize
                    }
                    muros.push(muro);
                }

                if (tile === 2) {
                    let question = {
                        x: tileSize * coluna,
                        y: tileSize * linha,
                        width: tileSize,
                        height: tileSize
                    }
                    questions.push(question);
                }

                if (tile === 3) {
                    let fim = {
                        x: tileSize * coluna,
                        y: tileSize * linha,
                        width: tileSize,
                        height: tileSize
                    }
                    chegada.push(fim);
                }

            }

        }

        function ganhador(objA, objB) {
            let distX = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            let distY = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);

            let somaWidth = (objA.width + objB.width) / 2;
            let somaHeight = (objA.height + objB.height) / 2;

            if (Math.abs(distX) < somaWidth && Math.abs(distY) < somaHeight) {
                let overlapX = somaWidth - Math.abs(distX);
                let overlapY = somaHeight - Math.abs(distY);
                if (overlapX > overlapY) {
                    objA.y = distY > 0 ? objA.y + overlapY + Number(0.5) : objA.y - overlapY - Number(0.5);
                } else {
                    objA.x = distX > 0 ? objA.x + overlapX + Number(0.5) : objA.x - overlapX - Number(0.5);
                }

                document.querySelector('.containerModalFim').classList.add('modalActive');

                document.querySelector('.containerModalFim .modalFim button').addEventListener('click', () => {
                    window.location.href = './index.html';
                })

                if (document.querySelector('.containerModalFim').classList.contains('modalActive')) {
                    controlPlayer.speed = 0
                }

            }
        }


        function blockRectangle(objA, objB) {
            let distX = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            let distY = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);

            let somaWidth = (objA.width + objB.width) / 2;
            let somaHeight = (objA.height + objB.height) / 2;

            if (Math.abs(distX) < somaWidth && Math.abs(distY) < somaHeight) {
                let overlapX = somaWidth - Math.abs(distX);
                let overlapY = somaHeight - Math.abs(distY);

                if (overlapX > overlapY) {
                    objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
                } else {
                    objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
                }
            }
        }


        let buttonQuestions = [...document.querySelectorAll('.containerModal .modal .optionResposta > *')];

        function exibirQuestion(objA, objB) {
            let distX = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            let distY = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);

            let somaWidth = (objA.width + objB.width) / 2;
            let somaHeight = (objA.height + objB.height) / 2;

            if (Math.abs(distX) < somaWidth && Math.abs(distY) < somaHeight) {
                let overlapX = somaWidth - Math.abs(distX);
                let overlapY = somaHeight - Math.abs(distY);
                if (overlapX > overlapY) {
                    objA.y = distY > 0 ? objA.y + overlapY + Number(0.5) : objA.y - overlapY - Number(0.5);
                } else {
                    objA.x = distX > 0 ? objA.x + overlapX + Number(0.5) : objA.x - overlapX - Number(0.5);
                }

                document.querySelector('.containerModal').classList.add('modalActive');

                questions.forEach((q, qI) => {
                    if (q === objB) {
                        let pergunta = document.createTextNode(perguntas[qI]);
                        document.querySelector('.containerModal .modal span').appendChild(pergunta);

                        respostaOption.forEach((object, index) => {
                            buttonQuestions.forEach((obj, i) => {
                                iText = i + (qI * 4);
                                if (iText == index) {
                                    obj.textContent = object;

                                    obj.addEventListener('click', () => {
                                        respostas.forEach((rO, rOI) => {
                                            if (rOI === qI) {
                                                if (obj.textContent === object) {
                                                    if (obj.textContent === rO && rOI === qI) {
                                                        console.log(obj.textContent, 'e', rOI);
                                                        respostaCorretaHandler(obj, objB, objA, qI);
                                                    } else {
                                                        console.log(obj.textContent)
                                                        respostaErradaHandler(obj, objB, objA, qI);
                                                    }
                                                }
                                            }
                                        })
                                    })



                                }
                            })
                        })
                    }
                })

                if (document.querySelector('.containerModal').classList.contains('modalActive')) {
                    controlPlayer.speed = 0
                }
            }
        }

        function removerPerguntaCorreta(indicePergunta) {
            perguntas.splice(indicePergunta, 1);
            respostas.splice(indicePergunta, 1);

            let opcoesRemover = respostaOption.filter((opcao, index) => {
                let opcaoPerguntaIndex = Math.floor(index / 4);
                return opcaoPerguntaIndex === indicePergunta;
            });

            opcoesRemover.forEach((opcao) => {
                let index = respostaOption.indexOf(opcao);
                respostaOption.splice(index, 1);
            });
        }


        function respostaCorretaHandler(obj, objB, objA, pI) {

            buttonQuestions.forEach((obj) => {
                obj.removeEventListener('click', respostaCorretaHandler);
                obj.removeEventListener('click', respostaErradaHandler);
            });

            let indexToRemove = -1;

            for (let i = 0; i < questions.length; i++) {
                const objQ = questions[i];
                for (let linha in labirinto) {
                    for (let coluna in labirinto[linha]) {
                        if (objQ.x === objB.x && objQ.y === objB.y) {
                            labirinto[Math.floor(objB.y / tileSize)][Math.floor(objB.x / tileSize)] = 0;
                            indexToRemove = i;
                            break;
                        }
                    }
                    if (indexToRemove !== -1) {
                        break;
                    }
                }
            }

            if (indexToRemove !== -1) {
                questions.splice(indexToRemove, 1);
            }


            document.querySelector('.containerModal').classList.remove('modalActive');
            controlPlayer.speed = 2;

            let indicePerguntaCorreta = perguntas.indexOf(perguntas[pI]);
            console.log(indicePerguntaCorreta);
            removerPerguntaCorreta(indicePerguntaCorreta);


            buttonQuestions.forEach((objC) => {
                objC.textContent = null;
            })

            document.querySelector('.containerModal .modal span').textContent = null;
        }

        function respostaErradaHandler(obj, objB, objA, pI) {

            buttonQuestions.forEach((obj) => {
                obj.removeEventListener('click', respostaCorretaHandler);
                obj.removeEventListener('click', respostaErradaHandler);
            });


            if (controlPlayer === player1) {
                controlPlayer = player2;
            }
            else if (controlPlayer === player2) {
                controlPlayer = player3;
            }
            else if (controlPlayer === player3) {
                controlPlayer = player1;
            }

            document.querySelector('.containerModal').classList.remove('modalActive');
            controlPlayer.speed = 2;

            buttonQuestions.forEach((obj) => {
                obj.textContent = null;
            })

            document.querySelector('.containerModal .modal span').textContent = null;
        }



        window.addEventListener('keydown', keydownHandler, false);
        window.addEventListener('keyup', keyupHandler, false);

        function keydownHandler(e) {
            let key = e.keyCode;

            switch (key) {
                case LEFT:
                    mvLeft = true;
                    break;
                case UP:
                    mvUp = true;
                    break;
                case RIGHT:
                    mvRight = true;
                    break;
                case DOWN:
                    mvDown = true;
                    break;
            }
        }

        function keyupHandler(e) {
            let key = e.keyCode;

            switch (key) {
                case LEFT:
                    mvLeft = false;
                    break;
                case UP:
                    mvUp = false;
                    break;
                case RIGHT:
                    mvRight = false;
                    break;
                case DOWN:
                    mvDown = false;
                    break;
            }
        }

        function movPlayer(gamePlayer) {
            if (mvLeft && !mvRight) {
                gamePlayer.x -= gamePlayer.speed;
                gamePlayer.srcY = gamePlayer.height * 1;
            } else if (mvRight && !mvLeft) {
                gamePlayer.x += gamePlayer.speed;
                gamePlayer.srcY = gamePlayer.height * 2;
            }
            if (mvUp && !mvDown) {
                gamePlayer.y -= gamePlayer.speed;
                gamePlayer.srcY = gamePlayer.height * 3;
            }
            else if (mvDown && !mvUp) {
                gamePlayer.y += gamePlayer.speed;
                gamePlayer.srcY = gamePlayer.height * 0;
            }

            if (mvLeft || mvRight || mvUp || mvDown) {
                gamePlayer.countAnim++;

                if (gamePlayer.countAnim >= 40) {
                    gamePlayer.countAnim = 0;
                }

                gamePlayer.srcX = Math.floor(gamePlayer.countAnim / 10) * gamePlayer.width;

            } else {
                gamePlayer.srcX = 0;
                gamePlayer.countAnim = 0;
            }
        }


        function update() {

            movPlayer(controlPlayer);

            for (let i in muros) {
                let muro = muros[i];
                blockRectangle(player1, muro);
                blockRectangle(player2, muro);
                blockRectangle(player3, muro);
            }

            for (let i in questions) {
                let question = questions[i];
                exibirQuestion(player1, question);
                exibirQuestion(player2, question);
                exibirQuestion(player3, question);
            }

            for (let i in chegada) {
                let fim = chegada[i];
                ganhador(player1, fim);
                ganhador(player2, fim);
                ganhador(player3, fim);
            }
        }

        function render() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.save();
            for (let linha in labirinto) {
                for (let coluna in labirinto[linha]) {
                    let tile = labirinto[linha][coluna];
                    const x = coluna * tileSize;
                    const y = linha * tileSize;

                    ctx.drawImage(
                        img,
                        tile * tileSrcSize, 0, tileSrcSize, tileSrcSize,
                        x, y, tileSize, tileSize
                    );
                }
            }

            ctx.drawImage(
                playerImg1,
                player1.srcX, player1.srcY, player1.width, player1.height,
                player1.x, player1.y, player1.width, player1.height
            );
            ctx.restore();

            ctx.save();

            ctx.drawImage(
                playerImg2,
                player2.srcX, player2.srcY, player2.width, player2.height,
                player2.x, player2.y, player2.width, player2.height
            );
            ctx.restore();

            ctx.save();

            ctx.drawImage(
                playerImg3,
                player3.srcX, player3.srcY, player3.width, player3.height,
                player3.x, player3.y, player3.width, player3.height
            );
            ctx.restore();
        }

        function loop() {
            update();
            render();
            requestAnimationFrame(loop, cnv);
        }

    }())
const btnJogar = document.getElementById("btn-jogar")
const jogar = document.getElementById("jogar")
const visivel = document.getElementById("jogo-visivel")
const aparecerConfig = document.getElementById("aparecer-config")
const jogo = document.getElementById("jogo")
const darkmode = document.getElementById('fundo-darkmode')
const janela = document.getElementById("fechar-janela")
const btnConfig = document.getElementById("logo-config")
const fecharJanela = document.getElementById('btn-fechar-janela')
const cabecalho = document.getElementById("cabeçalho")
const cabecalhoConfig = document.getElementById("cabeçalho-config")
const body = document.querySelector("body")
const infoJogo = document.getElementById("info-jogo")
const config = document.getElementById("configuracoes")
const alternativa1 = document.getElementById("alternativa1")
const alternativa2 = document.getElementById("alternativa2")
const alternativa3 = document.getElementById("alternativa3")
const alternativa4 = document.getElementById("alternativa4")
const opcoes = document.getElementById("opcoes")
const vidas = document.querySelectorAll(".vida")
const vida1 = document.getElementById("vida1")
const vida2 = document.getElementById("vida2")
const vida3 = document.getElementById("vida3")
const acertos = document.getElementById("acertos")

let correto = 0


// iniciar jogo ao clicae no botao "Jogar"
jogar.addEventListener("click", () => {
    jogar.classList.toggle('remove')
    visivel.classList.remove('jogo-visivel')
    opcoes.classList.toggle('on')
})

// abrir aba de configurações
btnConfig.addEventListener("click", () => {
    visivel.classList.add('jogo-visivel')
    aparecerConfig.classList.remove('aparecer-config')
    jogo.classList.add('jogo')

})

//  fechar aba de confugurações
fecharJanela.addEventListener("click", () =>{
    aparecerConfig.classList.add('aparecer-config')        
    jogo.classList.remove('jogo')
    visivel.classList.remove('jogo-visivel')
})

//  colocar ou tirar pagina no modo escuro
darkmode.addEventListener("click", () => {
    darkmode.classList.toggle('dark')
    cabecalho.classList.toggle('dark')
    body.classList.toggle('dark')
    jogo.classList.toggle('dark')
    infoJogo.classList.toggle('dark')
    config.classList.toggle('dark')
    alternativa1.classList.toggle('dark')
    alternativa2.classList.toggle('dark')
    alternativa3.classList.toggle('dark')
    alternativa4.classList.toggle('dark')
    cabecalhoConfig.classList.toggle('dark')

    if (btnConfig.src.includes('icons/preto.png')){
        btnConfig.src = 'icons/branco.png'
    } else {
        btnConfig.src = 'icons/preto.png'
    }
    if (janela.src.includes('icons/fecharjanelapreto.png')) {
        janela.src = 'icons/fecharjanelabranco.png'
    } else {
        janela.src = 'icons/fecharjanelapreto.png'
    }
})


//  rodar jogo
document.addEventListener("DOMContentLoaded", () => {
  const respostas = [
    { nome: "Brasil", url: "bandeiras/brasil.png" },
    { nome: "Haiti", url: "bandeiras/haiti.png" },
    { nome: "Jamaica", url: "bandeiras/jamaica.png" },
    { nome: "Portugal", url: "bandeiras/portugal.png" }
  ];

  const alternativas = document.querySelectorAll(".alternativas");
  const pergunta = document.getElementById("pergunta");

  let respostaCorreta = null;
  let tentativas = 3;
  let bloqueado = false;

  function novaRodada() {
    visivel.classList.remove('jogo-visivel')
    vida1.src = "vidas/vida.png"
    vida2.src = "vidas/vida.png"
    vida3.src = "vidas/vida.png"

    bloqueado = false;
    tentativas = 3;

    alternativas.forEach(div => {
      div.innerHTML = "";
      div.style.backgroundColor = "";
    });

    const embaralhadas = [...respostas].sort(() => Math.random() - 0.5);

    respostaCorreta =
      embaralhadas[Math.floor(Math.random() * embaralhadas.length)];

    pergunta.textContent = respostaCorreta.nome;

    alternativas.forEach((div, i) => {
      const img = document.createElement("img");
      img.src = embaralhadas[i].url;
      img.style.width = "100px";

      div.dataset.nome = embaralhadas[i].nome;

      div.appendChild(img);
    });


  }

  alternativas.forEach(div => {
    div.addEventListener("click", () => {
      if (bloqueado) return;

      if (div.dataset.nome === respostaCorreta.nome) {
        div.style.backgroundColor = "green";
        bloqueado = true;
        correto++
        acertos.innerText = `acertos: ${correto}`
        setTimeout(novaRodada, 1000);
      } else {
        tentativas--;
        div.style.backgroundColor = "red";
        if (tentativas === 2) {
          vida1.src = "vidas/noVida.png"
        }
        if (tentativas === 1) {
          vida2.src = "vidas/noVida.png"
        }
        if (tentativas === 0) {
          correto = 0
          acertos.innerText = `acertos: ${correto}`
          vida3.src = "vidas/noVida.png"
          bloqueado = true;
          visivel.classList.add('jogo-visivel')

          setTimeout(novaRodada, 1000);
        }
      }
    });
  });

  novaRodada();
});
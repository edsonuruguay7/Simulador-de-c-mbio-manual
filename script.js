let velocidade = 0;
let rpm = 800;
let marcha = "N";
let embreagemPressionada = false;
let motorLigado = true;
let freioMaoAtivado = false;

// Definição dos limites de velocidade por marcha
const limitesMarcha = {
    "1": 20,
    "2": 40,
    "3": 60,
    "4": 80,
    "5": 200, // Sem limite prático
    "R": 15, // Ré até 15 km/h
    "N": 0
};

const velocidadeDisplay = document.getElementById("velocidade");
const rpmDisplay = document.getElementById("rpm");
const marchaDisplay = document.getElementById("marcha");
const statusDisplay = document.getElementById("status");

// Acelerando o carro
document.getElementById("btnAcelerar").addEventListener("click", () => {
    if (freioMaoAtivado) {
        statusDisplay.textContent = "Não é possível acelerar com o freio de mão ativado!";
    } else if (motorLigado && marcha !== "N") {
        let limite = limitesMarcha[marcha];

        if (velocidade < limite) {
            velocidade += 5;
            rpm += 400;
            if (rpm > 7000) {
                statusDisplay.textContent = "Motor pode quebrar!";
            }
        } else {
            statusDisplay.textContent = `Troque para uma marcha maior! (${marcha} não passa de ${limite} km/h)`;
        }
    }
    atualizarPainel();
});

// Freando o carro
document.getElementById("btnFrear").addEventListener("click", () => {
    if (velocidade > 0) {
        velocidade -= 10;
        rpm -= 500;
        if (velocidade < 0) velocidade = 0;
        if (velocidade === 0 && marcha !== "N") {
            statusDisplay.textContent = "Motor morreu!";
            motorLigado = false;
        }
    }
    atualizarPainel();
});

// Pressionando a embreagem
document.getElementById("btnEmbreagem").addEventListener("click", () => {
    embreagemPressionada = !embreagemPressionada;
    statusDisplay.textContent = embreagemPressionada ? "Embreagem pressionada" : "Embreagem solta";
});

// Modificando as marchas
document.querySelectorAll(".marchaBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (embreagemPressionada) {
            marcha = btn.getAttribute("data-marcha");
            rpm = 1000;
            statusDisplay.textContent = `Marcha ${marcha} engatada`;
        } else {
            statusDisplay.textContent = "Pressione a embreagem!";
        }
        atualizarPainel();
    });
});

// Controle do Freio de Mão
document.getElementById("btnFreioMao").addEventListener("click", () => {
    freioMaoAtivado = !freioMaoAtivado;
    statusDisplay.textContent = freioMaoAtivado ? "Freio de mão ativado!" : "Freio de mão desativado!";
});

// Função para atualizar o painel
function atualizarPainel() {
    velocidadeDisplay.textContent = velocidade;
    rpmDisplay.textContent = rpm;
    marchaDisplay.textContent = marcha;
}

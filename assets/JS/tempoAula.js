let tempoInicio = 0; // Hora de início da aula
let tempoGasto = 0;   // Tempo total gasto (inclui tempo pausado)
let tempoPausado = 0; // Tempo em que a aula foi pausada
let aulaEmPausa = false; // Flag para saber se a aula está pausada

// Função para registrar o tempo de início da aula
function IniciarAula() {
    tempoInicio = Date.now();  // Registra o tempo inicial (momento em que a aula começa)
    tempoPausado = 0;  // Reseta o tempo pausado
    aulaEmPausa = false; // Garante que a aula não está pausada ao começar
}

function PausarAula (){
    if (aulaEmPausa = true){
        let tempoAgora = Date.now() //passa a contar o tempo pausado 

        //tempo que passou pausado - tempo do inicio
        tempoPausado += (tempoAgora - tempoInicio) / 1000 / 60; // Converte para minutos

        aulaEmPausa = true
        console.log(`Aula pausada. Tempo pausado: ${tempoPausado} minutos`);

    }
}

function DespausarAula(){
if(aulaEmPausa = false){
    let tempoInicio = Date.now();
    aulaEmPausa = false;
    console.log(`Aula retomada. Tempo total pausado: ${tempoPausado} minutos`);

}
}
function concluirAula() {
    let tempoFinal = 0;
    if (aulaEmPausa) {
        tempoFinal = tempoPausado; // Caso a aula tenha sido pausada, o tempo total será o tempo pausado
    } else {
        tempoFinal = (Date.now() - tempoInicio + tempoPausado * 1000 * 60) / 1000 / 60; // Calcula o tempo final em minutos
    }
    console.log(`Aula concluída. Tempo total: ${tempoFinal} minutos`);

    // Agora envie esse tempo total para o servidor
    enviarTempoParaServidor(tempoFinal);
}
// Vinculando as funções aos botões
document.getElementById('iniciarAula').addEventListener('click', iniciarAula);
document.getElementById('pausarAula').addEventListener('click', pausarAula);
document.getElementById('retomarAula').addEventListener('click', retomarAula);
document.getElementById('concluirAula').addEventListener('click', concluirAula);


// Função para enviar o tempo para o servidor
async function enviarTempoParaServidor(tempoFinal, idAula) {
    await fetch(`/concluir-aula/${idAula}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tempoGasto: tempoFinal })
    }).then(response => {
        if (response.ok) {
            console.log('Tempo registrado com sucesso!');
        } else {
            console.log('Erro ao registrar o tempo!');
        }
    });
}

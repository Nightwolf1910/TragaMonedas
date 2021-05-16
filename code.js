var win=false; //flag
var animToggleA=false;
var animToggleB=false;
//JUEGO - INSTALACION =========
function bernoulli(p){
    return 1 && ( Math.random() < p ) || 0 
}
function getRewards(p, max){
    var reward = 0
    for(var i = 0; i < max ; i++){
    reward += bernoulli(p)
    }
    return reward
}
function debugResult(p, tries, maxRewards){
    var rewards = []
    var sum = 0
    for(var i = 0; i < tries ; i++){
        var r = getRewards(p, maxRewards)
        rewards.push(r)
        sum += r
    }
    console.log(rewards, sum, sum/tries)
}
function get2Randoms(options){
    var r1 = Math.floor(Math.random() * options.length)
    var result1 = options.splice(r1, 1)
    var r2 = Math.floor(Math.random() * options.length)
    var result2 = options.splice(r2, 1)
    return [result1[0], result2[0]]
}
function getResultNoReward(){
    return get2Randoms(['J', 'Q', 'K', 'A']).join('')
}
function getResult(p){
    var rewards = []
    var sum = 0
    var maxRewards = 10
    var tries = 5
    var results = [
        '', '', 'JJ', 'QQ', 'KK', '', '', 'AA'
    ]
    var r = getRewards(p, maxRewards)
    var result = results[ r < results.length ? r : 0 ]
    if(result == ''){
        return getResultNoReward()
    }
    return result
}
function getWin(result){
    var results = {
        'JJ': 2, 'QQ': 3, 'KK': 4, 'AA': 10
    }
    var win = results[result]
    return win || 0
}
function getDistributions(){
    return get2Randoms([0.2, 0.4])
}

function apostarYJugar(maquina, apuesta){
    var resultado = getResult(maquina)
    var ganancia = getWin(resultado)
    return {
        resultado,
        ganancia
    }
}

function imprimirIntento(i, maquina, intento, apuesta){
     console.log(
        i + '-',
        maquina + ':', 
        intento.resultado, 
        intento.ganancia, 
        intento.ganancia * apuesta
    )

    var resultadoWin = intento.ganancia;    
    var gananciaTotal = intento.ganancia * apuesta;

    var letras = intento.resultado.split("");
    var letra1 = letras[0]; 
    var letra2 = letras[1];

    if(maquina == 'maquinaA'){
        const letraA1 = document.querySelector("#LetraM1-A");
        letraA1.innerHTML = `${letra1}`
        movLetrasMA_2(letra2,resultadoWin, maquina,apuesta,gananciaTotal)
    }else{
        const letraA1 = document.querySelector("#LetraM2-A");
        letraA1.innerHTML = `${letra1}`
        movLetrasMB_2(letra2,resultadoWin, maquina,apuesta,gananciaTotal)
    }
    
    /*
    if(resultadoWin != 0){
        win = true;
        if(maquina == 'maquinaA'){
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '¡GANASTE!'
        }else{
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '¡GANASTE!'
        }
    }else{
        win = false;
        if(maquina == 'maquinaA'){
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '-'
        }else{
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '-'
        }
    }
*/
    

}

//JUEGO - INICIO ===============================
var distribuciones = getDistributions()
console.log(distribuciones)
//0.4 significa que tiene más probabilidades de ganar que 0.2
var maquinas = {
    maquinaA: distribuciones[0],
    maquinaB: distribuciones[1]
}
/*
//JUGAR ========================================
//INTENTO 1
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 1
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 2
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 2
var maquina = 'maquinaB'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 3
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 3
var maquina = 'maquinaB'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 4
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 4
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO N mientras se tenga monedas para apostar
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 10
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina])
imprimirIntento(i, maquina, intento)
*/

//AQUI TERMINA EL CÓDIGO DEL PROFE

var monedas;

var posAleatoria;
var nomAnimalesAnonimos = [
    "Mono Anónimo", "Perro Anónimo", "Gato Anónimo", "Lemur Anónimo", "Cerdo Anónimo", "Loro Anónimo", "Ratón Anónimo", "Lagarto Anónimo", "T-rex Anónimo"
]
var primeraVez=true;
var modalBienvenida;
var nombre="";

const asignarNombreAnimal = () =>{
    posAleatoria = Math.floor(Math.random() * 9);
    var nombre = nomAnimalesAnonimos[posAleatoria];

    const inputNombre = document.querySelector("#nombreInicio");
    inputNombre.setAttribute("value", `${nombre}`)
}

const startMonedas = () =>{
    monedas = 200;
    setMonedas(monedas)
} 

const perderApuesta = (apuesta) =>{
    monedas = monedas - apuesta;
    setMonedas(monedas)
}

const ganarApuesta = (apuesta, ganancia) =>{
    monedas = (monedas-apuesta) + ganancia;
    setMonedas(monedas)
}

const setMonedas = (cant) => {
    document.getElementById("monedas").innerText = cant;
}

const setApuestas10 = () => {
    document.getElementById("apuesta1").innerText=10;
    document.getElementById("apuesta2").innerText=10;
}

const apostarMenos1 = () => {
    if((document.getElementById("apuesta1").innerText)<=monedas+10){
        document.getElementById("btR1").disabled=false;
        document.getElementById("btAPOSTAR1").disabled=false;
    }
    while(document.getElementById("btL1").disabled==false){
        if(parseInt(document.getElementById("apuesta1").innerText)>0){
            document.getElementById("apuesta1").innerText=parseInt(document.getElementById("apuesta1").innerText)-10;
            if(parseInt(document.getElementById("apuesta1").innerText)==0){
                document.getElementById("btL1").disabled=true;
                document.getElementById("btAPOSTAR1").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btL1").addEventListener("click", apostarMenos1);

const apostarMas1 = () => {
    document.getElementById("btAPOSTAR1").disabled=false;
    document.getElementById("btL1").disabled=false;
    while(document.getElementById("btR1").disabled==false){
        if(parseInt(document.getElementById("apuesta1").innerText)<monedas){
            document.getElementById("apuesta1").innerText=parseInt(document.getElementById("apuesta1").innerText)+10;
            if(parseInt(document.getElementById("apuesta1").innerText)==monedas){
                document.getElementById("btR1").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btR1").addEventListener("click", apostarMas1);

const apostarMas2 = () => {
    document.getElementById("btAPOSTAR2").disabled=false;
    document.getElementById("btL2").disabled=false;
    while(document.getElementById("btR2").disabled==false){
        if(parseInt(document.getElementById("apuesta2").innerText)<monedas){
            document.getElementById("apuesta2").innerText=parseInt(document.getElementById("apuesta2").innerText)+10;
            if(parseInt(document.getElementById("apuesta2").innerText)==monedas){
                document.getElementById("btR2").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btR2").addEventListener("click", apostarMas2);

const apostarMenos2 = () => {
    if((document.getElementById("apuesta2").innerText)<=monedas+10){
        document.getElementById("btR2").disabled=false;
        document.getElementById("btAPOSTAR2").disabled=false;
    }
    while(document.getElementById("btL2").disabled==false){
        if(parseInt(document.getElementById("apuesta2").innerText)>0){
            document.getElementById("apuesta2").innerText=parseInt(document.getElementById("apuesta2").innerText)-10;
            if(parseInt(document.getElementById("apuesta2").innerText)==0){
                document.getElementById("btL2").disabled=true;
                document.getElementById("btAPOSTAR2").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btL2").addEventListener("click", apostarMenos2);
const butAbrirRankingOnClick=()=>{
    modalCrearRanking.toggle();
}
const butCambiarNombreOnClick=()=>{
    modalCambiarNombre.toggle();
}

const butAbrirAcercaDeOnClick=()=>{
    modalAcercaDe.toggle();
}

const butAbrirInstruccionesOnClick=()=>{
    modalInstrucciones.toggle();
}

const butIngresarNombreInicialOnClick=()=>{
    nombre=document.getElementById("nombreInicio").value;
    document.getElementById("nombre").innerText=nombre;
}
const butIngresarNombreCambiadoOnClick=()=>{
    nombre=document.getElementById("nombreCambiado").value;
    document.getElementById("nombre").innerText=nombre; 
    setApuestas10();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const ApostarOnClickMaquinaA = async () =>{
    animToggleA=true;
    animacionMA()
    movLetrasMA_1()
    document.getElementById("btAPOSTAR1").disabled=true;
    document.getElementById("btR1").disabled=true;
    document.getElementById("btL1").disabled=true;
    await sleep(2000);
    if(document.getElementById("apuesta1").innerText>monedas){
        document.getElementById("btAPOSTAR1").disabled=true;
        document.getElementById("btR1").disabled=true;
        document.getElementById("btL1").disabled=false;
    }else{
        document.getElementById("btAPOSTAR1").disabled=false;
        document.getElementById("btR1").disabled=false;
        document.getElementById("btL1").disabled=false;
    }
    if(monedas==0){
        document.getElementById("btAPOSTAR1").disabled=true;
        document.getElementById("btR1").disabled=true;
        document.getElementById("btL1").disabled=true;
        document.getElementById("btAPOSTAR2").disabled=true;
        document.getElementById("btR2").disabled=true;
        document.getElementById("btL2").disabled=true;
    }
}
document.getElementById("btAPOSTAR1").addEventListener("click", ApostarOnClickMaquinaA);

const ApostarOnClickMaquinaB = async () =>{
    animToggleB=true;
    animacionMB()
    movLetrasMB_1()
    document.getElementById("btAPOSTAR2").disabled=true;
    document.getElementById("btR2").disabled=true;
    document.getElementById("btL2").disabled=true;
    await sleep(2000);
    if(document.getElementById("apuesta2").innerText>monedas){
        document.getElementById("btAPOSTAR2").disabled=true;
        document.getElementById("btR2").disabled=true;
        document.getElementById("btL2").disabled=false;
    }else{
        document.getElementById("btAPOSTAR2").disabled=false;
        document.getElementById("btR2").disabled=false;
        document.getElementById("btL2").disabled=false;
    }
    if(monedas==0){
        document.getElementById("btAPOSTAR1").disabled=true;
        document.getElementById("btR1").disabled=true;
        document.getElementById("btL1").disabled=true;
        document.getElementById("btAPOSTAR2").disabled=true;
        document.getElementById("btR2").disabled=true;
        document.getElementById("btL2").disabled=true;
    }
}
document.getElementById("btAPOSTAR2").addEventListener("click", ApostarOnClickMaquinaB);


const movLetrasMA_1 = () =>{
    var cont=0;
    const letraRandom = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        var rand2 = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM1-A").innerHTML = letra1[rand];
        document.querySelector("#LetraM1-B").innerHTML = letra1[rand2];
        cont++;
        //console.log(letra[rand])
    
        if(cont>5){
            clearInterval(repetir)
            var maquina = 'maquinaA'
            var displayApuesta = document.getElementById("apuesta1")
            var apuesta = parseInt(displayApuesta.innerHTML)
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(1, maquina, intento,apuesta)
        }
    }
    
    letraRandom()
    var repetir = setInterval(letraRandom,250);
}

const movLetrasMB_1 = () =>{
    var cont=0;
    const letraRandom = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        var rand2 = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM2-A").innerHTML = letra1[rand];
        document.querySelector("#LetraM2-B").innerHTML = letra1[rand2];
        cont++;
        //console.log(letra[rand])
    
        if(cont>5){
            clearInterval(repetir)
            var maquina = 'maquinaB'
            var displayApuesta = document.getElementById("apuesta2")
            var apuesta = parseInt(displayApuesta.innerHTML)
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(1, maquina, intento,apuesta)
        }
    }
    
    letraRandom()
    var repetir = setInterval(letraRandom,250);
}

const movLetrasMA_2 = (letra, result, maq,apuest,ganTotal) =>{
    var cont=0;
    const letraRandom2 = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM1-B").innerHTML = letra1[rand];
        cont++;
    
        if(cont>2){
            clearInterval(repetir)
            const letraA2 = document.querySelector("#LetraM1-B");
            letraA2.innerHTML = `${letra}`
           
            mostrarResultado(result,maq,apuest,ganTotal)
        }
    }
    
    letraRandom2()
    var repetir = setInterval(letraRandom2,250);
}

const movLetrasMB_2 = (letra,result,maq,apuest,ganTotal) =>{
    var cont=0;
    const letraRandom2 = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM2-B").innerHTML = letra1[rand];
        cont++;
    
        if(cont>2){
            clearInterval(repetir)
            const letraA2 = document.querySelector("#LetraM2-B");
            letraA2.innerHTML = `${letra}`

            mostrarResultado(result,maq,apuest,ganTotal)
        }
    }
    
    letraRandom2()
    var repetir = setInterval(letraRandom2,250);
}

const mostrarResultado = (resultWin, maq,apuest,ganTotal) =>{
    
    if(resultWin != 0){
        win = true;
        ganarApuesta(apuest, ganTotal);

        if(maq == 'maquinaA'){
            animToggleA=false;
            animacionMA();
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '¡GANASTE!'

            const msjGanancia = document.querySelector("#gananciaM1");
            msjGanancia.innerHTML = `${ganTotal}`
        }else{
            animToggleB=false;
            animacionMB();
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '¡GANASTE!'

            const msjGanancia = document.querySelector("#gananciaM2");
            msjGanancia.innerHTML = `${ganTotal}`
        }
    }else{
        win = false;
        perderApuesta(apuest);

        if(maq == 'maquinaA'){
            animToggleA=false;
            animacionMA();
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '-'

            const msjGanancia = document.querySelector("#gananciaM1");
            msjGanancia.innerHTML = '0'
        }else{
            animToggleB=false;
            animacionMB();
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '-'

            const msjGanancia = document.querySelector("#gananciaM2");
            msjGanancia.innerHTML = '0'
        }
    }
    
}
    
const animacionMA = () =>{
    const img = document.querySelector("#laVeridica")
    if(animToggleA == true){
        img.setAttribute("src",'media/Tragamonedas1-2.png')
    }else{
        img.setAttribute("src",'media/Tragamonedas1.png')
    }
}

const animacionMB = () =>{
    const img = document.querySelector("#laSuertuda")
    if(animToggleB == true){
        img.setAttribute("src",'media/Tragamonedas2-2.png')
    }else{
        img.setAttribute("src",'media/Tragamonedas2.png')
    }
}

const main = () =>{
    asignarNombreAnimal();
    startMonedas();
    setApuestas10();
    //Mostrar la ventana bienvenida una vez
    localStorage.setItem("primera vez",primeraVez);
    const divBienvenida=document.querySelector("#bienvenida");
    modalBienvenida=new bootstrap.Modal(divBienvenida);
    if(primeraVez==true){
        modalBienvenida.toggle();
        primeraVez=false;
        localStorage.setItem("primera vez",primeraVez);
    }
    const divModalRanking=document.querySelector("#modalRanking");
    modalCrearRanking=new bootstrap.Modal(divModalRanking);
    const butAbrirRanking=document.querySelector("#ranking");
    butAbrirRanking.addEventListener("click",butAbrirRankingOnClick);

    const divModalCambiarNombre=document.querySelector("#modalCambiarNombre");
    modalCambiarNombre=new bootstrap.Modal(divModalCambiarNombre);
    const labelNombre=document.querySelector("#nombre");
    labelNombre.addEventListener("click",butCambiarNombreOnClick);

    const divModalAcercaDe=document.querySelector("#modalAcercaDe");
    modalAcercaDe=new bootstrap.Modal(divModalAcercaDe);
    const butAcercaDe=document.querySelector("#acercaDe");
    butAcercaDe.addEventListener("click",butAbrirAcercaDeOnClick);

    const divModalInstrucciones=document.querySelector("#modalInstrucciones");
    modalInstrucciones=new bootstrap.Modal(divModalInstrucciones);
    const butInstrucciones=document.querySelector("#instrucciones");
    butInstrucciones.addEventListener("click",butAbrirInstruccionesOnClick);



    document.getElementById("ingresarNombreInicio").addEventListener("click",butIngresarNombreInicialOnClick);
    document.getElementById("ingresarNombreCambiado").addEventListener("click",butIngresarNombreCambiadoOnClick);
    document.getElementById("close").addEventListener("click",butAbrirAcercaDeOnClick);
    document.getElementById("close").addEventListener("click",butAbrirInstruccionesOnClick);
}

window.addEventListener("load",main);

// Audio mute con boton. Fase Beta(v.02)

var btnmusica = document.getElementById('musica')
var audio = document.getElementsByTagName('audio')[0];

const MusicaOnClick = () => {

    btnmusica.addEventListener("click", function(){
        if (!sound) {
            audio.play();
            this.innerHTML = "Pause";
            sound = true;
        } else {
            audio.pause();
            this.innerHTML = "Play";
            sound = false;
        } 
    });
}
